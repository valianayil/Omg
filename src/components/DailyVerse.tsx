import React, { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { DailyVerse as DailyVerseType } from '../utils/bibleUtils';

const DailyVerse: React.FC = () => {
  const [verseData, setVerseData] = useState<DailyVerseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        // Attempt to get the verse from the server
        const response = await fetch('/api/daily-verse');
        if (!response.ok) {
          throw new Error('Failed to fetch daily verse');
        }
        
        const data = await response.json();
        setVerseData(data);
      } catch (error) {
        console.error('Error fetching daily verse:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerse();
  }, []);

  // If loading or no verse data, show skeleton loader
  if (isLoading || !verseData) {
    return (
      <section className="relative py-24 bg-gradient-to-b from-[#f9f5f2] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute -top-8 -left-8 text-[#8B4513]/20 opacity-50">
              <FaQuoteLeft size={64} />
            </div>
            <h6 className="text-[#8B4513] font-medium mb-2 tracking-wider">DAILY VERSE</h6>
            <div className="h-24 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded-lg mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#f9f5f2] to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute -top-8 -left-8 text-[#8B4513]/20 opacity-50">
            <FaQuoteLeft size={64} />
          </div>
          <h6 className="text-[#8B4513] font-medium mb-2 tracking-wider">DAILY VERSE</h6>
          <h2 className="text-3xl md:text-5xl font-playfair mb-8 bg-gradient-to-r from-[#8B4513] to-[#654321] bg-clip-text text-transparent leading-tight">
            "{verseData.text}"
          </h2>
          <p className="text-gray-600 text-xl font-medium">- {verseData.reference}</p>
        </div>
      </div>
    </section>
  );
};

export default DailyVerse; 