import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Allow external connections
    allowedHosts: [
      '.ngrok-free.app',
      '.ngrok.app',
      '.ngrok.io',
      'localhost',
      '127.0.0.1'
    ],
    // Allow all hosts (for development with ngrok)
    strictPort: false
  }
});
