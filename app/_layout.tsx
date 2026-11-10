import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../src/lib/AuthContext";
import { colors } from "../src/theme";

export default function RootLayout() {
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
