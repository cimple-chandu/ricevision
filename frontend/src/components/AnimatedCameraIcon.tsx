
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnimatedCameraIconProps {
  size?: number;
  className?: string;
}

const AnimatedCameraIcon = ({ size = 24, className = "" }: AnimatedCameraIconProps) => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ 
        rotate: [0, -5, 0, 5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        repeatDelay: 1
      }}
      className={className}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot size={size} className="text-green-600" />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCameraIcon;
