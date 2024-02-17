import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), 
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true
        /* other options */
      },
      manifest: {
        "name": "Only Home",
        "short_name": "OnlyHome",
        "theme_color": "#4DBA87",
        "background_color": "#000000",
        "display": "standalone",
        "scope": "/",
        "start_url": "/",
        "icons": [
          {
            "src": "img/icons/onlyhome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "img/icons/onlyhome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
        "splash_pages": null
      }
    })
  ],
  server: {
    host: true,
    port: 8080, // This is the port which we will use in docker
    // Thanks @sergiomoura for the window fix
    // add the next lines if you're using windows and hot reload doesn't work
     watch: {
       usePolling: true
     }
  }
})
