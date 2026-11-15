import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  categoryKeys,
  categoryLabel,
  panelEyebrow,
  parseWorkCategory,
  studiesByCategory,
  type CaseStudy,
  type CaseStudyCategory,
} from "../data/caseStudies";
import { colors } from "../theme";
import { CaseStudyListItem } from "./CaseStudyList";

export type CaseStudyTabsMode = "home" | "full";

type Tab = {
  key: CaseStudyCategory;
  label: string;
  studies: CaseStudy[];
  totalCount: number;
  panelEyebrow?: string;
};

function homePreview(category: CaseStudyCategory): CaseStudy[] {
  const sorted = studiesByCategory(category);
  return sorted.length <= 3 ? sorted : sorted.slice(0, 3);
}

function buildTabs(mode: CaseStudyTabsMode): Tab[] {
  return categoryKeys.map((key) => {
    const allInCategory = studiesByCategory(key);
    return {
      key,
      label: categoryLabel[key],
      studies: mode === "home" ? homePreview(key) : allInCategory,
      totalCount: allInCategory.length,
      panelEyebrow: panelEyebrow(key, allInCategory.length),
    };
  });
}

type Props = {
  mode?: CaseStudyTabsMode;
  /** Initial / deep-link category (e.g. from Work route params). */
  initialCategory?: string | string[];
  onCategoryChange?: (key: CaseStudyCategory) => void;
  onViewMore?: (key: CaseStudyCategory) => void;
};

export function CaseStudyCategoryTabs({
  mode = "full",
  initialCategory,
  onCategoryChange,
  onViewMore,
}: Props) {
  const tabs = useMemo(() => buildTabs(mode), [mode]);
  const populated = useMemo(
    () => tabs.filter((tab) => tab.totalCount > 0),
    [tabs],
  );
  const defaultKey = populated[0]?.key ?? "ai";

  const [active, setActive] = useState<CaseStudyCategory>(() => {
    const fromParam = parseWorkCategory(initialCategory);
    if (fromParam && populated.some((tab) => tab.key === fromParam)) {
      return fromParam;
    }
    return defaultKey;
  });

  useEffect(() => {
    const fromParam = parseWorkCategory(initialCategory);
    if (fromParam && populated.some((tab) => tab.key === fromParam)) {
      setActive(fromParam);
    }
  }, [initialCategory, populated]);

  function selectTab(key: CaseStudyCategory) {
    setActive(key);
    onCategoryChange?.(key);
  }

  const current =
    populated.find((tab) => tab.key === active) ?? populated[0] ?? null;

  if (!current) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.tabRow}>
        {populated.map((tab) => {
          const selected = tab.key === current.key;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, selected ? styles.tabActive : styles.tabGhost]}
              onPress={() => selectTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  selected ? styles.tabTextActive : styles.tabTextGhost,
                ]}
              >
                {tab.label}
                <Text style={styles.badge}> ({tab.totalCount})</Text>
              </Text>
            </Pressable>
          );
        })}
      </View>

      {current.panelEyebrow ? (
        <Text style={styles.eyebrow}>{current.panelEyebrow}</Text>
      ) : null}

      <View style={styles.list}>
        {current.studies.map((study) => (
          <CaseStudyListItem key={study.id} item={study} />
        ))}
      </View>

      {mode === "home" &&
      current.totalCount > current.studies.length &&
      onViewMore ? (
        <Pressable
          style={styles.viewMore}
          onPress={() => onViewMore(current.key)}
        >
          <Text style={styles.viewMoreText}>View more</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 8 },
  tabRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  tabActive: { backgroundColor: colors.accent },
  tabGhost: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
  },
  tabText: { fontSize: 13, fontWeight: "600" },
  tabTextActive: { color: colors.onAccent },
  tabTextGhost: { color: colors.ink },
  badge: { fontSize: 12, fontWeight: "500", opacity: 0.85 },
  eyebrow: {
    marginTop: 12,
    marginBottom: 2,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
  },
  list: { marginTop: 4, borderBottomWidth: 1, borderBottomColor: colors.line },
  viewMore: {
    marginTop: 12,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.elevated,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 4,
  },
  viewMoreText: { color: colors.ink, fontWeight: "600", fontSize: 13 },
});
