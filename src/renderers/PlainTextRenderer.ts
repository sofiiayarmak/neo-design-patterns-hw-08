import { BaseRenderer } from "./BaseRenderer";

export class PlainTextRenderer extends BaseRenderer {
  renderHeader(level: number, text: string): string {
    const underline = (level === 1 ? "=" : "-").repeat(text.length);
    return `${text}\n${underline}\n`;
  }

  renderParagraph(text: string): string {
    return `${text}\n`;
  }

  renderList(items: string[]): string {
    return items.map((item, i) => `${i + 1}. ${item}`).join("\n") + "\n";
  }
}
