/**
 * Dynamic Expo config so the Google Sign-In iOS URL scheme can be derived
 * from EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID at prebuild / EAS build time.
 *
 * iosUrlScheme = reverse of the iOS OAuth client ID, e.g.
 *   123-abc.apps.googleusercontent.com → com.googleusercontent.apps.123-abc
 */
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID?.trim() || "";
const iosClientPrefix = iosClientId.replace(/\.apps\.googleusercontent\.com$/, "");
const iosUrlScheme = iosClientPrefix
  ? `com.googleusercontent.apps.${iosClientPrefix}`
  : "com.googleusercontent.apps.REPLACE_WITH_IOS_CLIENT_ID";

/** @type {import('expo/config').ExpoConfig} */
const expoConfig = {
  name: "Arsalan Arshad",
  slug: "arsalan-studio",
  owner: "arsalandev",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "arsalanstudio",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "studio.arsalan.app",
    buildNumber: "1",
    associatedDomains: ["applinks:arsalandev.studio"],
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#ffffff",
      foregroundImage: "./assets/android-icon-foreground.png",
      backgroundImage: "./assets/android-icon-background.png",
      monochromeImage: "./assets/android-icon-monochrome.png",
    },
    package: "studio.arsalan.app",
    predictiveBackGestureEnabled: false,
    intentFilters: [
      {
        action: "VIEW",
        autoVerify: true,
        data: [
          {
            scheme: "https",
            host: "arsalandev.studio",
            pathPrefix: "/",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },
  web: {
    favicon: "./assets/favicon.png",
    bundler: "metro",
  },
  plugins: [
    "expo-router",
    "expo-web-browser",
    "expo-dev-client",
    [
      "@react-native-google-signin/google-signin",
      {
        iosUrlScheme,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "bf21c605-0979-43a5-a181-c2a82bd53be4",
    },
    apiUrl: "https://arsalandev.studio",
    domain: "arsalandev.studio",
  },
};

module.exports = { expo: expoConfig };
