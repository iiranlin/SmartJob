import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Zap } from 'lucide-react';
import { ChatMessage } from '../types';
import { getCareerAdvice } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { marketTrendData } from '../services/mockData';
import ReactMarkdown from 'react-markdown';

const GeminiAdvisorView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是你的 AI 就业顾问。想了解现在的就业趋势，或者需要简历优化、面试辅导的建议吗？请随时问我。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "优化我的简历",
    "模拟面试",
    "薪资谈判技巧",
    "适合我的职业",
    "转行建议"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll when messages change or text updates
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    // 1. Add User Message
    const userMessage: ChatMessage = { role: 'user', text: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        // 2. Add empty Model Message immediately to show placeholder/cursor
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        // 3. Start Streaming
        const stream = getCareerAdvice(text);
        let firstChunkReceived = false;

        for await (const chunk of stream) {
            if (!firstChunkReceived) {
                setIsLoading(false); // Remove "Thinking..." spinner once data starts
                firstChunkReceived = true;
            }

            // Append chunk to the last message
            setMessages(prev => {
                const newHistory = [...prev];
                const lastIndex = newHistory.length - 1;
                const lastMsg = newHistory[lastIndex];
                
                // Ensure we are updating the model's message
                if (lastMsg.role === 'model') {
                    newHistory[lastIndex] = {
                        ...lastMsg,
                        text: lastMsg.text + chunk
                    };
                }
                return newHistory;
            });
        }
    } catch (e) {
        console.error("Streaming error:", e);
        setIsLoading(false);
    } finally {
        setIsLoading(false);
    }
  };

  const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#6366F1'];

  return (
    <div className="flex flex-col h-[calc(100vh-104px)] bg-gray-50">
      
      {/* Header Area containing Chart */}
      <div className="bg-white p-4 mb-2 shadow-sm shrink-0">
         <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-indigo-500" />
            <h3 className="font-bold text-gray-800 text-sm">当前热门就业方向</h3>
         </div>
         <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketTrendData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={70} tick={{fontSize: 10}} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                  {marketTrendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`flex max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-500' : 'bg-indigo-600'}`}>
                   {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                </div>
                <div className={`p-3 rounded-xl text-sm leading-relaxed shadow-sm overflow-hidden min-h-[40px] ${
                  msg.role === 'user' 
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                   {msg.role === 'model' && msg.text === '' ? (
                       /* Cursor effect for new empty message */
                       <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse align-middle"></span>
                   ) : (
                       <ReactMarkdown
                          components={{
                            // Customizing Markdown elements for chat bubble context
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 last:mb-0 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 last:mb-0 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="ml-1" {...props} />,
                            h1: ({node, ...props}) => <h1 className="text-base font-bold mb-2 mt-1" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-sm font-bold mb-2 mt-1" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-1" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                            a: ({node, ...props}) => <a className={`underline decoration-1 underline-offset-2 ${msg.role === 'user' ? 'text-white' : 'text-blue-600'}`} target="_blank" rel="noopener noreferrer" {...props} />,
                            code: ({node, ...props}) => <code className={`px-1 py-0.5 rounded text-xs font-mono ${msg.role === 'user' ? 'bg-blue-600/50 text-white' : 'bg-gray-100 text-pink-500'}`} {...props} />,
                            blockquote: ({node, ...props}) => <blockquote className={`border-l-2 pl-2 italic my-2 ${msg.role === 'user' ? 'border-white/50' : 'border-gray-300'}`} {...props} />,
                          }}
                       >
                         {msg.text}
                       </ReactMarkdown>
                   )}
                </div>
             </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                   <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white border border-gray-100 p-3 rounded-xl rounded-tl-none shadow-sm flex items-center">
                   <Loader2 size={16} className="animate-spin text-indigo-500 mr-2" />
                   <span className="text-xs text-gray-500">正在思考...</span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 pb-safe">
        {/* Quick Prompts */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3">
            {quickPrompts.map((prompt, idx) => (
                <button 
                    key={idx}
                    disabled={isLoading}
                    onClick={() => handleSend(prompt)}
                    className="flex items-center whitespace-nowrap px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs rounded-full border border-indigo-100 active:bg-indigo-100 transition-colors"
                >
                    <Zap size={12} className="mr-1 fill-current" />
                    {prompt}
                </button>
            ))}
        </div>

        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入您的问题..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full transition-colors ${
              input.trim() && !isLoading ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAdvisorView;