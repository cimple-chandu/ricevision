
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Mail, MessageSquare, MapPin, Phone, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from 'react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you soon.");
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12 md:py-24"
      >
        <div className="max-w-6xl mx-auto">
          {/* Contact Hero */}
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about Rice Vision? Looking to partner with us? We'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-green-100 to-green-200/90 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-green-200 h-full">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-lg text-white">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Our Location</h3>
                      <p className="text-muted-foreground"> Rice Research Center,</p>
                      <p className="text-muted-foreground">Rajam, 532127</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-lg text-white">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Email Us</h3>
                      <p className="text-muted-foreground">info@ricevision.com</p>
                      <p className="text-muted-foreground">support@ricevision.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-lg text-white">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Call Us</h3>
                      <p className="text-muted-foreground">+91 *******811</p>
                      <p className="text-muted-foreground">Mon-Fri, 9am-5pm SGT</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
    <h3 className="text-lg font-medium mb-4">Follow Us</h3>
    <div className="flex gap-3">
        {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => {
            let icon;
            switch (social) {
                case 'facebook':
                    icon = (
                        <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2.6l-.419 2.8h-2.181v7.199h-2.801v-7.2h-1.798v-2.8h1.798v-1.929c0-2.541 1.497-3.942 3.859-3.942 1.099 0 2.243.195 2.243.195v2.459h-1.28c-1.296 0-1.561.622-1.561 1.511v1.885z" />
                        </svg>
                    );
                    break;
                case 'twitter':
                    icon = (
                        <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.163a4.822 4.822 0 00-.666 2.475c0 1.716.879 3.23 2.218 4.108a4.851 4.851 0 01-2.223-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.89 9.89 0 01-6.114 2.101c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.569z" />
                        </svg>
                    );
                    break;
                case 'instagram':
                    icon = (
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                        </svg>
                    );
                    break;
                case 'linkedin':
                    icon = (
                        <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    );
                    break;
                default:
                    icon = null;
            }
            return (
                <a
                    key={social}
                    href={`https://${social}.com/ricescan`}
                    className="p-3 bg-gray-100 rounded-full hover:bg-green-100 transition-colors"
                >
                    <span className="sr-only">{social}</span>
                    {icon}
                </a>
            );
        })}
    </div>
</div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-gradient-to-br from-green-100 to-green-200/90 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-green-200">
                <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Sai Chandu"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Write your message here..."
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Contact;
