
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, Github, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="py-8 px-4 bg-gradient-to-br from-[#1A1F1A] to-[#243324] text-white shadow-lg">
      <div className="container mx-auto max-w-6xl">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-8">
          {/* Logo and description */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <img 
                src="/lovable-uploads/2104fc99-2390-43f0-9fa8-6826a4d0336f.png" 
                alt="Rice Vision Logo" 
                className="h-6 w-6"
              />
              <h3 className="text-lg font-bold text-white">Rice Vision</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4 max-w-sm">
              Advanced AI-powered tool for real-time detection and diagnosis of rice plant diseases. 
              Helping farmers identify and treat crop issues early.
            </p>
            <div className="flex items-center gap-2">
            <a
  href="https://github.com/saichandugedela/ricevision"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    variant="outline"
    size="sm"
    className="border-green-600 text-green-400 hover:bg-green-900/20 hover:text-green-300 h-8 px-3"
  >
    <Github className="w-3.5 h-3.5 mr-1.5" />
    GitHub
  </Button>
</a>

           
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-sm font-semibold mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-gray-300 hover:text-green-400 text-sm flex items-center"
                  onClick={() => navigate('/')}
                >
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Home
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-gray-300 hover:text-green-400 text-sm flex items-center"
                  onClick={() => scrollToSection('disease-info')}
                >
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Diseases
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-gray-300 hover:text-green-400 text-sm flex items-center"
                  onClick={() => navigate('/about')}
                >
                  <ChevronRight className="h-3 w-3 mr-1" />
                  About
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-gray-300 hover:text-green-400 text-sm flex items-center"
                  onClick={() => navigate('/contact')}
                >
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Contact
                </Button>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-sm font-semibold mb-3 text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
              <a
                  href="https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=rice+disease+detection+using+deep+learning&oq=rice+disease+detection+"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-green-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Research
                </a>

              </li>
              <li>
              <a
  href="https://veeroverseas.com/quality-rice-export-best-practices-and-customer-feedback-importance/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm text-gray-300 hover:text-green-400 transition-colors flex items-center"
  title="Best practices in rice export and importance of customer feedback"
>
  <ChevronRight className="h-3 w-3 mr-1" />
  Best Practices
</a>

              </li>
              <li>
              <a
  href="https://eos.com/blog/how-to-grow-rice/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm text-gray-300 hover:text-green-400 transition-colors flex items-center"
  title="External guide on how to grow rice by EOS"
>
  <ChevronRight className="h-3 w-3 mr-1" />
  Farming Tips
</a>

              </li>
              {/* <li>
                <a href="/privacy" className="text-sm text-gray-300 hover:text-green-400 transition-colors flex items-center">
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Privacy
                </a>
              </li> */}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-span-2 md:col-span-4">
            <h4 className="text-sm font-semibold mb-3 text-white">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs text-gray-300">
                <Mail className="h-3.5 w-3.5 text-green-400" />
                support@ricevision.ai
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-300">
                <Phone className="h-3.5 w-3.5 text-green-400" />
                +91 6304******
              </li>
              <li className="flex items-start gap-2 text-xs text-gray-300">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-green-400 mt-0.5" />
                <span>Agricultural Research Center, Project Lab , GMRIT, Rajam, 532127</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-green-800/50 to-transparent my-5"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-gray-400 text-center md:text-left">
            © {currentYear} Rice Vision. All rights reserved.
          </p>
          <div className="flex gap-5 mt-2 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
