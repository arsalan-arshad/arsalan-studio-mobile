import type { ReactNode } from "react";
import { Linking, Pressable, Text, type TextStyle } from "react-native";

/** Match http(s) URLs; stop before whitespace or common trailing punctuation. */
const URL_PATTERN = /https?:\/\/[^\s<>"']+/g;

function trimTrailingPunctuation(raw: string): { url: string; trailing: string } {
  let url = raw;
  let trailing = "";
  while (url.length > 0 && /[.,;:!?)]$/.test(url)) {
    trailing = url.slice(-1) + trailing;
    url = url.slice(0, -1);
  }
  return { url, trailing };
}

/** True when the string is a navigable http(s) URL (no `[placeholder]` tokens). */
export function isNavigableHttpUrl(value: string): boolean {
  if (value.includes("[")) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

type LinkTextProps = {
  children: string;
  style?: TextStyle;
};

/** Open a URL when pressed; keeps selectable copy for long-press. */
function LinkText({ children, style }: LinkTextProps) {
  return (
    <Text
      selectable
      style={style}
      onPress={() => Linking.openURL(children)}
      accessibilityRole="link"
    >
      {children}
    </Text>
  );
}

/** Render plain text with navigable http(s) URLs as tappable links. */
export function linkifyText(text: string, style?: TextStyle, linkStyle?: TextStyle) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(URL_PATTERN.source, "g");

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const { url, trailing } = trimTrailingPunctuation(match[0]);
    if (isNavigableHttpUrl(url)) {
      nodes.push(
        <LinkText key={`${url}-${match.index}`} style={linkStyle ?? style}>
          {url}
        </LinkText>,
      );
    } else {
      nodes.push(url);
    }
    if (trailing) nodes.push(trailing);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 1 ? nodes[0] : nodes;
}

type InstallGuideUrlProps = {
  url: string;
  style?: TextStyle;
};

/** Guide URL as a real link when navigable; otherwise plain selectable text. */
export function InstallGuideUrl({ url, style }: InstallGuideUrlProps) {
  if (isNavigableHttpUrl(url)) {
    return (
      <Pressable
        onPress={() => Linking.openURL(url)}
        accessibilityRole="link"
        accessibilityLabel={url}
      >
        <Text selectable style={style}>
          {url}
        </Text>
      </Pressable>
    );
  }

  return (
    <Text selectable style={style}>
      {url}
    </Text>
  );
}
