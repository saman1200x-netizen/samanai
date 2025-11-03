
import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className, ...props }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
                fill="url(#paint0_linear_146_32)"
            />
            <path
                d="M12 6v6l4 2"
                stroke="url(#paint1_linear_146_32)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 18a6 6 0 000-12"
                stroke="url(#paint2_linear_146_32)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="1 3"
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
    );
};

export default Logo;
