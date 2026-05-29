import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class SummaryCollector implements RenderEventSubscriber {
  private sections = 0;
  private paragraphs = 0;
  private lists = 0;

  update(context: RenderContext): void {
    if (context.type === "Section") this.sections++;
    else if (context.type === "Paragraph") this.paragraphs++;
    else if (context.type === "List") this.lists++;
  }

  printSummary(): void {
    console.log(
      `[Summary] Rendered ${this.sections} sections, ${this.paragraphs} paragraphs, ${this.lists} lists`,
    );
  }
}
