import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider } from "../src/lib/AuthContext";
import { colors } from "../src/theme";

/** Hide Expo Dev Client's oversized floating Tools gear; shake still opens the menu. */
function hideExpoToolsFab() {
  try {
    // Optional: only present in expo-dev-client / Expo Go builds.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const DevMenu = require("expo-dev-menu") as {
      setToolsButtonVisible?: (visible: boolean) => void;
    };
    DevMenu.setToolsButtonVisible?.(false);
  } catch {
    // Production / Expo Go without the native module — ignore.
  }
}

export default function RootLayout() {
  useEffect(() => {
    hideExpoToolsFab();
  }, []);

  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: colors.bg },
          // Avoid iOS back label showing the route group name "(tabs)".
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: "Back",
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "Work", headerBackTitle: "Work" }}
        />
        <Stack.Screen
          name="work/[id]"
          options={{
            title: "Case study",
            presentation: "card",
            headerBackTitle: "Work",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
