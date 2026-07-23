import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Behna deploys to a custom domain (behna.in) served from the site root,
// so the base path is '/'. If you ever deploy to a project subpath
// (e.g. username.github.io/Behna/), change base to '/Behna/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
  },
  server: {
    port: 5173,
    open: true,
  },
});
