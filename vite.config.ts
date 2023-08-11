import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteRequireContext from "@originjs/vite-plugin-require-context";
import htmlPurge from "vite-plugin-purgecss";
import path from "path";
import pugPlugin from "vite-plugin-pug";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      __ENV__: JSON.stringify(env),
    },
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
            contentWithoutStyleBlocks.match(
              /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
            ) || []
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
  };
});
