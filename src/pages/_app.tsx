import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins, Playfair_Display } from 'next/font/google';
import Head from 'next/head';

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
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${poppins.variable} ${playfair.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </>
  );
} 