// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//     plugins: [react(), tailwindcss()],
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api/news': {
        target: 'https://newsapi.org',       // The API base URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/news/, '/v2/everything'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('X-Api-Key', 'ed4d1481627c4618ab7de7116a9bf786');  // Adding API Key in headers
          });
        }
      }
    }
  }
});

