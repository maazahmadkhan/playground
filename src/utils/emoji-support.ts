import { emojiMap, reverseEmojiMap } from "./emoji-map";

export const replaceEmojiWithText = (str: string) => {
  const emojiRegex = new RegExp(Object.keys(reverseEmojiMap).join("|"), "g");
  return str.replace(emojiRegex, (match) => reverseEmojiMap[match] || match);
};

export const replaceTextWithEmoji = (str: string) => {
  const codeRegex = new RegExp(Object.keys(emojiMap).join("|"), "g");
  return str.replace(codeRegex, (match) => (emojiMap as any)[match] || match);
};
