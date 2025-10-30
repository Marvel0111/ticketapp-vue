// vite.config.js (Ensure this is correct)

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 👈 Must include your repository name here (e.g., /ticketapp-vue/)
  base: '/ticketapp-vue/', 
})
