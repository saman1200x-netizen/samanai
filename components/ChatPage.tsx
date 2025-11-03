import React, { useState, useRef, useEffect, useCallback } from 'react';
import { User, Message, GenerationMode } from '../types';
import { getChatResponse, generateImage, startChat } from '../services/geminiService';
import Logo from './icons/Logo';

interface ChatPageProps {
    user: User;
    onLogout: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ user, onLogout }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mode, setMode] = useState<GenerationMode>(GenerationMode.CHAT);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        startChat();
        setMessages([
            {
                sender: 'model',
                parts: [{ text: `سلام ${user.username}! من هوش مصنوعی اسمارت هستم. چطور میتونم کمکت کنم؟` }],
                timestamp: Date.now()
            }
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleDownloadImage = useCallback((imageUrl: string) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `smart-ai-image-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    const handleSendMessage = useCallback(async () => {
        if (!input.trim() || isLoading) return;

        const userInput: Message = {
            sender: 'user',
            parts: [{ text: input }],
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, userInput]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            if (mode === GenerationMode.CHAT) {
                const responseText = await getChatResponse(messages, currentInput);
                const modelResponse: Message = {
                    sender: 'model',
                    parts: [{ text: responseText }],
                    timestamp: Date.now()
                };
                setMessages(prev => [...prev, modelResponse]);
            } else { // GenerationMode.IMAGE
                const imageUrl = await generateImage(currentInput);
                if (imageUrl) {
                    const modelResponse: Message = {
                        sender: 'model',
                        parts: [
                            { text: `این هم تصویر درخواستی شما: "${currentInput}"` },
                            { image: imageUrl }
                        ],
                        timestamp: Date.now()
                    };
                    setMessages(prev => [...prev, modelResponse]);
                } else {
                    throw new Error('Image generation failed.');
                }
            }
        } catch (error) {
            const errorResponse: Message = {
                sender: 'model',
                parts: [{ text: 'متاسفانه خطایی رخ داد. لطفا دوباره تلاش کنید.' }],
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, mode, messages]);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <Logo className="w-8 h-8"/>
                  <h1 className="text-xl font-bold">اسمارت</h1>
                </div>
                <div className="relative">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-cyan-400 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        {user.username.charAt(0).toUpperCase()}
                    </button>
                    {menuOpen && (
                        <div className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700">
                            <div className="p-4 border-b border-gray-700">
                                <p className="font-semibold text-white">{user.username}</p>
                                <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                            <button onClick={onLogout} className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700/50 rounded-b-lg">
                                خروج از حساب کاربری
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Messages */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'model' && <div className="w-8 h-8 flex-shrink-0"><Logo/></div>}
                        <div className={`max-w-xl p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-cyan-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
                            {msg.parts.map((part, partIndex) => (
                                <div key={partIndex}>
                                    {part.text && <p className="whitespace-pre-wrap">{part.text}</p>}
                                    {part.image && (
                                        <div className="relative group mt-2">
                                            <img src={part.image} alt="Generated" className="rounded-lg max-w-sm" />
                                            <button
                                                onClick={() => handleDownloadImage(part.image!)}
                                                className="absolute bottom-2 right-2 bg-gray-900/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm"
                                                aria-label="دانلود تصویر"
                                                title="دانلود تصویر"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3">
                         <div className="w-8 h-8 flex-shrink-0"><Logo/></div>
                         <div className="max-w-xl p-3 rounded-2xl bg-gray-700 rounded-bl-none flex items-center space-x-2 space-x-reverse">
                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                         </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            {/* Input */}
            <footer className="p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
                <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg flex items-center p-2 border border-gray-600 focus-within:border-cyan-500 transition-colors">
                    <div className="flex p-1 bg-gray-700 rounded-md mr-2">
                        <button onClick={() => setMode(GenerationMode.CHAT)} className={`px-3 py-1 text-sm rounded ${mode === GenerationMode.CHAT ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>چت</button>
                        <button onClick={() => setMode(GenerationMode.IMAGE)} className={`px-3 py-1 text-sm rounded ${mode === GenerationMode.IMAGE ? 'bg-cyan-600 text-white' : 'text-gray-300'}`}>عکس</button>
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={mode === GenerationMode.CHAT ? 'پیام خود را بنویسید...' : 'توضیحات عکس را بنویسید...'}
                        className="flex-1 bg-transparent text-white px-2 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="p-2 bg-cyan-600 text-white rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChatPage;