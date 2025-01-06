const AVG_CHAR_WIDTH = 0.6;

export function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
): string[] {
  const charWidth = fontSize * AVG_CHAR_WIDTH;
  const maxLineLength = Math.floor(maxWidth / charWidth);

  const lines: string[] = [];

  let currentLine = "";
  text.split(" ").forEach((word) => {
    const line = currentLine ? currentLine + " " + word : word;

    if (line.length > maxLineLength) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = line;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}
