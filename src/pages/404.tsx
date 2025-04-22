import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const NotFoundPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Page Not Found | One Minute Grace</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-xl mx-auto py-16">
          <h1 className="text-6xl md:text-8xl font-playfair text-purple-700 mb-6">404</h1>
          <p className="text-2xl md:text-3xl font-playfair text-purple-500 mb-8">Page Not Found</p>
          <p className="text-gray-600 mb-10">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
            Return Home
          </Link>
          
          <div className="mt-16">
            <blockquote className="italic text-gray-600 border-l-4 border-purple-200 pl-4 py-2">
              "Trust in the Lord with all your heart and lean not on your own understanding." <br />
              <span className="text-sm">— Proverbs 3:5</span>
            </blockquote>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default NotFoundPage; 