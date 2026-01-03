import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    // Allow all hosts for ngrok development
    allowedHosts: () => true
  }
});
