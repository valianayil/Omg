import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import UpdateVerseButton from '../components/UpdateVerseButton';

interface VerseData {
  reference: string;
  text: string;
  lastUpdated: string;
}

export default function AdminPage() {
  const [verseData, setVerseData] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentVerse = async () => {
      try {
        const response = await fetch('/api/daily-verse');
        if (response.ok) {
          const data = await response.json();
          setVerseData(data);
        }
      } catch (error) {
        console.error('Error fetching current verse:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentVerse();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Admin - One Minute Grace</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-6">Current Daily Verse</h2>
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B4513]"></div>
                </div>
              ) : verseData ? (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-xl font-medium text-gray-800 mb-4">
                    "{verseData.text}"
                  </p>
                  <p className="text-right text-gray-600 font-medium">- {verseData.reference}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Last Updated:</span>
                      <span>{new Date(verseData.lastUpdated).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No verse data available</p>
              )}
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Verse Management</h3>
                <p className="text-gray-600 mb-4">
                  The daily verse is automatically updated at midnight (UTC) via a CRON job.
                  You can also manually update it using the button below.
                </p>
                
                <UpdateVerseButton />
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Technical Information</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(verseData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 