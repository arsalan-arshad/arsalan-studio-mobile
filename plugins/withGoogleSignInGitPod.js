/**
 * Prefer GoogleSignIn from GitHub when CocoaPods CDN HTTP/2 fails
 * (common "Error in the HTTP2 framing layer" on GoogleSignIn.podspec.json).
 */
const { withDangerousMod } = require("expo/config-plugins");
const fs = require("fs");
const path = require("path");

const MARKER = "# @withGoogleSignInGitPod";
const SNIPPET = `${MARKER}
# Bypass flaky CocoaPods CDN for GoogleSignIn 10.x (used by RNGoogleSignin).
pod 'GoogleSignIn', :git => 'https://github.com/google/GoogleSignIn-iOS.git', :tag => '10.1.0'
`;

function withGoogleSignInGitPod(config) {
  return withDangerousMod(config, [
    "ios",
    async (cfg) => {
      const podfilePath = path.join(cfg.modRequest.platformProjectRoot, "Podfile");
      let contents = fs.readFileSync(podfilePath, "utf8");
      if (contents.includes(MARKER)) {
        return cfg;
      }
      if (!contents.includes("target ")) {
        throw new Error("withGoogleSignInGitPod: could not find target in Podfile");
      }
      // Insert inside the first target block, after `use_expo_modules!` when present.
      if (contents.includes("use_expo_modules!")) {
        contents = contents.replace(
          "use_expo_modules!",
          `use_expo_modules!\n\n  ${SNIPPET}`,
        );
      } else {
        contents = contents.replace(
          /target ['"][^'"]+['"] do\n/,
          (m) => `${m}\n  ${SNIPPET}\n`,
        );
      }
      fs.writeFileSync(podfilePath, contents);
      return cfg;
    },
  ]);
}

module.exports = withGoogleSignInGitPod;
