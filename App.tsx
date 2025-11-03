import React, { useState, useEffect, useCallback } from 'react';
import Splash from './components/Splash';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ChatPage from './components/ChatPage';
import { View, User } from './types';

const App: React.FC = () => {
    const [view, setView] = useState<View>(View.SPLASH);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('smart-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setView(View.CHAT);
        } else {
            const timer = setTimeout(() => setView(View.LANDING), 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleLoginSuccess = useCallback((loggedInUser: User) => {
        setUser(loggedInUser);
        setView(View.LOADING);
        setTimeout(() => setView(View.CHAT), 2000);
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('smart-user');
        setUser(null);
        setView(View.LANDING);
    }, []);

    const renderView = () => {
        switch (view) {
            case View.SPLASH:
                return <Splash />;
            case View.LANDING:
                return <LandingPage onNavigate={setView} />;
            case View.LOGIN:
                return <LoginPage onNavigate={setView} onLoginSuccess={handleLoginSuccess} />;
            case View.REGISTER:
                return <RegisterPage onNavigate={setView} />;
            case View.LOADING:
                return (
                    <div className="flex items-center justify-center h-screen bg-gray-900">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
                    </div>
                );
            case View.CHAT:
                if (user) {
                    return <ChatPage user={user} onLogout={handleLogout} />;
                }
                // Fallback to login if user is somehow null
                setView(View.LOGIN);
                return null;
            default:
                return <LandingPage onNavigate={setView} />;
        }
    };

    return <div className="h-screen w-screen bg-gray-900">{renderView()}</div>;
};

export default App;