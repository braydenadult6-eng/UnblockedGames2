import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';
import { webcrypto } from 'node:crypto';

// Polyfill crypto for older Node.js versions (e.g., Node 16/18) where globalThis.crypto is missing
if (typeof globalThis.crypto === 'undefined') {
  // @ts-ignore
  globalThis.crypto = webcrypto;
} else if (typeof globalThis.crypto.getRandomValues === 'undefined') {
  // @ts-ignore
  globalThis.crypto.getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/UnblockedGames2/',
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
