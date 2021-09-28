/* eslint "import/no-extraneous-dependencies": ["error", { "devDependencies": true }] */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  build: { minify: true },
  plugins: [react()]
});
