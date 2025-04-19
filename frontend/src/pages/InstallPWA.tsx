import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadCloud } from 'lucide-react'; // icon from Lucide

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false); // Track installation status

  const isAppInstalled = (): boolean => {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true ||
      document.referrer.startsWith('android-app://')
    );
  };

  useEffect(() => {
    setIsInstalled(isAppInstalled()); // Check on initial load
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      console.log('👍 beforeinstallprompt fired');
      setDeferredPrompt(e);
      // Only show the install button if the app is not already installed
      if (!isInstalled) {
        setShowInstall(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isInstalled]); // Re-run effect if installation status changes

  const installApp = async () => {
    if (deferredPrompt) {
      console.log('🚀 Triggering install prompt');
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ App installed');
        setIsInstalled(true); // Update installation status
        setShowInstall(false); // Hide the button
      } else {
        console.log('❌ User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <AnimatePresence>
      {showInstall && !isInstalled && ( // Only show if showInstall is true AND not already installed
        <motion.button
          onClick={installApp}
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          exit={{ scale: 0.9 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="fixed bottom-5 left-5 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-xl"
          title="Install App"
        >
          <DownloadCloud className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default InstallPWA;