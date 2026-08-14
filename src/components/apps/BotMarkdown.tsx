import type { ReactNode } from "react";

type Props = {
  text: string;
};

/** Minimal chat markdown: paragraphs, lists, bold, italic, code, links. */
export function BotMarkdown({ text }: Props) {
  return <div className="space-y-2">{parseBlocks(text)}</div>;
}

function parseBlocks(text: string): ReactNode[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const nodes: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    if (!lines[i]?.trim()) {
      i += 1;
      continue;
    }

    if (isUnordered(lines[i]!)) {
      const items: string[] = [];
      while (i < lines.length && isUnordered(lines[i]!)) {
        items.push(lines[i]!.replace(/^[-*•]\s+/, ""));
        i += 1;
      }
      nodes.push(
        <ul
          key={key++}
          className="ml-0.5 list-none space-y-1 pl-0 text-[13px]"
        >
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span
                className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--vos-teal)]"
                aria-hidden
              />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (isOrdered(lines[i]!)) {
      const items: string[] = [];
      while (i < lines.length && isOrdered(lines[i]!)) {
        items.push(lines[i]!.replace(/^\d+[.)]\s+/, ""));
        i += 1;
      }
      nodes.push(
        <ol
          key={key++}
          className="list-decimal space-y-1 pl-4 marker:font-mono marker:text-[10px] marker:text-[var(--vos-teal)]"
        >
          {items.map((item, idx) => (
            <li key={idx}>{parseInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i]?.trim() &&
      !isUnordered(lines[i]!) &&
      !isOrdered(lines[i]!)
    ) {
      para.push(lines[i]!);
      i += 1;
    }
    nodes.push(
      <p key={key++} className="leading-relaxed">
        {para.map((line, idx) => (
          <span key={idx}>
            {idx > 0 && <br />}
            {parseInline(line)}
          </span>
        ))}
      </p>,
    );
  }

  return nodes;
}

function isUnordered(line: string): boolean {
  return /^[-*•]\s+\S/.test(line);
}

function isOrdered(line: string): boolean {
  return /^\d+[.)]\s+\S/.test(line);
}

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let i = 0;
  let key = 0;

  const pushText = (value: string) => {
    if (value) nodes.push(value);
  };

  while (i < text.length) {
    const rest = text.slice(i);

    const link = rest.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/);
    if (link) {
      nodes.push(
        <a
          key={key++}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--vos-teal)] underline decoration-[var(--vos-teal)]/40 underline-offset-2 hover:decoration-[var(--vos-teal)]"
        >
          {link[1]}
        </a>,
      );
      i += link[0].length;
      continue;
    }

    if (rest.startsWith("`")) {
      const end = text.indexOf("`", i + 1);
      if (end !== -1) {
        nodes.push(
          <code
            key={key++}
            className="rounded-sm bg-[color-mix(in_srgb,var(--vos-teal)_14%,transparent)] px-1 py-px font-mono text-[11px] text-[var(--vos-teal)]"
          >
            {text.slice(i + 1, end)}
          </code>,
        );
        i = end + 1;
        continue;
      }
    }

    if (rest.startsWith("**")) {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        nodes.push(
          <strong key={key++} className="font-medium text-[var(--vos-text)]">
            {parseInline(text.slice(i + 2, end))}
          </strong>,
        );
        i = end + 2;
        continue;
      }
      nodes.push(
        <strong key={key++} className="font-medium text-[var(--vos-text)]">
          {text.slice(i + 2)}
        </strong>,
      );
      break;
    }

    if (rest.startsWith("*") && !rest.startsWith("**")) {
      const end = findSingleAsterisk(text, i + 1);
      if (end !== -1) {
        nodes.push(
          <em key={key++} className="text-[var(--vos-text-muted)] italic">
            {parseInline(text.slice(i + 1, end))}
          </em>,
        );
        i = end + 1;
        continue;
      }
    }

    const next = nextSpecial(text, i);
    pushText(text.slice(i, next));
    i = next;
  }

  return nodes;
}

function findSingleAsterisk(text: string, from: number): number {
  for (let i = from; i < text.length; i += 1) {
    if (text[i] === "*" && text[i - 1] !== "*" && text[i + 1] !== "*") {
      return i;
    }
  }
  return -1;
}

function nextSpecial(text: string, from: number): number {
  for (let i = from + 1; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "*" || ch === "`" || ch === "[") return i;
  }
  return text.length;
}
