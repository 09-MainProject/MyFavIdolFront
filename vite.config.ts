import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://43.203.181.6',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
        rewrite: path => path.replace(/^\/api/, 'api'),
      },
    },
  },
});
