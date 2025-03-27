
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import UploadSection from '../components/UploadSection';
import DiseaseInfo from '../components/DiseaseInfo';
import ChatBot from '../components/ChatBot/ChatBot';
import { DetectionResult } from '../components/ResultsDisplay';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [results, setResults] = useState<DetectionResult[] | null>(null);
  const isMobile = useIsMobile();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleResultsReady = (detectionResults: DetectionResult[]) => {
    setResults(detectionResults);
    // Log the results for development purposes
    console.log('Detection results:', detectionResults);
    
    // Scroll to results section after analysis
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.2 : 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    }
  };

  return (
    <Layout>
      <LayoutGroup>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative"
        >
          <motion.div variants={itemVariants}>
            <Hero />
          </motion.div>
          
          <motion.div variants={itemVariants} className="upload-section">
            <UploadSection onResultsReady={handleResultsReady} />
          </motion.div>
          
          {/* Results reference div for scrolling */}
          <div ref={resultsRef} className="results-anchor" />
          
          {/* Disease info section (always shown but we'll scroll to results first) */}
          <motion.div variants={itemVariants} id="disease-info" className="mt-4">
            <DiseaseInfo />
          </motion.div>
          
          <AnimatePresence>
            <motion.div 
              variants={itemVariants}
              className="relative z-20"
            >
              <ChatBot />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </Layout>
  );
};

export default Index;
