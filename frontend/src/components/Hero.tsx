
import { FC } from 'react';
import { motion } from 'framer-motion';
import AnimatedTransition from './AnimatedTransition';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: FC = () => {
  const isMobile = useIsMobile();
  
  // Animation for the floating elements
  const floatingAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0], 
      transition: { 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      } 
    }
  };

  // Ripple effect animation for the button
  const rippleAnimation = {
    initial: { 
      boxShadow: "0 0 0 0 rgba(76, 175, 80, 0.7)" 
    },
    animate: { 
      boxShadow: ["0 0 0 0 rgba(76, 175, 80, 0.7)", "0 0 0 20px rgba(76, 175, 80, 0)"],
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        repeatDelay: 2
      } 
    }
  };
  
  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {/* Enhanced background with rice leaf patterns */}
      <div className="absolute inset-0  pointer-events-none" />
      
      {/* Animated particles in background for natural feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 -left-16 w-72 h-72 bg-green-900/10 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, 10, 0], 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute top-40 left-1/3 w-40 h-40 bg-green-800/10 rounded-full filter blur-2xl"
          animate={{ 
            x: [0, -15, 0], 
            y: [0, 10, 0],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5 
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-1/4 w-56 h-56 bg-green-900/10 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1 
          }}
        />
        
        <motion.div 
          className="absolute -bottom-10 -right-16 w-80 h-80 bg-green-800/10 rounded-full filter blur-3xl"
          animate={{ 
            x: [0, -15, 0], 
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2 
          }}
        />
      </div>
      
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Left side content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 space-y-6">
            <AnimatedTransition>
              <motion.div 
                className="inline-block mb-2"
                {...floatingAnimation}
              >
                <div className="py-1 px-3 bg-green-900/20 backdrop-blur-sm rounded-full">
                  <p className="text-xs font-medium text-green-300">AI-Powered Analysis</p>
                </div>
              </motion.div>
            </AnimatedTransition>
            
            <AnimatedTransition delay={0.1}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-200 to-green-100">
                Advanced Rice Disease Detection
              </h1>
            </AnimatedTransition>
            
            <AnimatedTransition delay={0.2}>
              <p className="text-sm md:text-base text-green-100/80 max-w-2xl leading-relaxed">
                Detect and diagnose rice crop diseases in real-time with our precise AI-powered tool. 
                Upload photos of your rice plants and get instant, accurate diagnosis.
              </p>
            </AnimatedTransition>
            
            <AnimatedTransition delay={0.3}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.a 
                  href="#upload" 
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-[#4CAF50] px-8 text-sm font-medium text-white shadow-lg transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  {...rippleAnimation}
                >
                  Start Detection
                </motion.a>
              </motion.div>
            </AnimatedTransition>
          </div>
          
          {/* Right side image - Rice plant photo */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.4
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent rounded-xl z-10"></div>
              <img 
                src="ric.jpg"
                alt="Rice Plant" 
                className="w-full h-auto rounded-xl shadow-xl object-cover"
                style={{ 
                  maxHeight: isMobile ? '300px' : '400px',
                  objectPosition: 'center 70%'
                }}
              />
              
              {/* Animated scan line */}
              <div className="scanline absolute inset-0 rounded-xl overflow-hidden"></div>
              
              {/* Info overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm p-3 rounded-lg z-20">
                <p className="text-xs md:text-sm text-white">
                  High-resolution scanning detects even subtle signs of disease on rice plants
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
