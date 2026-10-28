import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/ciberseguridad/',
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg','favicon-32.png','favicon-16.png','apple-touch-icon.png','apple-touch-icon-180.png','pwa-192.png','pwa-512.png'],
    manifest: {
      name: 'Ciberseguridad IES Manuel de Falla',
      short_name: 'CiberFalla',
      description: 'Plan de Seguridad Digital — modo offline para el Plan B sin internet (riesgo 9)',
      theme_color: '#0071e3',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/ciberseguridad/',
      scope: '/ciberseguridad/',
      lang: 'es',
      dir: 'ltr',
      categories: ['education','security'],
      icons: [
        { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        { src: 'favicon-32.png', sizes: '32x32', type: 'image/png', purpose: 'any' },
        { src: 'favicon-16.png', sizes: '16x16', type: 'image/png', purpose: 'any' },
        { src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,pdf,svg,png,jpg,webmanifest}'],
      globIgnores: ['**/favicon.svg','**/favicon-32.png','**/favicon-16.png','**/apple-touch-icon.png','**/apple-touch-icon-180.png','**/pwa-192.png','**/pwa-512.png','**/manifest.webmanifest'],
      dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
      runtimeCaching: [
        { urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60*60*24*365 } } },
        { urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'gstatic-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60*60*24*365 } } }
      ]
    }
  })],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://img.youtube.com https://i.ytimg.com; frame-src https://www.youtube-nocookie.com https://www.youtube.com; connect-src 'self';"
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true
  }
})
