import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register the PWA Service Worker
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {
    console.log('New update available. Click refresh to update.')
  },
  onOfflineReady() {
    console.log('App is ready to work offline.')
  },
})

createRoot(document.getElementById('root')!).render(<App />)
