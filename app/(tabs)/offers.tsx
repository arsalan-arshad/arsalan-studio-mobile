import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { offers } from "../../src/data/offers";
import { colors } from "../../src/theme";

export default function OffersScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Offers</Text>
      <Text style={styles.sub}>
        Productized packages. Start a conversation — you work with me directly.
      </Text>
      {offers.map((offer) => (
        <View key={offer.id} style={styles.card}>
          <Text style={styles.name}>{offer.name}</Text>
          <Text style={styles.forWho}>
            <Text style={styles.label}>For: </Text>
            {offer.forWho}
          </Text>
          {offer.includes.map((line) => (
            <Text key={line} style={styles.bullet}>
              · {line}
            </Text>
          ))}
          <Text style={styles.start}>{offer.startingPoint}</Text>
          <Link href={{ pathname: "/contact", params: { need: offer.id } }} asChild>
            <Pressable style={styles.cta}>
              <Text style={styles.ctaText}>{offer.cta}</Text>
            </Pressable>
          </Link>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 48 },
  title: { color: colors.ink, fontSize: 28, fontWeight: "700" },
  sub: { marginTop: 8, marginBottom: 16, color: colors.muted, fontSize: 14, lineHeight: 20 },
  card: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: 20,
  },
  name: { color: colors.ink, fontSize: 20, fontWeight: "700" },
  forWho: { marginTop: 10, color: colors.muted, fontSize: 14, lineHeight: 20 },
  label: { color: colors.accent },
  bullet: { marginTop: 6, color: colors.ink, fontSize: 13, lineHeight: 18, opacity: 0.9 },
  start: { marginTop: 12, color: colors.muted, fontSize: 13 },
  cta: {
    marginTop: 14,
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 4,
  },
  ctaText: { color: "#f8faf9", fontWeight: "700", fontSize: 13 },
});
