import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_APIKEY': JSON.stringify(env.REACT_APP_APIKEY)
    },
    plugins: [react()],
  }
})
