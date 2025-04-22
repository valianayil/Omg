import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
  isSpecialPage?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isSpecialPage = false }) => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Global Background Image */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/bg.jpg"
            alt="Background"
            fill
            priority
            quality={90}
            style={{ objectFit: 'cover' }}
            className="opacity-65"
          />
          <div className="absolute inset-0 bg-white/65 backdrop-blur-[4px]"></div>
        </div>
      </div>
      
      <Header />
      <div className="flex-grow relative z-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout; 