import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/#' + id, { replace: true });
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };
  
  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-r from-[#2E5A2E] to-[#4CAF50] shadow-md backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: [0, 15, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="h-10 w-10 rounded-lg overflow-hidden"
          >
            <img 
              src="/lovable-uploads/2104fc99-2390-43f0-9fa8-6826a4d0336f.png" 
              alt="Rice Vision Logo" 
              className="h-full w-full object-cover"
            />
          </motion.div>
          <span className="text-xl font-bold text-white tracking-wider">Rice Vision</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-2">
          <NavButton to="/" isActive={location.pathname === "/"}>
            Home
          </NavButton>
          
          <NavButton 
            isActive={false}
            onClick={() => scrollToSection('disease-info')}
          >
            Diseases
          </NavButton>
          
          <NavButton to="/about" isActive={location.pathname === "/about"}>
            About
          </NavButton>
          
          <NavButton to="/contact" isActive={location.pathname === "/contact"}>
            Contact
          </NavButton>
        </div>
        
        <Button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white bg-transparent hover:bg-green-600"
          size="icon"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-b from-[#2E5A2E] to-[#1A1F1A] overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white bg-green-700 hover:bg-green-800"
                  size="icon"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-3">
                <MobileNavButton 
                  to="/" 
                  isActive={location.pathname === "/"} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </MobileNavButton>
                
                <MobileNavButton 
                  isActive={false}
                  onClick={() => scrollToSection('disease-info')}
                >
                  Diseases
                </MobileNavButton>
                
                <MobileNavButton 
                  to="/about" 
                  isActive={location.pathname === "/about"} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </MobileNavButton>
                <MobileNavButton 
                  to="/contact" 
                  isActive={location.pathname === "/contact"} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </MobileNavButton>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavButtonProps {
  to?: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavButton: FC<NavButtonProps> = ({ to, isActive, children, onClick }) => {
  const content = (
    <motion.div
      className={cn(
        "relative px-4 py-2 rounded-full text-sm font-medium text-white transition-colors hover:bg-white/10",
        isActive && "bg-white/20"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span>{children}</span>
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 translate-y-0.5"
          layoutId="navIndicator"
        />
      )}
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  
  return <button>{content}</button>;
};

const MobileNavButton: FC<NavButtonProps> = ({ to, isActive, children, onClick }) => {
  const content = (
    <div
      className={cn(
        "text-white py-3 px-5 rounded-lg font-medium transition-all",
        isActive ? "bg-green-700" : "hover:bg-green-700/50 active:bg-green-700"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  
  return <button className="text-left w-full">{content}</button>;
};

export default Navbar;
