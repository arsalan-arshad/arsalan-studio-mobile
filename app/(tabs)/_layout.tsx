import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Platform, type ColorValue, type TextStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrandHeaderTitle } from "../../src/components/BrandHeaderTitle";
import { useAuth } from "../../src/lib/AuthContext";
import { colors } from "../../src/theme";

type IconName = keyof typeof Ionicons.glyphMap;

function tabIcon(name: IconName) {
  return ({ color, size }: { color: ColorValue; size: number }) => (
    <Ionicons
      name={name}
      size={size ?? 22}
      color={(color as string | undefined) || colors.muted}
    />
  );
}

const labelStyle: TextStyle = {
  fontSize: 10,
  fontWeight: "600",
  marginTop: 2,
  ...(Platform.OS === "android" ? { includeFontPadding: false } : null),
};

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const didInitialRoute = useRef(false);

  // Logged-in cold start → Chat (once per mount of tabs layout).
  useEffect(() => {
    if (loading || didInitialRoute.current) return;
    didInitialRoute.current = true;
    if (user) {
      router.replace("/messages");
    }
  }, [loading, user, router]);

  const bottomPad = Math.max(insets.bottom, Platform.OS === "ios" ? 8 : 10);
  const tabBarHeight = (Platform.OS === "android" ? 58 : 54) + bottomPad;

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.ink,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colors.elevated,
          borderTopColor: colors.line,
          height: tabBarHeight,
          paddingBottom: bottomPad,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: labelStyle,
        tabBarItemStyle: {
          paddingTop: 2,
          paddingBottom: Platform.OS === "android" ? 2 : 0,
        },
        tabBarAllowFontScaling: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: () => <BrandHeaderTitle title="Arsalan Arshad" />,
          tabBarLabel: "Home",
          tabBarIcon: tabIcon("home-outline"),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          title: "Work",
          headerTitle: () => <BrandHeaderTitle title="Work" />,
          tabBarLabel: "Work",
          tabBarIcon: tabIcon("briefcase-outline"),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: "Offers",
          headerTitle: () => <BrandHeaderTitle title="Offers" />,
          tabBarLabel: "Offers",
          tabBarIcon: tabIcon("pricetag-outline"),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Chat",
          headerTitle: () => <BrandHeaderTitle title="Chat" />,
          tabBarLabel: "Chat",
          tabBarIcon: tabIcon("chatbubbles-outline"),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          headerTitle: () => <BrandHeaderTitle title="Contact" />,
          tabBarLabel: "Contact",
          tabBarIcon: tabIcon("mail-outline"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Account",
          headerTitle: () => <BrandHeaderTitle title="Account" />,
          tabBarLabel: "Account",
          tabBarIcon: tabIcon("person-outline"),
        }}
      />
    </Tabs>
  );
}
