
import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dark themed background */}
      <div className="fixed inset-0 bg-[#1A1F1A]/90 -z-10" />
      
      {/* Rice leaf pattern background */}
      <div className="fixed inset-0 leaf-pattern opacity-20 -z-10" />
      
      {/* Rice plant silhouettes */}
      <div className="fixed bottom-0 right-0 w-72 h-96 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwMCAwQzEwMCAwIDgwIDYwIDEyMCA5MEMxNDAgMTEwIDE0MCAxNTAgMTUwIDE4MEMxNzAgMjEwIDE0MCAyMzAgMTYwIDI0MEMxODAgMjUwIDE2MCAyOTAgMTAwIDMwMEMxMDAgMzAwIDEyMCAyNTAgOTAgMjMwQzcwIDIxMCA5MCAxODAgNzAgMTcwQzUwIDE2MCA3MCAxMjAgNTAgMTEwQzMwIDEwMCAyMCA3MCAxMDAgMFoiIGZpbGw9IiM0Q0FGNTAiIGZpbGwtb3BhY2l0eT0iMC4yNSIvPjwvc3ZnPg==')] bg-no-repeat bg-contain -z-10 opacity-70 animate-float" />
      
      <div className="fixed top-0 left-0 w-72 h-96 rotate-180 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwMCAwQzEwMCAwIDgwIDYwIDEyMCA5MEMxNDAgMTEwIDE0MCAxNTAgMTUwIDE4MEMxNzAgMjEwIDE0MCAyMzAgMTYwIDI0MEMxODAgMjUwIDE2MCAyOTAgMTAwIDMwMEMxMDAgMzAwIDEyMCAyNTAgOTAgMjMwQzcwIDIxMCA5MCAxODAgNzAgMTcwQzUwIDE2MCA3MCAxMjAgNTAgMTEwQzMwIDEwMCAyMCA3MCAxMDAgMFoiIGZpbGw9IiM0Q0FGNTAiIGZpbGwtb3BhY2l0eT0iMC4yNSIvPjwvc3ZnPg==')] bg-no-repeat bg-contain -z-10 opacity-70 animate-float-delay" />
      
      {/* Rice fields background image with lower opacity */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80')] bg-cover bg-center bg-fixed opacity-5 -z-20" />
      
      {/* Animated particles with improved animation */}
      <div className="fixed inset-0 -z-10">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-green-500/20"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 8}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <Navbar />
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
