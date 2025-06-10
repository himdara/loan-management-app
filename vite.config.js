import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- REMOVE 'root' and 'publicDir' and ADD 'base' ---
  // These are often defaults and can sometimes cause conflicts if explicitly set
  // in certain hosting environments.
  base: '/', // Ensures the build output assumes it's served from the root path
  build: {
    outDir: 'dist', // This remains correct
  },
});