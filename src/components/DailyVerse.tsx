import React, { useEffect, useState } from 'react';

interface VerseData {
  verse: string;
  reference: string;
  text: string;
}

const DailyVerse: React.FC = () => {
  const [verseData, setVerseData] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await fetch('http://developer.enewhope.org/api/verseoftheday.php');
        const data = await response.json();
        setVerseData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch daily verse');
        setLoading(false);
      }
    };

    fetchVerse();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h6 className="text-purple-600 font-medium mb-2">DAILY VERSE</h6>
        <blockquote className="text-2xl md:text-3xl font-playfair mb-4">
          "{verseData?.text}"
        </blockquote>
        <p className="text-gray-600 text-lg">
          - {verseData?.reference}
        </p>
      </div>
    </div>
  );
};

export default DailyVerse; 