/** The DevUnNull mark: a null-set glyph with the feed's cyan/pink offset. */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" strokeWidth="6" strokeLinecap="round">
        <circle cx="30" cy="33" r="15" stroke="var(--cyan)" />
        <path d="M19 47 43 18" stroke="var(--cyan)" />
        <circle cx="34" cy="31" r="15" stroke="var(--pink)" />
        <path d="M23 45 47 16" stroke="var(--pink)" />
        <circle cx="32" cy="32" r="15" stroke="var(--fg)" />
        <path d="M21 46 45 17" stroke="var(--fg)" />
      </g>
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-1.5 select-none">
      <LogoMark size={compact ? 34 : 36} />
      {!compact && <span className="text-[22px] font-extrabold tracking-[-0.03em] text-fg">UnNull Feed</span>}
    </span>
  );
}

/** Small itch.io-style controller glyph (not the itch.io logo). */
export function ItchIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 7.5 6 4h12l2 3.5v2a2.5 2.5 0 0 1-4 2 2.5 2.5 0 0 1-4 0 2.5 2.5 0 0 1-4 0 2.5 2.5 0 0 1-4-2z" />
      <path d="M5 11.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7.5" />
      <path d="M10 16h4" />
    </svg>
  );
}
