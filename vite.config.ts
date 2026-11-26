import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function figmaAssetResolver() {
  return {
    name: "figma-asset-resolver",

    resolveId(id: string) {
      if (id.startsWith("figma:asset/")) {
        const filename = id.replace("figma:asset/", "");

        return path.resolve(__dirname, "src/assets", filename);
      }

      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),

    // Required by Figma Make
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  assetsInclude: [
    "**/*.svg",
    "**/*.csv",
  ],

  server: {
    host: true,
    port: 5173,
    open: true,
  },

  preview: {
    host: true,
    port: 4173,
  },

  build: {
    target: "esnext",

    sourcemap: false,

    cssCodeSplit: true,

    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          react: [
            "react",
            "react-dom",
            "react-router",
          ],

          radix: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
            "@radix-ui/react-popover",
            "@radix-ui/react-tooltip",
          ],

          vendor: [
            "zod",
            "date-fns",
            "lucide-react",
            "react-hook-form",
            "recharts",
          ],
        },
      },
    },
  },
});