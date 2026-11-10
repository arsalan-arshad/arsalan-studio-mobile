import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useState } from "react";
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text } from "react-native";
import {
  getApiBase,
  isGoogleSignInConfigured,
} from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import { colors } from "../theme";

WebBrowser.maybeCompleteAuthSession();

/** App scheme callback — used only as our return URL, never as Google's redirect_uri. */
const APP_RETURN_URI = Linking.createURL("oauthredirect");

type Props = {
  onError?: (message: string) => void;
  disabled?: boolean;
};

function extractIdToken(url: string): string | null {
  try {
    const parsed = Linking.parse(url);
    const q = parsed.queryParams ?? {};
    const fromQuery = q.id_token;
    if (typeof fromQuery === "string" && fromQuery.length > 20) return fromQuery;

    const hash = url.includes("#") ? url.slice(url.indexOf("#") + 1) : "";
    if (hash) {
      const params = new URLSearchParams(hash);
      const fromHash = params.get("id_token");
      if (fromHash && fromHash.length > 20) return fromHash;
    }
  } catch {
    // fall through
  }
  return null;
}

function formatBridgeError(message: string): string {
  if (/access.?blocked|access_denied|403/i.test(message)) {
    return (
      "Google AccessBlocked: add your Google account as a Test user on the OAuth consent screen " +
      "(or publish the app), and confirm AUTH_GOOGLE_ID matches the Web client used on arsalandev.studio."
    );
  }
  if (/client was not found|invalid_client|404/i.test(message)) {
    return (
      "Google OAuth client was not found. Check EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is the full Web client ID " +
      "(same value as AUTH_GOOGLE_ID on Railway)."
    );
  }
  return message;
}

export function GoogleSignInButton({ onError, disabled }: Props) {
  const { loginWithGoogle } = useAuth();
  const configured = isGoogleSignInConfigured();
  const [busy, setBusy] = useState(false);

  if (!configured) {
    return (
      <Pressable
        style={styles.disabled}
        onPress={() =>
          onError?.(
            "Set EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID (same as AUTH_GOOGLE_ID). Server needs POST /api/auth/google deployed.",
          )
        }
      >
        <Text style={styles.disabledText}>Continue with Google (set client IDs)</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.btn, (disabled || busy) && styles.btnDisabled]}
      disabled={disabled || busy}
      onPress={async () => {
        setBusy(true);
        onError?.("");
        try {
          const bridgeUrl = `${getApiBase().replace(/\/$/, "")}/oauth/mobile-google`;
          if (__DEV__) {
            console.info(
              `[Google auth] bridge=${bridgeUrl} return=${APP_RETURN_URI} platform=${Platform.OS}`,
            );
          }

          // Hosted GIS page issues the id_token (JS origin only). Custom schemes are
          // not sent to Google — only used to return into the app.
          const result = await WebBrowser.openAuthSessionAsync(
            bridgeUrl,
            APP_RETURN_URI,
          );

          if (result.type === "cancel" || result.type === "dismiss") {
            return;
          }
          if (result.type !== "success" || !("url" in result) || !result.url) {
            onError?.("Google sign-in was cancelled or failed.");
            return;
          }

          const idToken = extractIdToken(result.url);
          if (!idToken) {
            onError?.(
              formatBridgeError(
                "Google did not return an ID token. Try again, or confirm AUTH_GOOGLE_ID is set on the server.",
              ),
            );
            return;
          }

          await loginWithGoogle(idToken);
        } catch (e) {
          onError?.(
            formatBridgeError(
              e instanceof Error ? e.message : "Google sign-in failed",
            ),
          );
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
