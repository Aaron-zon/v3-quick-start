import { defineConfig, loadEnv } from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'

export default defineConfig(({mode}) => {

  const viteEnv = loadEnv(mode, process.cwd())
  const { VITE_PUBLIC_PATH } = viteEnv

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      svgLoader(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      })
    ],
    resolve: {
      alias: {
        /** @ 指向src目录 */
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8888,
      open: true,
      strictPort: false,
      proxy: {
        '/api/v1': {
          // target: 'https://mock.apifox.cn/m1/3139849-0-default/qweasdzxc',
          target: 'http://localhost:9993/pino',
          ws: true,
          changeOrigin: true,
        }
      }
    }
  }
})
