import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [vue(), vueJsx()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                test: resolve(__dirname, "views/test/index.html"),
                pages: resolve(__dirname, "views/pages/index.html"),
            },
            output: {
                manualChunks: {
                    vue: ["vue"],
                    dayjs: ["dayjs"],
                },
            },
        },
    },
});
