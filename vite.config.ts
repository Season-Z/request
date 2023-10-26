import { defineConfig } from "vite";
import path from "node:path";
import vitePluginImp from "vite-plugin-imp";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "antd",
          libDirectory: "es",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    dts({
      entryRoot: path.resolve(__dirname, "./src"),
      compilerOptions: {
        skipDefaultLibCheck: false,
      },
    }),
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: "" },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  build: {
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ["react", "antd"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "React",
          antd: "antd",
        },
      },
    },
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "@season/request",
      formats: ["es", "umd", "cjs"],
      fileName: "index",
    },
  },
});
