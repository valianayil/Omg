import React from 'react';
import Image from 'next/image';

interface LoadingAnimationProps {
  isLoading: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* Outer glow */}
        <div className="animate-pulse-glow-slow absolute -inset-24 rounded-full bg-[#FFFEF5] opacity-70 blur-3xl"></div>
        
        {/* Middle glow */}
        <div className="animate-pulse-glow-slow absolute -inset-16 rounded-full bg-[#FFFDE8] opacity-80 blur-2xl"
             style={{ animationDelay: '-2s' }}></div>
        
        {/* Inner glow */}
        <div className="animate-pulse-glow-slow absolute -inset-10 rounded-full bg-[#FFFBD0] opacity-90 blur-xl"
             style={{ animationDelay: '-1s' }}></div>
        
        {/* Logo with shadow and hover effect */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 animate-breathe-slow"
             style={{ filter: 'drop-shadow(0 10px 25px rgba(247, 175, 7, 0.8))' }}>
          <Image
            src="/navlogo.png"
            alt="One Minute Grace"
            fill
            priority
            style={{ objectFit: 'contain' }}
            className="drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation; 