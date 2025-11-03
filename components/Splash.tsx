import React from 'react';

const Splash: React.FC = () => {
    return (
        <>
            <style>
                {`
                .splash-svg .circle-bg { 
                    animation: fill-in 1.5s ease-in-out 0.5s forwards; 
                    opacity: 0; 
                }
                .splash-svg .main-arc { 
                    stroke-dasharray: 40; 
                    stroke-dashoffset: 40; 
                    animation: draw-arc 2s ease-in-out 1.5s forwards; 
                }
                .splash-svg .inner-lines { 
                    stroke-dasharray: 20; 
                    stroke-dashoffset: 20; 
                    animation: draw-lines 1.5s ease-in-out 2.5s forwards; 
                }
                
                @keyframes draw-arc { 
                    to { stroke-dashoffset: 0; } 
                }
                @keyframes draw-lines { 
                    to { stroke-dashoffset: 0; } 
                }
                @keyframes fill-in { 
                    to { opacity: 1; } 
                }
                @keyframes fade-in-up-blur {
                    0% { 
                        opacity: 0; 
                        transform: translateY(20px) scale(1.05); 
                        filter: blur(4px); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                        filter: blur(0); 
                    }
                }

                .animate-fade-in-up-blur { 
                    animation: fade-in-up-blur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; 
                    opacity: 0;
                }
                `}
            </style>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white overflow-hidden">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full splash-svg"
                    >
                        <path
                            className="circle-bg"
                            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
                            fill="url(#paint0_linear_146_32)"
                        />
                        <path
                            className="inner-lines"
                            d="M12 6v6l4 2"
                            stroke="url(#paint1_linear_146_32)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            className="main-arc"
                            d="M12 18a6 6 0 000-12"
                            stroke="url(#paint2_linear_146_32)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_146_32"
                                x1="2"
                                y1="12"
                                x2="22"
                                y2="12"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#06b6d4" />
                                <stop offset="1" stopColor="#3b82f6" />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_146_32"
                                x1="12"
                                y1="6"
                                x2="16"
                                y2="14"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#a5b4fc" />
                                <stop offset="1" stopColor="#67e8f9" />
                            </linearGradient>
                            <linearGradient
                                id="paint2_linear_146_32"
                                x1="12"
                                y1="6"
                                x2="12"
                                y2="18"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#f472b6" />
                                <stop offset="1" stopColor="#a78bfa" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-fade-in-up-blur" style={{ animationDelay: '3.8s' }}>
                    اسمارت
                </h1>
                <p className="mt-2 text-lg text-gray-400 animate-fade-in-up-blur" style={{ animationDelay: '4.0s' }}>
                    دستیار هوشمند شما
                </p>
            </div>
        </>
    );
};

export default Splash;