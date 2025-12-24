import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // 支持所有环境变量，在构建时注入
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.BASE_URL': JSON.stringify(env.BASE_URL || 'https://open.bigmodel.cn/api/paas/v4'),
      'process.env.MODEL_NAME': JSON.stringify(env.MODEL_NAME || 'glm-4-flash'),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
