import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useEffect, useRef, type ComponentProps } from "react";
import { Platform, Text, type ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  HeaderSettingsButton,
  HeaderTitle,
} from "../../src/components/HeaderBrand";
import { useAuth } from "../../src/lib/AuthContext";
import { colors } from "../../src/theme";

type IonName = ComponentProps<typeof Ionicons>["name"];

/** Custom label — numberOfLines:1 + shrink-to-fit stops iOS mid-word wraps on 6 tabs. */
function TabLabel({ label, color }: { label: string; color: ColorValue }) {
  return (
    <Text
      numberOfLines={1}
      allowFontScaling={false}
      adjustsFontSizeToFit
      minimumFontScale={0.75}
      style={{
        fontSize: 9,
        lineHeight: 11,
        fontWeight: "600",
        color,
        marginTop: 1,
        textAlign: "center",
        width: "100%",
        ...(Platform.OS === "android" ? { includeFontPadding: false } : null),
      }}
    >
      {label}
    </Text>
  );
}

function tabIcon(focused: boolean, outline: IonName, solid: IonName) {
  return (
    <Ionicons
      name={focused ? solid : outline}
      size={20}
      color={focused ? colors.accent : colors.muted}
    />
  );
}

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const didRedirect = useRef(false);

  // Logged-in cold open → Chat (once per tabs mount). Logged-out stays on Home.
  useEffect(() => {
    if (loading || didRedirect.current || !user) return;
    didRedirect.current = true;
    router.replace("/messages");
  }, [loading, user, router]);

  const bottomPad = Math.max(insets.bottom, Platform.OS === "ios" ? 8 : 10);
  const tabBarHeight = (Platform.OS === "android" ? 58 : 54) + bottomPad;

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.ink,
        headerShadowVisible: false,
        headerTitleAlign: "left",
        headerRight: () => <HeaderSettingsButton />,
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
          headerTitle: () => <HeaderTitle title="Arsalan Arshad" />,
          tabBarLabel: ({ color }) => <TabLabel label="Home" color={color} />,
          tabBarIcon: ({ focused }) => tabIcon(focused, "home-outline", "home"),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          title: "Work",
          headerTitle: () => <HeaderTitle title="Work" />,
          tabBarLabel: ({ color }) => <TabLabel label="Work" color={color} />,
          tabBarIcon: ({ focused }) =>
            tabIcon(focused, "briefcase-outline", "briefcase"),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: "Offers",
          headerTitle: () => <HeaderTitle title="Offers" />,
          tabBarLabel: ({ color }) => <TabLabel label="Offers" color={color} />,
          tabBarIcon: ({ focused }) =>
            tabIcon(focused, "pricetag-outline", "pricetag"),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Chat",
          headerTitle: () => <HeaderTitle title="Chat" />,
          tabBarLabel: ({ color }) => <TabLabel label="Chat" color={color} />,
          tabBarIcon: ({ focused }) =>
            tabIcon(focused, "chatbubbles-outline", "chatbubbles"),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          headerTitle: () => <HeaderTitle title="Contact" />,
          tabBarLabel: ({ color }) => (
            <TabLabel label="Contact" color={color} />
          ),
          tabBarIcon: ({ focused }) => tabIcon(focused, "mail-outline", "mail"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Account",
          headerTitle: () => <HeaderTitle title="Account" />,
          tabBarLabel: ({ color }) => (
            <TabLabel label="Account" color={color} />
          ),
          tabBarIcon: ({ focused }) =>
            tabIcon(focused, "person-outline", "person"),
          headerRight: () => null,
        }}
      />
    </Tabs>
  );
}
