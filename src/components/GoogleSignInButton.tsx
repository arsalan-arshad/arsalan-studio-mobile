import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text } from "react-native";
import {
  getGoogleClientIds,
  isGoogleSignInConfigured,
} from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import { colors } from "../theme";

WebBrowser.maybeCompleteAuthSession();

/** Matches app.json `scheme` — add this URI on the Google Web OAuth client. */
const GOOGLE_REDIRECT_URI = makeRedirectUri({
  scheme: "arsalanstudio",
  path: "oauthredirect",
});

type Props = {
  onError?: (message: string) => void;
  disabled?: boolean;
};

function formatGoogleAuthError(response: {
  type: string;
  errorCode?: string | null;
  params?: Record<string, string>;
  error?: { message?: string; code?: string } | null;
}): string {
  const params = response.params ?? {};
  const code = (
    params.error ||
    response.errorCode ||
    response.error?.code ||
    ""
  ).toLowerCase();
  const description = (
    params.error_description ||
    params.error_message ||
    response.error?.message ||
    ""
  ).replace(/\+/g, " ");

  if (
    code === "access_denied" ||
    /access.?blocked|access_denied|app.?is.?blocked/i.test(description)
  ) {
    return (
      "Google AccessBlocked: OAuth consent is likely in Testing without your Google account as a Test user, " +
      "or the redirect URI / client type is wrong for this build. " +
      "In Google Cloud Console → OAuth consent screen: add your email under Test users (or publish the app). " +
      `Authorized redirect URIs on the Web client must include ${GOOGLE_REDIRECT_URI}. ` +
      "Prefer a Dev Client / store build over Expo Go for native Google sign-in."
    );
  }

  if (code === "redirect_uri_mismatch" || /redirect.?uri/i.test(description)) {
    return (
      `Google redirect URI mismatch. Add ${GOOGLE_REDIRECT_URI} to the Web OAuth client's Authorized redirect URIs ` +
      "(and iOS/Android clients if you set those IDs)."
    );
  }

  if (description) return description;
  if (code) return `Google sign-in failed (${code}).`;
  return "Google sign-in was cancelled or failed.";
}

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
    redirectUri: GOOGLE_REDIRECT_URI,
  });

  useEffect(() => {
    let cancelled = false;
    async function finish() {
      if (!response) return;

      if (response.type === "error" || response.type === "dismiss") {
        if (response.type === "error" && !cancelled) {
          onError?.(formatGoogleAuthError(response));
        }
        return;
      }

      if (response.type !== "success") return;

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
          // Log redirect once in __DEV__ so Console URIs can be matched exactly.
          if (__DEV__) {
            console.info(
              `[Google auth] redirectUri=${GOOGLE_REDIRECT_URI} platform=${Platform.OS}`,
            );
          }
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
