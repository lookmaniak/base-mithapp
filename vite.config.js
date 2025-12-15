import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.', // project root
  base: './', // relative paths for assets

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },

  resolve: {
    alias: {
      '@node' : path.resolve(__dirname, 'node_modules'),
      '@core': path.resolve(__dirname, 'src/js/core'),
      '@app': path.resolve(__dirname, 'src/js/app'),
      '@features': path.resolve(__dirname, 'src/js/app/features'),
      '@router': path.resolve(__dirname, 'src/js/app/router'),
      '@services': path.resolve(__dirname, 'src/js/app/services'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@icons': path.resolve(__dirname, 'src/assets/icons'),
    },
  },

  server: {
    port: 5173,
    open: true,
  },
});

