import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

const repoName = "portofoliobii";
const isProd = process.env.NODE_ENV === "production";

export default defineConfig(({ mode }) => ({
  // 🔐 AMAN: local = "/", github pages = "/portofoliobii/"
  base: isProd ? `/${repoName}/` : "/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),

    // 🔐 Lovable hanya aktif di development
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

        // 🔐 aman untuk local & pages
        start_url: isProd ? `/${repoName}/` : "/",
        scope: isProd ? `/${repoName}/` : "/",

        icons: [
          {
            src: isProd ? `/${repoName}/pwa-192x192.png` : "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: isProd ? `/${repoName}/pwa-512x512.png` : "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: isProd ? `/${repoName}/pwa-512x512.png` : "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,eot,json}"],

        // 🔐 SPA aman (refresh tidak putih)
        navigateFallback: isProd
          ? `/${repoName}/index.html`
          : "/index.html",

        navigateFallbackDenylist: [/^\/api/],
      },
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
