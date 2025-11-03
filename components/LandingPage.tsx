
import React from 'react';
import { View } from '../types';
import Logo from './icons/Logo';

interface LandingPageProps {
    onNavigate: (view: View) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    return (
        <div className="relative h-screen w-screen overflow-hidden bg-gray-900 flex flex-col">
            <div className="absolute inset-0 bg-grid-cyan-500/[0.1] z-0"></div>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gray-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10"></div>
            
            <header className="w-full p-4 sm:p-6 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                    <Logo className="w-8 h-8" />
                    <h1 className="text-2xl font-bold text-white">اسمارت</h1>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={() => onNavigate(View.LOGIN)}
                        className="px-4 py-2 text-sm sm:text-base font-semibold text-white bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                        ورود
                    </button>
                    <button
                        onClick={() => onNavigate(View.REGISTER)}
                        className="px-4 py-2 text-sm sm:text-base font-semibold text-gray-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors"
                    >
                        ثبت نام
                    </button>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center flex-grow text-center px-4 z-20">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight">
                    آینده هوش مصنوعی،
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        امروز در دستان شما.
                    </span>
                </h2>
                <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-300">
                    با دستیار هوشمند اسمارت، به دنیایی از خلاقیت و بهره‌وری قدم بگذارید. چت کنید، تصویر بسازید و ایده‌های خود را به واقعیت تبدیل کنید.
                </p>
                <div className="mt-10">
                    <button
                        onClick={() => onNavigate(View.REGISTER)}
                        className="px-8 py-4 text-lg font-bold text-gray-900 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full hover:scale-105 transform transition-transform"
                    >
                        همین حالا شروع کنید
                    </button>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
