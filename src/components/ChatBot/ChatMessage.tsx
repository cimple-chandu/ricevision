
import { FC } from 'react';
import { Bot, User, Wheat } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

const ChatMessage: FC<ChatMessageProps> = ({ message, isBot }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 p-3 rounded-lg my-2 ${
        isBot 
          ? 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200' 
          : 'bg-white border border-green-100 ml-auto max-w-[85%]'
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isBot 
          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' 
          : 'bg-gradient-to-br from-green-400 to-green-500 text-white'
      }`}>
        {isBot ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className="text-sm leading-relaxed">
        {message}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
