import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import {
  getGoogleClientIds,
  isGoogleSignInConfigured,
} from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import { colors } from "../theme";

WebBrowser.maybeCompleteAuthSession();

type Props = {
  onError?: (message: string) => void;
  disabled?: boolean;
};

export function GoogleSignInButton({ onError, disabled }: Props) {
  const { loginWithGoogle } = useAuth();
  const configured = isGoogleSignInConfigured();
  const ids = getGoogleClientIds();
  const [busy, setBusy] = useState(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // Prefer web client for Expo AuthSession; platform IDs when present.
    clientId: ids.webClientId || undefined,
    iosClientId: ids.iosClientId || undefined,
    androidClientId: ids.androidClientId || undefined,
    webClientId: ids.webClientId || undefined,
  });

  useEffect(() => {
    let cancelled = false;
    async function finish() {
      if (response?.type !== "success") return;
      const idToken =
        response.params.id_token ||
        (response.authentication as { idToken?: string } | null)?.idToken;
      if (!idToken) {
        onError?.("Google did not return an ID token.");
        return;
      }
      setBusy(true);
      try {
        await loginWithGoogle(idToken);
      } catch (e) {
        if (!cancelled) {
          onError?.(e instanceof Error ? e.message : "Google sign-in failed");
        }
      } finally {
        if (!cancelled) setBusy(false);
      }
    }
    finish();
    return () => {
      cancelled = true;
    };
    // Intentionally depend on response only — parent onError is unstable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, loginWithGoogle]);

  if (!configured) {
    return (
      <Pressable
        style={styles.disabled}
        onPress={() =>
          onError?.(
            "Set EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID (and optional iOS/Android client IDs). Server needs AUTH_GOOGLE_ID + POST /api/auth/google deployed.",
          )
        }
      >
        <Text style={styles.disabledText}>Continue with Google (set client IDs)</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.btn, (disabled || busy || !request) && styles.btnDisabled]}
      disabled={disabled || busy || !request}
      onPress={async () => {
        setBusy(true);
        onError?.("");
        try {
          await promptAsync();
        } catch (e) {
          onError?.(e instanceof Error ? e.message : "Google sign-in failed");
        } finally {
          setBusy(false);
        }
      }}
    >
      {busy ? (
        <ActivityIndicator color={colors.ink} />
      ) : (
        <Text style={styles.btnText}>Continue with Google</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.bg,
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
  },
  btnDisabled: { opacity: 0.55 },
  btnText: { color: colors.ink, fontWeight: "700" },
  disabled: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.line,
    borderStyle: "dashed",
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
  },
  disabledText: { color: colors.muted, fontWeight: "600", fontSize: 13, textAlign: "center" },
});
