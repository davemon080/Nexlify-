
import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { generateAIResponse } from '../services/geminiService';

/**
 * A floating AI consultant component that allows real-time chat with Gemini.
 * It provides users with instant information about Nexlify services.
 */
const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Hello! I'm your Nexlify AI guide. How can I help you build your digital legacy today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for smooth chat experience
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Call the Gemini service to get a professional response
      const aiResponse = await generateAIResponse(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having a bit of trouble connecting. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-[90vw] sm:w-[400px] h-[550px] glass rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 transition-all">
          {/* Header */}
          <div className="p-6 bg-primary flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Nexlify AI</h4>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] opacity-80 font-bold uppercase tracking-wider">Available Now</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/10 p-2 rounded-full transition-colors"
              aria-label="Close Chat"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none shadow-lg' 
                    : 'bg-white dark:bg-white/5 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-white/5 shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-white/5 p-4 rounded-2xl rounded-tl-none flex space-x-2 border border-slate-200 dark:border-white/5">
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-white/5 flex space-x-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our services..."
              className="flex-grow bg-slate-100 dark:bg-white/5 border-none rounded-2xl px-5 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary hover:bg-primary-light p-3 rounded-2xl text-white transition-all disabled:opacity-50 shadow-lg active:scale-95"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-primary hover:bg-primary-light text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:scale-110 transition-all group"
          aria-label="Open AI Consultant"
        >
          <ChatBubbleLeftRightIcon className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default AIConsultant;
