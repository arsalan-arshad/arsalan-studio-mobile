import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { brandIcon } from "../data/brandAssets";
import { colors } from "../theme";

export function HeaderTitle({ title }: { title: string }) {
  return (
    <View style={styles.titleRow}>
      <Image source={brandIcon} style={styles.mark} resizeMode="contain" />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

export function HeaderSettingsButton() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/profile")}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel="Account settings"
      style={styles.settingsBtn}
    >
      <Ionicons name="settings-outline" size={20} color={colors.ink} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    maxWidth: 260,
  },
  mark: { width: 22, height: 22 },
  title: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  settingsBtn: {
    marginRight: 4,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
