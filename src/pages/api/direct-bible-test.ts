import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const API_KEY = process.env.BIBLE_API_KEY || '';
    const BIBLE_ID = '61fd76eafa1577c2-02';
    const VERSE_ID = 'JHN.3.16'; // Use John 3:16 as a test verse
    
    console.log('Making direct API call to Bible API');
    
    // Make a direct call to the Bible API's verses endpoint
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/verses/${VERSE_ID}`,
      {
        headers: {
          'api-key': API_KEY
        }
      }
    );
    
    console.log(`API response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', errorText);
      return res.status(response.status).json({ 
        error: 'Bible API request failed', 
        status: response.status,
        details: errorText
      });
    }
    
    const data = await response.json();
    console.log('Raw API response received');
    
    // Return the raw API response
    return res.status(200).json({
      success: true,
      apiResponse: data,
      message: 'Direct Bible API call successful'
    });
    
  } catch (error) {
    console.error('Error in direct Bible API test:', error);
    return res.status(500).json({ 
      error: 'Server error processing Bible API request',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 