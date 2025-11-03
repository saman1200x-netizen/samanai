
import React, { useState } from 'react';
import { View, User } from '../types';

interface LoginPageProps {
    onNavigate: (view: View) => void;
    onLoginSuccess: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('لطفا تمام فیلدها را پر کنید.');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('smart-users') || '[]');
        const userFound = storedUsers.find((u: any) => u.email === email && u.password === password);

        if (userFound) {
            const userToLogin: User = { username: userFound.username, email: userFound.email };
            localStorage.setItem('smart-user', JSON.stringify(userToLogin));
            onLoginSuccess(userToLogin);
        } else {
            setError('ایمیل یا رمز عبور اشتباه است.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg relative">
                 <button onClick={() => onNavigate(View.LANDING)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h14" />
                    </svg>
                </button>
                <h1 className="text-2xl font-bold text-center text-white">ورود به حساب کاربری</h1>
                {error && <p className="text-red-400 text-center">{error}</p>}
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">ایمیل</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">رمز عبور</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-2 font-semibold text-gray-900 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors">
                        ورود
                    </button>
                </form>
                 <p className="text-sm text-center text-gray-400">
                    حساب کاربری ندارید؟ <button onClick={() => onNavigate(View.REGISTER)} className="font-medium text-cyan-400 hover:underline">ثبت نام کنید</button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
