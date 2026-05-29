# neo-design-patterns-hw-08

Було додано реактивний шар на основі патерну Observer для відстеження процесу рендерингу.

1. Структура проекту:
   src/
   ├── interfaces/
   │ ├── DocNode.ts  
   │ ├── DocRenderer.ts  
   │ ├── RenderContext.ts  
   │ └── RenderEventSubscriber.ts
   ├── renderers/
   │ ├── BaseRenderer.ts
   │ ├── HTMLRenderer.ts
   │ ├── MarkdownRenderer.ts
   │ └── PlainTextRenderer.ts
   ├── nodes/
   │ ├── Paragraph.ts  
   │ ├── List.ts  
   │ └── Section.ts  
   ├── factories/
   │ └── RendererFactory.ts
   ├── subscribers/
   │ ├── RenderLoggerSubscriber.ts  
   │ ├── SummaryCollector.ts
   │ └── PerformanceSubscriber.ts
   ├── RenderEventPublisher.ts
   └── main.ts

2. Встановлення:
   npm install

3. Вивід у консоль
   npx ts-node src/main.ts markdown
   npx ts-node src/main.ts html
   npx ts-node src/main.ts plain

4. Збереження у файл
   npx ts-node src/main.ts markdown output.md
   npx ts-node src/main.ts html output.html
   npx ts-node src/main.ts plain output.txt

5. Приклад виводу
   [Log] Rendered Paragraph (44 chars)
   [Log] Rendered Paragraph (53 chars)
   [Log] Rendered List (3 items)
   [Log] Rendered Section ("Composite", level 2)
   [Log] Rendered Paragraph (34 chars)
   [Log] Rendered List (2 items)
   [Log] Rendered Section ("Bridge", level 2)
   [Log] Rendered Section ("Основні патерни", level 2)
   [Log] Rendered Section ("Структурні патерни", level 1)
   [Summary] Rendered 4 sections, 3 paragraphs, 2 lists
   [Performance] Total render time: 3ms

6. Як реалізовано патерн Observer
   `RenderEventPublisher` є статичним класом, який зберігає список підписників і розсилає
   їм події. Кожен елемент документа (`Paragraph`, `List`, `Section`) після завершення
   свого методу `render()` викликає `RenderEventPublisher.notify(context)`, передаючи
   об'єкт `RenderContext` з деталями події (тип елемента, вміст, рівень заголовка,
   кількість пунктів у списку та час рендерингу). Кожен підписник реалізує інтерфейс `RenderEventSubscriber` з методом `update(context)`.

7. Підключення підписників у main.ts
   const logger = new RenderLoggerSubscriber();
   const summary = new SummaryCollector();
   const perf = new PerformanceSubscriber();

RenderEventPublisher.subscribe(logger);
RenderEventPublisher.subscribe(summary);
RenderEventPublisher.subscribe(perf);

8. Як додати нового підписника
   # Реалізаія інтерфейсу `RenderEventSubscriber`:

import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class MyCustomSubscriber implements RenderEventSubscriber {
update(context: RenderContext): void {
if (context.type === "List") {
console.log(`[Custom] List with ${context.items?.length} items detected`);
}
}
}

# Підключення інтерфейсу в main.ts:

const custom = new MyCustomSubscriber();
RenderEventPublisher.subscribe(custom);
