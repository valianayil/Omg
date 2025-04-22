import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { FaQuoteLeft, FaSync } from 'react-icons/fa';

interface VerseData {
  reference: string;
  text: string;
  lastUpdated: string;
}

export default function TestBiblePage() {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testMethod, setTestMethod] = useState<'utility' | 'direct' | 'alt'>('utility');
  const [apiResponse, setApiResponse] = useState<any>(null);

  const fetchVerse = async () => {
    setLoading(true);
    setError(null);
    setApiResponse(null);
    
    try {
      let url = '/api/test-verse'; // Default utility method
      
      if (testMethod === 'direct') {
        url = '/api/direct-bible-test';
      } else if (testMethod === 'alt') {
        url = '/api/bible-alt';
      }
      
      console.log('Fetching verse from:', url);
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error text:', errorText);
        throw new Error(`Failed to fetch verse: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      setApiResponse(data);
      
      if (testMethod === 'direct') {
        // Extract verse from direct API response
        if (data.apiResponse && data.apiResponse.data) {
          const verseData = {
            reference: data.apiResponse.data.reference,
            text: data.apiResponse.data.content.replace(/<[^>]*>/g, '').trim(),
            lastUpdated: new Date().toISOString()
          };
          setVerse(verseData);
        } else {
          throw new Error('Invalid direct API response format');
        }
      } else {
        // Regular response format
        setVerse(data);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, [testMethod]);

  return (
    <Layout>
      <Head>
        <title>Bible Verse Test - One Minute Grace</title>
        <meta name="description" content="Testing Bible verse integration" />
      </Head>

      <section className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Bible Verse Test Page</h1>
            
            <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="font-medium mb-2">Test Method:</div>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#8B4513]"
                    name="testMethod"
                    checked={testMethod === 'utility'}
                    onChange={() => setTestMethod('utility')}
                  />
                  <span className="ml-2">Utility Method</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#8B4513]"
                    name="testMethod"
                    checked={testMethod === 'direct'}
                    onChange={() => setTestMethod('direct')}
                  />
                  <span className="ml-2">Direct API</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-[#8B4513]"
                    name="testMethod"
                    checked={testMethod === 'alt'}
                    onChange={() => setTestMethod('alt')}
                  />
                  <span className="ml-2">Alternative Method</span>
                </label>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Current Verse</h2>
                <button 
                  onClick={fetchVerse}
                  disabled={loading}
                  className="flex items-center bg-[#8B4513] text-white px-4 py-2 rounded hover:bg-[#654321] transition-colors disabled:opacity-50"
                >
                  <FaSync className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Fetch New Verse
                </button>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B4513]"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                  <p className="font-medium">Error fetching verse:</p>
                  <p>{error}</p>
                </div>
              ) : verse ? (
                <div className="relative">
                  <div className="absolute -top-6 -left-6 text-[#8B4513]/20 opacity-50">
                    <FaQuoteLeft size={48} />
                  </div>
                  <div className="pl-8">
                    <p className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
                      "{verse.text}"
                    </p>
                    <p className="text-right text-gray-600 font-medium">- {verse.reference}</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No verse loaded</p>
              )}
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Verse Object:</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                  {JSON.stringify(verse, null, 2)}
                </pre>
              </div>
              
              {apiResponse && (
                <div>
                  <h3 className="font-medium mb-2">Raw API Response:</h3>
                  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 