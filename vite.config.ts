import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    visualizer({
      template: 'treemap', // or sunburst
      gzipSize: true,
      filename: 'stats.html',
    }),
  ],
  css: {
    transformer: 'lightningcss',
  },
});
