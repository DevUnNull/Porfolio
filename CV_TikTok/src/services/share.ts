/** Absolute URL of a route on the current deployment. */
export const siteUrl = (path: string) =>
  `${window.location.origin}${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const postPath = (id: string) => `/@devunnull/video/${id}`;
export const postUrl = (id: string) => siteUrl(postPath(id));

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without the async clipboard API.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export const canNativeShare = () => typeof navigator !== 'undefined' && typeof navigator.share === 'function';
