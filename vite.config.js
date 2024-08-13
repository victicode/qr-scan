import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls,
            },
        }),
        quasar({
            sassVariables: 'resources/js/src/plugins/quasar/quasar-variables.sass'
        }),
        AutoImport({
            eslintrc: {
              enabled: true,
              filepath: './.eslintrc-auto-import.json',
            },
            imports: ['vue', 'vue-router', 'quasar'],
            vueTemplate: true,
        }),
    ],
    resolve: {
        alias: {
            '@/': __dirname + '/resources/js/src/',
            'vue': 'vue/dist/vue.esm-bundler.js'
        },
    },
});
