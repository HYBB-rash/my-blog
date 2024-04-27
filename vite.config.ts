import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import { getFileList } from "./script/shared";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [vue(), vueJsx()],
    build: {
        rollupOptions: {
            input: [resolve(__dirname, "index.html"), ...getFileList(resolve(__dirname, "views"), /\.html$/)],
            output: {
                manualChunks: {
                    vue: ["vue"],
                    dayjs: ["dayjs"],
                    "markdown-it": ["markdown-it"],
                },
            },
        },
    },
});
