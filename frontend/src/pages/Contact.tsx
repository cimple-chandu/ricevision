import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Mail, MessageSquare, MapPin, Phone, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [emailStatus, setEmailStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));

    if (name === 'email') {
      if (!isValidEmail(value)) {
        setEmailStatus("❌ Invalid email format");
        setIsSubmitDisabled(true);
        return;
      }

      try {
        const res = await fetch(
          `https://emailvalidation.abstractapi.com/v1/?api_key=804c480250c244abbd609f6d15b2d01a&email=${value}`
        );
        const data = await res.json();

        if (data.deliverability === "DELIVERABLE") {
          setEmailStatus("✅ Email is valid and exists");
          setIsSubmitDisabled(false);
        } else {
          setEmailStatus("❌ Email does not exist or is undeliverable");
          setIsSubmitDisabled(true);
        }
      } catch (error) {
        console.error("Email validation error:", error);
        setEmailStatus("⚠️ Error checking email");
        setIsSubmitDisabled(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        'service_yfyo1gy', // ✅ your service ID
        'template_14ucn9w', // ✅ your template ID
        formState,
        '3yqjlPITRmmof5mV3' // ✅ your public key
      )
      .then(() => {
        toast.success("Your message has been sent! We'll get back to you soon.");
        setFormState({ name: '', email: '', subject: '', message: '' });
        setEmailStatus('');
        setIsSubmitting(false);
        setIsSubmitDisabled(true);
      })
      .catch(() => {
        toast.error("Failed to send message. Please try again.");
        setIsSubmitting(false);
      });
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
          {/* Header */}
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

          {/* Form & Contact Info */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-green-100 to-green-200/90 p-8 rounded-xl shadow-sm border border-green-200 h-full">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500 rounded-lg text-white">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Our Location</h3>
                      <p className="text-muted-foreground">Rice Research Center</p>
                      <p className="text-muted-foreground">Rajam, 532127</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500 rounded-lg text-white">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Email Us</h3>
                      <p className="text-muted-foreground">info@ricevision.com</p>
                      <p className="text-muted-foreground">support@ricevision.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500 rounded-lg text-white">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Call Us</h3>
                      <p className="text-muted-foreground">+91 6304229811</p>
                      <p className="text-muted-foreground">Mon–Fri, 9am–5pm</p>
                    </div>
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
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="Sai Chandu"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Your Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                      />
                      <p className="text-sm mt-1 text-gray-600">{emailStatus}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Your message here..."
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting || isSubmitDisabled}
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