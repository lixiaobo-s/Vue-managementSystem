import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //配置路径别名
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      }
    ]
  }
})
