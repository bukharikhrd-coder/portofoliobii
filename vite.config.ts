import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  // 🔑 WAJIB untuk GitHub Pages (repo project)
  base: "/portofoliobii/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "pwa-icon.svg",
        "pwa-192x192.png",
        "pwa-512x512.png",
      ],

      manifest: {
        name: "Bukhari, S.Kom - Portfolio",
        short_name: "Bukhari",
        description: "Creative Developer & Designer Portfolio",

        theme_color: "#0a0a0a",
        background_color: "#0a0a0a",

        display: "standalone",
        orientation: "any",

        start_url: "/portofoliobii/",
        scope: "/portofoliobii/",

        icons: [
          {
            src: "/portofoliobii/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/portofoliobii/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        navigateFallback: "/portofoliobii/index.html",
      },
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
