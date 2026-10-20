import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyText } from '../../services/share';
import { useT } from '../../i18n/useT';

const KEYWORDS = new Set(
  'abstract as base bool break byte case catch char class const continue decimal default delegate do double else enum event explicit extern false finally float for foreach get if implicit in int interface internal is lock long namespace new null object out override private protected public readonly ref return sealed set short static string struct switch this throw true try typeof uint ulong using var virtual void while yield async await'.split(' '),
);

const TOKEN = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(\$?@?"(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?f?\b)|([A-Za-z_][A-Za-z0-9_]*)/g;

type Tok = { text: string; cls?: string };

/** Tiny C# tokenizer: enough for readable highlighting without a dependency. */
function tokenize(code: string): Tok[] {
  const out: Tok[] = [];
  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ text: code.slice(last, i) });
    const [text, com, str, num, word] = m;
    let cls: string | undefined;
    if (com) cls = 'tk-com';
    else if (str) cls = 'tk-str';
    else if (num) cls = 'tk-num';
    else if (word) {
      if (KEYWORDS.has(word)) cls = 'tk-kw';
      else if (/^[A-Z]/.test(word)) cls = 'tk-type';
      else if (code[i + word.length] === '(') cls = 'tk-fn';
    }
    out.push({ text, cls });
    last = i + text.length;
  }
  if (last < code.length) out.push({ text: code.slice(last) });
  return out;
}

export function CodeView({
  code,
  file,
  size = 'md',
  copyable = true,
  className = '',
}: {
  code: string;
  file: string;
  size?: 'sm' | 'md';
  copyable?: boolean;
  className?: string;
}) {
  const { t } = useT();
  const toks = useMemo(() => tokenize(code), [code]);
  const lines = code.split('\n').length;
  const [copied, setCopied] = useState(false);
  return (
    <div className={`code-view overflow-hidden rounded-lg ${className}`}>
      <div className="flex items-center justify-between gap-2 bg-white/5 px-3 py-2 text-[12px] text-white/70">
        <span className="truncate font-mono">{file}</span>
        {copyable && (
          <button
            type="button"
            onClick={async () => {
              if (await copyText(code)) {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }
            }}
            className="flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? t('panel.copied') : t('panel.copy')}
          </button>
        )}
      </div>
      <div className="flex overflow-auto" data-scrollable>
        <pre aria-hidden="true" className={`select-none py-3 pl-3 pr-2 text-right font-mono text-white/25 ${size === 'sm' ? 'text-[11px] leading-[17px]' : 'text-[12.5px] leading-[20px]'}`}>
          {Array.from({ length: lines }, (_, i) => i + 1).join('\n')}
        </pre>
        <pre className={`py-3 pr-4 font-mono ${size === 'sm' ? 'text-[11px] leading-[17px]' : 'text-[12.5px] leading-[20px]'}`}>
          <code>
            {toks.map((tk, i) =>
              tk.cls ? (
                <span key={i} className={tk.cls}>
                  {tk.text}
                </span>
              ) : (
                tk.text
              ),
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
