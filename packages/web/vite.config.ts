import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // https://github.com/vitejs/vite/discussions/14172
  optimizeDeps: { include: ['@piiquante/shared'] },
  plugins: [react()],
});
