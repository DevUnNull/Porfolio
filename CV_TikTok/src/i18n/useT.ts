import { useCallback } from 'react';
import { useStore } from '../store/useStore';
import type { L } from '../data/types';
import { en, type MessageKey } from './en';
import { vi } from './vi';

const dict = { en, vi } as const;

export function useT() {
  const lang = useStore((s) => s.lang);
  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) => {
      let s: string = dict[lang][key] ?? en[key];
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
      return s;
    },
    [lang],
  );
  const l = useCallback((v: L) => v[lang] || v.en, [lang]);
  return { t, l, lang };
}
