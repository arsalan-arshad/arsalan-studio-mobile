import type { ImageSourcePropType } from "react-native";

/** Local brand art (copied from web public/brands). Keys match mobile case study ids. */
export const brandAssets: Record<
  string,
  { icon: ImageSourcePropType; banner: ImageSourcePropType }
> = {
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
  sme: {
    icon: require("../../assets/brands/other/sme-automation/icon.png"),
    banner: require("../../assets/brands/other/sme-automation/banner.png"),
  },
};

const WEB = "https://arsalandev.studio";

/** Remote fallbacks if a local asset is missing at runtime. */
export const remoteBrandPaths: Record<string, { icon: string; banner: string }> = {
  "ai-forecast": {
    icon: `${WEB}/brands/shopify/ai-forecast-agent/icon.png`,
    banner: `${WEB}/brands/shopify/ai-forecast-agent/banner.png`,
  },
  pipeline: {
    icon: `${WEB}/brands/shopify/pipeline-aware-forecast/icon.png`,
    banner: `${WEB}/brands/shopify/pipeline-aware-forecast/banner.png`,
  },
  bridge: {
    icon: `${WEB}/brands/shopify/bridge-core-recipes/icon.png`,
    banner: `${WEB}/brands/shopify/bridge-core-recipes/banner.png`,
  },
  protocols: {
    icon: `${WEB}/brands/shopify/practitioner-protocols/icon.png`,
    banner: `${WEB}/brands/shopify/practitioner-protocols/banner.png`,
  },
  mcp: {
    icon: `${WEB}/brands/shopify/inventory-mcp/icon.svg`,
    banner: `${WEB}/brands/shopify/inventory-mcp/banner.svg`,
  },
  "smart-cloner": {
    icon: `${WEB}/brands/salesforce/smart-record-cloner/icon.png`,
    banner: `${WEB}/brands/salesforce/smart-record-cloner/banner.jpg`,
  },
  "flow-toast": {
    icon: `${WEB}/brands/salesforce/clean-flow-toast/icon.png`,
    banner: `${WEB}/brands/salesforce/clean-flow-toast/banner.jpg`,
  },
  "file-viewer": {
    icon: `${WEB}/brands/salesforce/universal-quick-file/icon.png`,
    banner: `${WEB}/brands/salesforce/universal-quick-file/banner.jpg`,
  },
  "sf-connector": {
    icon: `${WEB}/brands/salesforce/shopify-sf-connector/icon.png`,
    banner: `${WEB}/brands/salesforce/shopify-sf-connector/banner.png`,
  },
  "forecast-bridge": {
    icon: `${WEB}/brands/salesforce/shopify-ai-forecast-bridge/icon.png`,
    banner: `${WEB}/brands/salesforce/shopify-ai-forecast-bridge/banner.png`,
  },
  "urdu-nlu": {
    icon: `${WEB}/brands/other/urdu-business-nlu/icon.png`,
    banner: `${WEB}/brands/other/urdu-business-nlu/banner.png`,
  },
  hub: {
    icon: `${WEB}/brands/other/influencer-hub/icon.png`,
    banner: `${WEB}/brands/other/influencer-hub/banner.png`,
  },
  sme: {
    icon: `${WEB}/brands/other/sme-automation/icon.png`,
    banner: `${WEB}/brands/other/sme-automation/banner.png`,
  },
};

export function getBrandIcon(id: string): ImageSourcePropType | undefined {
  return brandAssets[id]?.icon;
}

export function getBrandBanner(id: string): ImageSourcePropType | undefined {
  return brandAssets[id]?.banner;
}
