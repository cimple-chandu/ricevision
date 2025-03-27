
import { FC, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedTransitionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  fromDirection?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const AnimatedTransition: FC<AnimatedTransitionProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.4,
  fromDirection = 'up'
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  const getDirectionalAnimation = () => {
    if (prefersReducedMotion) return { opacity: 0 };
    
    switch (fromDirection) {
      case 'up':
        return { opacity: 0, y: 20 };
      case 'down':
        return { opacity: 0, y: -20 };
      case 'left':
        return { opacity: 0, x: -20 };
      case 'right':
        return { opacity: 0, x: 20 };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 10 };
    }
  };
  
  return (
    <motion.div
      initial={getDirectionalAnimation()}
      whileInView={{ 
        opacity: 1, 
        y: fromDirection === 'up' || fromDirection === 'down' ? 0 : undefined,
        x: fromDirection === 'left' || fromDirection === 'right' ? 0 : undefined,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
