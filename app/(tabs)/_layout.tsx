import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Platform, Text, type ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BrandHeaderTitle } from "../../src/components/BrandHeaderTitle";
import { useAuth } from "../../src/lib/AuthContext";
import { colors } from "../../src/theme";

type IconName = keyof typeof Ionicons.glyphMap;

function TabLabel({ label, color }: { label: string; color: ColorValue }) {
  return (
    <Text
      numberOfLines={1}
      allowFontScaling={false}
      style={{
        fontSize: 10,
        lineHeight: 12,
        fontWeight: "600",
        color,
        marginTop: 2,
        textAlign: "center",
      }}
    >
      {label}
    </Text>
  );
}

function tabIcon(name: IconName) {
  return ({ color, size }: { color: ColorValue; size: number }) => (
    <Ionicons
      name={name}
      size={size ?? 22}
      color={(color as string | undefined) ?? colors.muted}
    />
  );
}

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

  const bottomPad = Math.max(insets.bottom, Platform.OS === "ios" ? 8 : 6);
  const tabBarHeight = 52 + bottomPad;

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
        tabBarLabelPosition: "below-icon",
        tabBarItemStyle: { paddingTop: 2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: () => <BrandHeaderTitle title="Arsalan Arshad" />,
          tabBarLabel: ({ color }) => <TabLabel label="Home" color={color} />,
          tabBarIcon: tabIcon("home-outline"),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          title: "Work",
          headerTitle: () => <BrandHeaderTitle title="Work" />,
          tabBarLabel: ({ color }) => <TabLabel label="Work" color={color} />,
          tabBarIcon: tabIcon("briefcase-outline"),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: "Offers",
          headerTitle: () => <BrandHeaderTitle title="Offers" />,
          tabBarLabel: ({ color }) => <TabLabel label="Offers" color={color} />,
          tabBarIcon: tabIcon("pricetag-outline"),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Chat",
          headerTitle: () => <BrandHeaderTitle title="Chat" />,
          tabBarLabel: ({ color }) => <TabLabel label="Chat" color={color} />,
          tabBarIcon: tabIcon("chatbubbles-outline"),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          headerTitle: () => <BrandHeaderTitle title="Contact" />,
          tabBarLabel: ({ color }) => <TabLabel label="Contact" color={color} />,
          tabBarIcon: tabIcon("mail-outline"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Account",
          headerTitle: () => <BrandHeaderTitle title="Account" />,
          tabBarLabel: ({ color }) => <TabLabel label="Account" color={color} />,
          tabBarIcon: tabIcon("person-outline"),
        }}
      />
    </Tabs>
  );
}
