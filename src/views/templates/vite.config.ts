import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  // root: "src/views/templates/hello.html",
  server: {
    origin: 'http://127.0.0.1:5173',
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        index: "index.html",
      },
    }
  }
});
