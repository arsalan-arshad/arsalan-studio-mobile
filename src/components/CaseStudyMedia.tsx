import { Image, StyleSheet, View, type ImageStyle, type StyleProp, type ViewStyle } from "react-native";
import { getCaseStudyMedia } from "../data/brandAssets";
import { colors } from "../theme";

type Props = {
  id: string;
  variant?: "icon" | "banner";
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

/** Renders bundled case-study icon or banner; never an empty Image. */
export function CaseStudyMedia({
  id,
  variant = "icon",
  style,
  imageStyle,
}: Props) {
  const media = getCaseStudyMedia(id);
  if (!media) {
    return (
      <View
        style={[
          variant === "banner" ? styles.bannerFallback : styles.iconFallback,
          style,
        ]}
      />
    );
  }

  const source = variant === "banner" ? media.banner : media.icon;
  return (
    <View
      style={[
        variant === "banner" ? styles.bannerFrame : styles.iconFrame,
        style,
      ]}
    >
      <Image
        source={source}
        style={[
          variant === "banner" ? styles.banner : styles.icon,
          imageStyle,
        ]}
        resizeMode={variant === "banner" ? "cover" : "contain"}
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconFrame: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.elevated,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { width: 36, height: 36 },
  iconFallback: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.accentWash,
  },
  bannerFrame: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    backgroundColor: colors.elevated,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  banner: { width: "100%", height: "100%" },
  bannerFallback: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    backgroundColor: colors.accentWash,
  },
});
