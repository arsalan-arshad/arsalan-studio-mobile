import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

type Props = {
  title: string;
};

export function BrandHeaderTitle({ title }: Props) {
  return (
    <View style={styles.row}>
      <Image
        source={require("../../assets/brand-icon.png")}
        style={styles.icon}
        accessibilityLabel="Arsalan Studio"
      />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    maxWidth: 280,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  title: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "700",
    flexShrink: 1,
  },
});
