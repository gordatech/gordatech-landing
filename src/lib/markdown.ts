import 'server-only';
import { Marked, type Tokens } from 'marked';

export type TocItem = { id: string; text: string; level: 2 | 3 };

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Markdown (dari admin) → HTML + daftar isi.
 * - "### Judul" di artikel lama dinaikkan ke H2 bila artikel tidak punya H2 (struktur heading benar: satu H1 di halaman).
 * - Heading diberi id untuk daftar isi; tautan eksternal rel="noopener"; tabel dibungkus agar bisa digulir di HP.
 * - HTML mentah di markdown di-escape (konten admin tetap dianggap tidak tepercaya untuk XSS).
 */
export function renderMarkdown(md: string | null | undefined, opts: { baseHeading?: 2 | 3 } = {}) {
  const source = (md ?? '').replace(/\r\n/g, '\n');
  const hasH2 = /^##\s/m.test(source);
  const shift = !hasH2 && /^###\s/m.test(source) ? -1 : 0;
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const marked = new Marked({ gfm: true, breaks: false });
  marked.use({
    renderer: {
      html({ text }: Tokens.HTML | Tokens.Tag) {
        return escapeHtml(text);
      },
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth }: Tokens.Heading) {
        const text = this.parser.parseInline(tokens);
        let level = Math.min(6, Math.max(opts.baseHeading ?? 2, depth + shift));
        if (level === 1) level = 2;
        let id = slugify(text) || `bagian-${toc.length + 1}`;
        while (used.has(id)) id += '-2';
        used.add(id);
        if (level === 2 || level === 3) toc.push({ id, text: text.replace(/<[^>]+>/g, ''), level });
        return `<h${level} id="${id}">${text}</h${level}>\n`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, title, tokens }: Tokens.Link) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.includes('gordatech.com');
        const safe = /^(https?:|mailto:|tel:|\/|#)/.test(href) ? href : '#';
        return `<a href="${escapeHtml(safe)}"${title ? ` title="${escapeHtml(title)}"` : ''}${external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
      },
      table(this: unknown, token: Tokens.Table) {
        const head = token.header.map((c) => `<th>${marked.parseInline(c.text)}</th>`).join('');
        const rows = token.rows.map((r) => `<tr>${r.map((c) => `<td>${marked.parseInline(c.text)}</td>`).join('')}</tr>`).join('');
        return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });

  const html = marked.parse(source, { async: false }) as string;
  return { html, toc };
}

/** Kalimat pertama (untuk ringkasan/AI snippet). */
export const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

/** FAQ dari markdown artikel: bagian "## Pertanyaan …" berisi "### pertanyaan" + jawaban → untuk FAQPage schema. */
export function extractFaqs(md: string | null | undefined): { question: string; answer: string }[] {
  const source = (md ?? '').replace(/\r\n/g, '\n');
  const start = source.search(/^##\s+(?:Pertanyaan|FAQ|Tanya jawab)/im);
  if (start < 0) return [];
  const rest = source.slice(start).split('\n').slice(1).join('\n');
  const end = rest.search(/^##\s/m);
  const block = end < 0 ? rest : rest.slice(0, end);
  const clean = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();
  return block
    .split(/^###\s+/m)
    .slice(1)
    .map((part) => {
      const [q, ...answer] = part.split('\n');
      return { question: clean(q), answer: clean(answer.join(' ')) };
    })
    .filter((x) => x.question && x.answer);
}
