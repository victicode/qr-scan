// vite.config.js
import { defineConfig } from "file:///D:/Documentos/Trabajos/wozpay/node_modules/vite/dist/node/index.js";
import laravel from "file:///D:/Documentos/Trabajos/wozpay/node_modules/laravel-vite-plugin/dist/index.js";
import vue from "file:///D:/Documentos/Trabajos/wozpay/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { quasar, transformAssetUrls } from "file:///D:/Documentos/Trabajos/wozpay/node_modules/@quasar/vite-plugin/src/index.js";
import AutoImport from "file:///D:/Documentos/Trabajos/wozpay/node_modules/unplugin-auto-import/dist/vite.js";
var __vite_injected_original_dirname = "D:\\Documentos\\Trabajos\\wozpay";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.js"],
      refresh: true
    }),
    vue({
      template: {
        transformAssetUrls
      }
    }),
    quasar({
      sassVariables: "resources/js/src/plugins/quasar/quasar-variables.sass"
    }),
    AutoImport({
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json"
      },
      imports: ["vue", "vue-router", "quasar"],
      vueTemplate: true
    })
  ],
  resolve: {
    alias: {
      "@/": __vite_injected_original_dirname + "/resources/js/src/",
      "vue": "vue/dist/vue.esm-bundler.js"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEb2N1bWVudG9zXFxcXFRyYWJham9zXFxcXHdvenBheVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcRG9jdW1lbnRvc1xcXFxUcmFiYWpvc1xcXFx3b3pwYXlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0RvY3VtZW50b3MvVHJhYmFqb3Mvd296cGF5L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgbGFyYXZlbCBmcm9tICdsYXJhdmVsLXZpdGUtcGx1Z2luJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB7IHF1YXNhciwgdHJhbnNmb3JtQXNzZXRVcmxzIH0gZnJvbSAnQHF1YXNhci92aXRlLXBsdWdpbidcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBsYXJhdmVsKHtcbiAgICAgICAgICAgIGlucHV0OiBbJ3Jlc291cmNlcy9jc3MvYXBwLmNzcycsICdyZXNvdXJjZXMvanMvYXBwLmpzJ10sXG4gICAgICAgICAgICByZWZyZXNoOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgdnVlKHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtQXNzZXRVcmxzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHF1YXNhcih7XG4gICAgICAgICAgICBzYXNzVmFyaWFibGVzOiAncmVzb3VyY2VzL2pzL3NyYy9wbHVnaW5zL3F1YXNhci9xdWFzYXItdmFyaWFibGVzLnNhc3MnXG4gICAgICAgIH0pLFxuICAgICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdxdWFzYXInXSxcbiAgICAgICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdALyc6IF9fZGlybmFtZSArICcvcmVzb3VyY2VzL2pzL3NyYy8nLFxuICAgICAgICAgICAgJ3Z1ZSc6ICd2dWUvZGlzdC92dWUuZXNtLWJ1bmRsZXIuanMnXG4gICAgICAgIH0sXG4gICAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUixTQUFTLG9CQUFvQjtBQUM5UyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsUUFBUSwwQkFBMEI7QUFDM0MsT0FBTyxnQkFBZ0I7QUFKdkIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ0osT0FBTyxDQUFDLHlCQUF5QixxQkFBcUI7QUFBQSxNQUN0RCxTQUFTO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDTjtBQUFBLE1BQ0o7QUFBQSxJQUNKLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxNQUNILGVBQWU7QUFBQSxJQUNuQixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDUCxVQUFVO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxVQUFVO0FBQUEsTUFDWjtBQUFBLE1BQ0EsU0FBUyxDQUFDLE9BQU8sY0FBYyxRQUFRO0FBQUEsTUFDdkMsYUFBYTtBQUFBLElBQ2pCLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxNQUFNLG1DQUFZO0FBQUEsTUFDbEIsT0FBTztBQUFBLElBQ1g7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
