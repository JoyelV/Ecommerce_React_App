// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envDir: './',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  build: {
    target: 'esnext',
  },
});