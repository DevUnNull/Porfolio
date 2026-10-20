import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Category, Lang } from '../data/types';

export type PanelTab = 'details' | 'technical' | 'notes';

interface Toast {
  id: number;
  text: string;
}

interface State {
  // Persisted per visitor, on this device only.
  lang: Lang;
  theme: 'dark' | 'light';
  likes: string[];
  saves: string[];
  following: Category[];
  muted: boolean;

  // Session UI state.
  panel: { postId: string; tab: PanelTab } | null;
  sharePostId: string | null;
  toast: Toast | null;
  /** True once the visitor has interacted, so unmuted playback is allowed. */
  userGesture: boolean;

  setLang: (lang: Lang) => void;
  toggleTheme: () => void;
  toggleLike: (id: string) => boolean;
  toggleSave: (id: string) => boolean;
  toggleFollow: (c: Category) => boolean;
  setMuted: (m: boolean) => void;
  openPanel: (postId: string, tab?: PanelTab) => void;
  setPanelTab: (tab: PanelTab) => void;
  closePanel: () => void;
  openShare: (postId: string) => void;
  closeShare: () => void;
  showToast: (text: string) => void;
  markGesture: () => void;
}

const toggleIn = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

// localStorage can throw in private windows or with storage blocked.
const safeStorage = createJSONStorage(() => {
  try {
    const k = '__unnull_probe';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return localStorage;
  } catch {
    const mem = new Map<string, string>();
    return {
      getItem: (k: string) => mem.get(k) ?? null,
      setItem: (k: string, v: string) => void mem.set(k, v),
      removeItem: (k: string) => void mem.delete(k),
    };
  }
});

let toastSeq = 0;

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      lang: 'en',
      theme: 'dark',
      likes: [],
      saves: [],
      following: [],
      muted: true,
      panel: null,
      sharePostId: null,
      toast: null,
      userGesture: false,

      setLang: (lang) => set({ lang }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      toggleLike: (id) => {
        const likes = toggleIn(get().likes, id);
        set({ likes });
        return likes.includes(id);
      },
      toggleSave: (id) => {
        const saves = toggleIn(get().saves, id);
        set({ saves });
        return saves.includes(id);
      },
      toggleFollow: (c) => {
        const following = toggleIn(get().following, c);
        set({ following });
        return following.includes(c);
      },
      setMuted: (muted) => set({ muted }),
      openPanel: (postId, tab = 'details') => set({ panel: { postId, tab } }),
      setPanelTab: (tab) => {
        const p = get().panel;
        if (p) set({ panel: { ...p, tab } });
      },
      closePanel: () => set({ panel: null }),
      openShare: (postId) => set({ sharePostId: postId }),
      closeShare: () => set({ sharePostId: null }),
      showToast: (text) => set({ toast: { id: ++toastSeq, text } }),
      markGesture: () => {
        if (!get().userGesture) set({ userGesture: true });
      },
    }),
    {
      name: 'unnull-feed',
      version: 1,
      storage: safeStorage,
      partialize: (s) => ({ lang: s.lang, theme: s.theme, likes: s.likes, saves: s.saves, following: s.following }),
    },
  ),
);
