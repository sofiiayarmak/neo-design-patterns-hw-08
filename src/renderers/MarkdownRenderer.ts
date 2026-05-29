import { BaseRenderer } from "./BaseRenderer";

export class MarkdownRenderer extends BaseRenderer {
  renderHeader(level: number, text: string): string {
    const hashes = "#".repeat(level);
    return `${hashes} ${text}\n`;
  }

  renderParagraph(text: string): string {
    return `${text}\n`;
  }

  renderList(items: string[]): string {
    return items.map((item) => `- ${item}`).join("\n") + "\n";
  }
}
