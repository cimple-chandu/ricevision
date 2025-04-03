import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Leaf, HelpCircle, Book, Lightbulb, Clock, Smile, MessageSquare, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import ChatMessage from './ChatMessage';

const botResponses = {
  greeting: [
    "Hello! I'm your Rice Disease Assistant. How can I help you today?",
    "Welcome! I'm here to help with your rice plant questions. What would you like to know?",
    "Greetings! I'm your virtual rice farming assistant. Let me know if you have questions about rice diseases or cultivation practices."
  ],
  farewell: [
    "Happy farming! Feel free to come back if you have more questions.",
    "Goodbye! Wishing you a healthy harvest!",
    "Take care! Remember to check your crops regularly for early disease detection."
  ],
  disease: [
    "Common rice diseases include Bacterial Leaf Blight, Rice Blast, Sheath Blight, and Brown Spot. Upload an image for detection.",
    "Rice plants can suffer from various diseases. The most common ones are Rice Blast, Bacterial Leaf Blight, and Brown Spot. I can help identify them if you upload a photo.",
    "Rice diseases typically appear as spots, lesions, or discoloration on leaves, stems, or grains. Upload a clear image for me to analyze the symptoms."
  ],
  prevention: [
    "To prevent rice diseases: 1) Use resistant varieties 2) Practice crop rotation 3) Ensure proper water management 4) Apply appropriate fertilizers 5) Maintain field hygiene.",
    "Disease prevention in rice includes using certified seeds, proper spacing, balanced fertilization, and timely water management. Early detection is also crucial.",
    "Preventive measures include: using disease-free seeds, treating seeds with fungicides, maintaining optimal field drainage, following recommended plant spacing, and monitoring regularly for early signs."
  ],
  treatment: [
    "Treatment depends on the specific disease. Generally, you might need fungicides for fungal diseases and bactericides for bacterial ones. Always follow label instructions.",
    "For effective treatment, correct identification is crucial. Upload an image for diagnosis. Generally, copper-based compounds help with bacterial diseases, while specific fungicides work for fungal infections.",
    "Once a disease is confirmed, consider: 1) Removing infected plants if limited in number 2) Applying appropriate fungicides or bactericides 3) Improving drainage 4) Adjusting fertilization practices."
  ],
  water: [
    "Rice typically needs 1-2 inches of water per week. Maintain 2-3 inches during the growing stage and drain before harvesting.",
    "Water management is crucial for rice. Keep fields flooded with 2-4 inches of water during growing season, but drain periodically to prevent diseases.",
    "Different rice varieties and growth stages require different water levels. Generally, 5-10 cm water depth is optimal during vegetative and reproductive stages. Practice alternate wetting and drying methods to reduce water usage and disease incidence."
  ],
  fertilizer: [
    "Rice generally needs NPK fertilizers. Apply nitrogen in split doses - at planting, tillering, and heading stages for best results.",
    "For fertilizers, rice benefits from nitrogen, phosphorus, and potassium. The ratio depends on your soil test results. Generally, apply at planting and during critical growth stages.",
    "For optimal fertilization: 1) Conduct soil tests to determine exact needs 2) Apply basal fertilizer before planting 3) Top-dress with nitrogen at tillering and panicle initiation 4) Consider micronutrients like zinc in deficient soils."
  ],
  pests: [
    "Common rice pests include stem borers, plant hoppers, and rice water weevils. Integrated pest management combining cultural, biological, and chemical controls is effective.",
    "Rice fields can be affected by various pests like stem borers and leafhoppers. Regular monitoring, beneficial insects, and targeted pesticides can help manage them.",
    "Watch for these major pests: brown planthopper, stem borer, rice bug, and army worms. Use balanced pest management approaches that preserve natural enemies while controlling harmful populations."
  ],
  yield: [
    "To improve rice yield: 1) Use high-quality seeds 2) Ensure proper spacing 3) Apply balanced fertilizers 4) Manage water effectively 5) Control weeds, pests, and diseases promptly.",
    "For better yields, focus on soil preparation, water management, and timely interventions for pest and disease control. Proper harvesting and post-harvest handling are also important.",
    "Yield improvement strategies include: selecting appropriate varieties for your region, optimizing plant population, managing nutrients based on growth stage, implementing timely weed control, and harvesting at optimal grain moisture."
  ],
  weather: [
    "Rice grows best in warm weather (20-35°C) with high humidity. Different varieties are adapted to different climate conditions. What's your local climate like?",
    "Rice is sensitive to extreme temperatures. Cold stress below 15°C and heat stress above 35°C can affect growth and yield. Consider heat-tolerant varieties in hot regions.",
    "Climate change affects rice production through unpredictable rainfall, temperature extremes, and increased pest pressure. Diversification and climate-smart practices can help adaptation."
  ],
  varieties: [
    "Rice varieties differ in grain type, maturity period, and resistance to stresses. Popular types include Basmati, Jasmine, Arborio, and many modern high-yielding varieties.",
    "Choose varieties based on your local conditions, market preference, and resistance to prevalent diseases. Consult local agricultural extension for region-specific recommendations.",
    "Modern rice varieties offer combinations of traits like disease resistance, drought tolerance, and enhanced nutrition. Specialty varieties like aromatic rice may command premium prices but have specific growing requirements."
  ],
  organic: [
    "Organic rice farming relies on natural inputs and biological processes. Key practices include compost application, green manuring, crop rotation, and natural pest management.",
    "For organic rice production: use organic seeds, apply compost and organic fertilizers, practice mechanical weeding, use natural pest deterrents, and maintain biodiversity in your farm.",
    "Organic rice certification requires following specific standards and avoiding synthetic chemicals. The transition period typically takes 2-3 years, during which premium prices might not be available."
  ],
  harvesting: [
    "Harvest rice when 80-85% of the grains turn golden yellow. Moisture content should be around 20-25% for optimal harvest.",
    "Post-harvest handling is critical: dry grains to 14% moisture for storage, remove impurities, and store in cool, dry conditions to prevent mold and pests.",
    "Traditional harvesting by hand provides the best grain quality but is labor-intensive. Mechanical harvesting is faster but requires proper adjustment to minimize grain breakage and loss."
  ],
  sustainability: [
    "Sustainable rice farming practices include water-saving techniques, integrated pest management, optimized fertilizer use, and preservation of soil health.",
    "The Sustainable Rice Platform (SRP) provides global standards for sustainable rice cultivation that balance environmental, social, and economic considerations.",
    "Climate-smart rice practices include alternate wetting and drying, laser land leveling, direct seeded rice, and use of organic amendments to reduce greenhouse gas emissions."
  ],
  default: [
    "I don't have specific information on that. Could you try asking about common rice diseases, prevention methods, or upload an image for disease detection?",
    "I'm specialized in rice plant diseases. Please ask about disease identification, prevention, or treatment. You can also upload an image for analysis.",
    "I'm still learning about that topic. Try asking about rice diseases, cultivation practices, or upload a photo for analysis."
  ]
};

const suggestedQuestions = [
  "What are common rice diseases?",
  "How can I prevent rice diseases?",
  "What fertilizers work best for rice?",
  "How much water do rice plants need?",
  "When is the best time to harvest rice?",
  "How do I treat Rice Blast disease?",
  "What rice varieties are disease-resistant?",
  "How does climate affect rice growth?",
  "What pests attack rice plants?",
  "How can I improve my rice yield?"
];

const getResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
  } else if (input.includes('bye') || input.includes('goodbye') || input.includes('thank')) {
    return botResponses.farewell[Math.floor(Math.random() * botResponses.farewell.length)];
  } else if (input.includes('disease') || input.includes('sick') || input.includes('symptoms') || input.includes('blast') || input.includes('blight')) {
    return botResponses.disease[Math.floor(Math.random() * botResponses.disease.length)];
  } else if (input.includes('prevent')) {
    return botResponses.prevention[Math.floor(Math.random() * botResponses.prevention.length)];
  } else if (input.includes('treat') || input.includes('cure') || input.includes('medicine') || input.includes('control')) {
    return botResponses.treatment[Math.floor(Math.random() * botResponses.treatment.length)];
  } else if (input.includes('water') || input.includes('irrigation') || input.includes('flood') || input.includes('moisture')) {
    return botResponses.water[Math.floor(Math.random() * botResponses.water.length)];
  } else if (input.includes('fertilizer') || input.includes('nutrient') || input.includes('npk') || input.includes('nitrogen')) {
    return botResponses.fertilizer[Math.floor(Math.random() * botResponses.fertilizer.length)];
  } else if (input.includes('pest') || input.includes('insect') || input.includes('bug') || input.includes('worm')) {
    return botResponses.pests[Math.floor(Math.random() * botResponses.pests.length)];
  } else if (input.includes('yield') || input.includes('harvest') || input.includes('production') || input.includes('output')) {
    return botResponses.yield[Math.floor(Math.random() * botResponses.yield.length)];
  } else if (input.includes('weather') || input.includes('climate') || input.includes('temperature') || input.includes('rain')) {
    return botResponses.weather[Math.floor(Math.random() * botResponses.weather.length)];
  } else if (input.includes('variety') || input.includes('varieties') || input.includes('cultivar') || input.includes('breed')) {
    return botResponses.varieties[Math.floor(Math.random() * botResponses.varieties.length)];
  } else if (input.includes('organic') || input.includes('natural') || input.includes('chemical-free') || input.includes('sustainable')) {
    return botResponses.organic[Math.floor(Math.random() * botResponses.organic.length)];
  } else if (input.includes('harvest') || input.includes('collecting') || input.includes('gather') || input.includes('reap')) {
    return botResponses.harvesting[Math.floor(Math.random() * botResponses.harvesting.length)];
  } else if (input.includes('sustainable') || input.includes('eco-friendly') || input.includes('environment') || input.includes('green')) {
    return botResponses.sustainability[Math.floor(Math.random() * botResponses.sustainability.length)];
  } else {
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{text: string, isBot: boolean}>>([
    {text: "Hello! I'm your Rice Disease Assistant. How can I help you today?", isBot: true},
    {text: "You can ask me about rice diseases, treatments, farming practices, or upload an image for analysis.", isBot: true}
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (text = message) => {
    if (text.trim()) {
      setChatHistory([...chatHistory, {text, isBot: false}]);
      setShowSuggestions(false);
      setIsTyping(true);
      
      setTimeout(() => {
        const botResponse = getResponse(text);
        setIsTyping(false);
        setChatHistory(prev => [...prev, {text: botResponse, isBot: true}]);
        
        setTimeout(() => {
          setShowSuggestions(true);
        }, 1000);
      }, 1500);
      
      setMessage('');
    }
  };

  const handleSuggestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>

{showPopup && (
  <motion.div
    className="fixed bottom-20 right-5 bg-green-600 text-white p-2 rounded shadow-md text-sm"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
  >
    Rice Disease Inquiry
  </motion.div>
)}
      <motion.button
        className="fixed right-5 bottom-5 w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg flex items-center justify-center z-50 border-2 border-white/30"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 8 
          }}
        >
          <MessageCircle size={24} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-5 right-5 w-80 md:w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border border-green-200"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                >
                  <Bot size={20} />
                </motion.div>
                <div>
                  <h3 className="font-medium">Rice Disease Assistant</h3>
                  <div className="flex items-center text-xs text-green-100">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-green-300 rounded-full mr-2"
                    />
                    {getTimeBasedGreeting()}! How can I help?
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10 h-8 w-8" 
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>
            
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-green-50/50 to-white"
            >
              {chatHistory.map((chat, index) => (
                <ChatMessage 
                  key={index} 
                  message={chat.text} 
                  isBot={chat.isBot} 
                />
              ))}

              {isTyping && (
                <div className="flex gap-3 p-3 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg my-2 animate-in">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center shrink-0">
                    <Bot size={18} />
                  </div>
                  <div className="flex items-center">
                    <motion.div 
                      className="w-2 h-2 bg-green-500 rounded-full mx-0.5"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop' }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-green-500 rounded-full mx-0.5"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatType: 'loop' }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-green-500 rounded-full mx-0.5"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, delay: 0.4, repeat: Infinity, repeatType: 'loop' }}
                    />
                  </div>
                </div>
              )}

              {showSuggestions && chatHistory.length > 0 && chatHistory[chatHistory.length - 1].isBot && (
                <motion.div 
                  className="mt-4 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <Lightbulb size={12} className="text-green-500" />
                    Suggested questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 3).map((question, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="text-xs py-1 h-auto bg-green-50 border-green-100 hover:bg-green-100 text-green-800"
                        onClick={() => handleSuggestionClick(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="p-3 border-t border-green-100 bg-white shadow-inner flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your question..."
                  className="flex-1 bg-green-50/50 border-green-100 focus-visible:ring-green-500"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 h-10 w-10 rounded-full"
                    onClick={() => handleSendMessage()}
                    disabled={!message.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </motion.div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 px-1">
                <span className="flex items-center gap-1">
                  <Bot className="h-3 w-3" />
                  Rice Disease AI
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  24/7 Assistant
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;