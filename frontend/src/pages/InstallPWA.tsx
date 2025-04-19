import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DownloadCloud } from 'lucide-react' // icon from Lucide

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)

  const isAppInstalled = (): boolean => {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true ||
      document.referrer.startsWith('android-app://')
    )
  }

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(!isAppInstalled())
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  useEffect(() => {
    setShowInstall(!isAppInstalled())
  }, [])

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      if (choice.outcome === 'accepted') {
        console.log('✅ App installed')
        setShowInstall(false)
      } else {
        console.log('❌ User dismissed the install prompt')
      }
      setDeferredPrompt(null)
    }
  }

  return (
    <AnimatePresence>
      {showInstall && (
        <motion.button
          onClick={installApp}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [0, -10, 10, 0],
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="fixed bottom-5 left-13 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-xl"

          title="Install App"
        >
          <DownloadCloud className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default InstallPWA
