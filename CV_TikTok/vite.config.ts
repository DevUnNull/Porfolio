import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// BASE_PATH lets the same build run at the domain root (Vercel, Cloudflare Pages)
// or under a sub-path such as /UnNull-Feed/ on GitHub Pages.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: { target: 'es2020', chunkSizeWarningLimit: 600 },
});
