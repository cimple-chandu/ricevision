import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      if (choice.outcome === 'accepted') {
        console.log('✅ App installed')
      } else {
        console.log('❌ User dismissed the install prompt')
      }
      setDeferredPrompt(null)
      setShowInstall(false)
    }
  }

  return (
    <AnimatePresence>
      {showInstall && (
        <motion.button
          onClick={installApp}
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0], // Jumping keyframe
          }}
          exit={{ opacity: 0, x: -50 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
          className="fixed bottom-4 left-4 z-50 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg"
        >
          Install App
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default InstallPWA
