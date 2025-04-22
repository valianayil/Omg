import '../styles/globals.css';
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Poppins, Playfair_Display } from 'next/font/google';
import Head from 'next/head';
import LoadingAnimation from '../components/LoadingAnimation';
import { useRouter } from 'next/router';

// Load fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Handle initial page load
    const handleInitialLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000); // Increased from 2500ms to 4000ms for longer animation
    };

    // Handle route change start
    const handleStart = () => {
      setIsLoading(true);
    };

    // Handle route change complete
    const handleComplete = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2500); // Increased from 1000ms to 2500ms for longer animation on page transitions
    };

    // Initial page load
    handleInitialLoad();

    // Add event listeners for route changes
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Clean up event listeners
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadingAnimation isLoading={isLoading} />
      <main className={`${poppins.variable} ${playfair.variable} font-sans ${isLoading ? 'invisible' : 'visible'}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
} 