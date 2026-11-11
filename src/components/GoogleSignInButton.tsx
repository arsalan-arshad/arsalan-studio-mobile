import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text } from "react-native";
import {
  getGoogleClientIds,
  isGoogleSignInConfigured,
} from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import { colors } from "../theme";

type Props = {
  onError?: (message: string) => void;
  disabled?: boolean;
};

type GoogleNative = {
  GoogleSignin: {
    configure: (opts: {
      webClientId?: string;
      iosClientId?: string;
      offlineAccess?: boolean;
    }) => void;
    hasPlayServices: (opts?: { showPlayServicesUpdateDialog?: boolean }) => Promise<boolean>;
    signIn: () => Promise<{ type: string; data?: { idToken?: string | null } }>;
    getTokens: () => Promise<{ idToken?: string | null }>;
  };
  isErrorWithCode: (e: unknown) => e is { code: string };
  isSuccessResponse: (r: { type: string }) => boolean;
  statusCodes: {
    SIGN_IN_CANCELLED: string;
    IN_PROGRESS: string;
    PLAY_SERVICES_NOT_AVAILABLE: string;
  };
};

let configuredNative = false;
let nativeModule: GoogleNative | null | undefined;

function loadGoogleNative(): GoogleNative | null {
  if (nativeModule !== undefined) return nativeModule;
  try {
    // Lazy require so Expo Go doesn't crash on import when RNGoogleSignin is missing.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    nativeModule = require("@react-native-google-signin/google-signin") as GoogleNative;
  } catch {
    nativeModule = null;
  }
  return nativeModule;
}

function isExpoGo() {
  return Constants.appOwnership === "expo";
}

function ensureGoogleConfigured(mod: GoogleNative) {
  if (configuredNative) return;
  const { webClientId, iosClientId } = getGoogleClientIds();
  mod.GoogleSignin.configure({
    webClientId: webClientId || undefined,
    iosClientId: iosClientId || undefined,
    offlineAccess: false,
  });
  configuredNative = true;
}

function formatNativeGoogleError(mod: GoogleNative, e: unknown): string {
  if (mod.isErrorWithCode(e)) {
    switch (e.code) {
      case mod.statusCodes.SIGN_IN_CANCELLED:
        return "";
      case mod.statusCodes.IN_PROGRESS:
        return "Google sign-in is already in progress.";
      case mod.statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        return "Google Play Services is missing or out of date on this device.";
      default:
        break;
    }
  }
  const message = e instanceof Error ? e.message : "Google sign-in failed";
  if (/access.?blocked|access_denied|403/i.test(message)) {
    return (
      "Google AccessBlocked: add your Google account as a Test user on the OAuth consent screen " +
      "(or publish the app), and confirm AUTH_GOOGLE_ID / AUTH_GOOGLE_IOS_ID / AUTH_GOOGLE_ANDROID_ID match the clients used here."
    );
  }
  if (/DEVELOPER_ERROR|ApiException:\s*10/i.test(message)) {
    return (
      "Google Android DEVELOPER_ERROR: create an Android OAuth client for package studio.arsalan.app " +
      "with this build’s SHA-1 fingerprint, and set EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID to the Web client ID."
    );
  }
  return message;
}

export function GoogleSignInButton({ onError, disabled }: Props) {
  const { loginWithGoogle } = useAuth();
  const configured = isGoogleSignInConfigured();
  const [busy, setBusy] = useState(false);
  const native = loadGoogleNative();
  const needsDevClient = !native || isExpoGo();

  useEffect(() => {
    if (configured && native) {
      try {
        ensureGoogleConfigured(native);
      } catch (e) {
        if (__DEV__) {
          console.warn("[Google auth] configure failed", e);
        }
      }
    }
  }, [configured, native]);

  if (needsDevClient) {
    return (
      <Pressable
        style={styles.disabled}
        onPress={() =>
          onError?.(
            "Native Google Sign-In needs a Dev Client (not Expo Go). Run: eas build -p android --profile development — then install that APK and open it.",
          )
        }
      >
        <Text style={styles.disabledText}>
          Continue with Google (needs Dev Client build)
        </Text>
      </Pressable>
    );
  }

  if (!configured) {
    return (
      <Pressable
        style={styles.disabled}
        onPress={() =>
          onError?.(
            Platform.OS === "ios"
              ? "Set EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID and EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID. Rebuild a Dev Client after creating the iOS OAuth client (bundle studio.arsalan.app)."
              : "Set EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID and EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID. Create an Android OAuth client (package studio.arsalan.app + SHA-1) and rebuild.",
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
          ensureGoogleConfigured(native);
          if (Platform.OS === "android") {
            await native.GoogleSignin.hasPlayServices({
              showPlayServicesUpdateDialog: true,
            });
          }
          if (__DEV__) {
            console.info(
              `[Google auth] native sign-in platform=${Platform.OS} (no browser bridge)`,
            );
          }
          const response = await native.GoogleSignin.signIn();
          if (!native.isSuccessResponse(response)) {
            return;
          }
          const idToken = response.data?.idToken;
          if (!idToken) {
            const tokens = await native.GoogleSignin.getTokens();
            if (!tokens.idToken) {
              onError?.(
                "Google did not return an ID token. Confirm EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is the Web client ID (used as server client id).",
              );
              return;
            }
            await loginWithGoogle(tokens.idToken);
            return;
          }
          await loginWithGoogle(idToken);
        } catch (e) {
          const msg = formatNativeGoogleError(native, e);
          if (msg) onError?.(msg);
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
