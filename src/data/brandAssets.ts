import type { ImageSourcePropType } from "react-native";

/** Local Metro requires — must be static paths for bundling. */
export const brandMark = require("../../assets/brand-mark.png") as ImageSourcePropType;
export const brandIcon = require("../../assets/brand-icon.png") as ImageSourcePropType;
export const digitizeMark =
  require("../../assets/brands/digitize-turf/mark.png") as ImageSourcePropType;

export type CaseStudyMedia = {
  icon: ImageSourcePropType;
  banner: ImageSourcePropType;
};

/** Maps mobile case-study ids → bundled brand icon + banner. */
export const caseStudyMedia: Record<string, CaseStudyMedia> = {
  pathwise: {
    icon: require("../../assets/brands/ai/pathwise/icon.png"),
    banner: require("../../assets/brands/ai/pathwise/banner.png"),
  },
  "ai-forecast": {
    icon: require("../../assets/brands/shopify/ai-forecast-agent/icon.png"),
    banner: require("../../assets/brands/shopify/ai-forecast-agent/banner.png"),
  },
  pipeline: {
    icon: require("../../assets/brands/shopify/pipeline-aware-forecast/icon.png"),
    banner: require("../../assets/brands/shopify/pipeline-aware-forecast/banner.png"),
  },
  bridge: {
    icon: require("../../assets/brands/shopify/bridge-core-recipes/icon.png"),
    banner: require("../../assets/brands/shopify/bridge-core-recipes/banner.png"),
  },
  protocols: {
    icon: require("../../assets/brands/shopify/practitioner-protocols/icon.png"),
    banner: require("../../assets/brands/shopify/practitioner-protocols/banner.png"),
  },
  mcp: {
    icon: require("../../assets/brands/shopify/inventory-mcp/icon.png"),
    banner: require("../../assets/brands/shopify/inventory-mcp/banner.png"),
  },
  "smart-cloner": {
    icon: require("../../assets/brands/salesforce/smart-record-cloner/icon.png"),
    banner: require("../../assets/brands/salesforce/smart-record-cloner/banner.jpg"),
  },
  "flow-toast": {
    icon: require("../../assets/brands/salesforce/clean-flow-toast/icon.png"),
    banner: require("../../assets/brands/salesforce/clean-flow-toast/banner.jpg"),
  },
  "file-viewer": {
    icon: require("../../assets/brands/salesforce/universal-quick-file/icon.png"),
    banner: require("../../assets/brands/salesforce/universal-quick-file/banner.jpg"),
  },
  "sf-connector": {
    icon: require("../../assets/brands/salesforce/shopify-sf-connector/icon.png"),
    banner: require("../../assets/brands/salesforce/shopify-sf-connector/banner.png"),
  },
  "forecast-bridge": {
    icon: require("../../assets/brands/salesforce/shopify-ai-forecast-bridge/icon.png"),
    banner: require("../../assets/brands/salesforce/shopify-ai-forecast-bridge/banner.png"),
  },
  "urdu-nlu": {
    icon: require("../../assets/brands/other/urdu-business-nlu/icon.png"),
    banner: require("../../assets/brands/other/urdu-business-nlu/banner.png"),
  },
  hub: {
    icon: require("../../assets/brands/other/influencer-hub/icon.png"),
    banner: require("../../assets/brands/other/influencer-hub/banner.png"),
  },
  "proposal-guard": {
    icon: require("../../assets/brands/other/proposal-guard/icon.png"),
    banner: require("../../assets/brands/other/proposal-guard/banner.png"),
  },
  sme: {
    icon: require("../../assets/brands/other/sme-automation/icon.png"),
    banner: require("../../assets/brands/other/sme-automation/banner.png"),
  },
  "eu-ai-act": {
    icon: require("../../assets/brands/other/eu-ai-act-checker/icon.png"),
    banner: require("../../assets/brands/other/eu-ai-act-checker/banner.png"),
  },
  freight: {
    icon: require("../../assets/brands/other/freight-exceptions/icon.png"),
    banner: require("../../assets/brands/other/freight-exceptions/banner.png"),
  },
};

/** @deprecated Prefer caseStudyMedia / getCaseStudyMedia */
export const brandAssets = caseStudyMedia;

export function getCaseStudyMedia(id: string): CaseStudyMedia | undefined {
  return caseStudyMedia[id];
}

export function getBrandIcon(id: string): ImageSourcePropType | undefined {
  return caseStudyMedia[id]?.icon;
}

export function getBrandBanner(id: string): ImageSourcePropType | undefined {
  return caseStudyMedia[id]?.banner;
}
