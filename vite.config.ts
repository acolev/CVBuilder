import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteRequireContext from "@originjs/vite-plugin-require-context";
import htmlPurge from "vite-plugin-purgecss";
import path from "path";
import pugPlugin from "vite-plugin-pug";

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    // @ts-ignore
    ViteRequireContext?.default(),
    htmlPurge({
      content: [`./public/**/*.html`, `./src/**/*.vue`],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(
          /<style[^]+?<\/style>/gi,
          ""
        );
        return (
          contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) ||
          []
        );
      },
      safelist: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
      ],
    }),
    pugPlugin({}, {}),
  ],
  css: {
    postcss: {
      map: false,
    },
  },
});
