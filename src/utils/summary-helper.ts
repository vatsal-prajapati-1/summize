const parseSection = (section: string): { title: string; points: string[] } => {
  const [title, ...content] = section.split("\n");

  const cleantTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: String[] = [];

  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith(".")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += "" + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleantTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ) as string[],
  };
};

const parsePoint = (point: string) => {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^\•/.test(point);

  // Replace the Unicode property escape with a simpler emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u2600-\u26FF]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
};

const parseEmojiPoint = (content: string) => {
  const cleanContent = content.replace(/^•\s*/, "").trim();

  const matches = cleanContent.match(/^\p{Emoji}+(.+)$/u);
  if (!matches) return null;

  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
};

export { parseSection, parsePoint, parseEmojiPoint };
