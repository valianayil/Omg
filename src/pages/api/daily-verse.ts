import { NextApiRequest, NextApiResponse } from 'next';
import { 
  getDailyVerse, 
  fetchBibleVerse, 
  getRandomVerseId, 
  saveDailyVerse,
  shouldUpdateVerse
} from '../../utils/bibleUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET and POST methods
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // GET request - return current daily verse
    if (req.method === 'GET') {
      const verse = getDailyVerse();
      return res.status(200).json(verse);
    }
    
    // POST request with secret - force update the verse
    if (req.method === 'POST') {
      // Check for a secret key to prevent unauthorized updates
      const { secret } = req.body;
      
      if (!secret || secret !== process.env.CRON_SECRET) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      // Check if we need to update (new day or forced by schedule)
      const shouldUpdate = shouldUpdateVerse() || req.query.force === 'true';
      
      if (shouldUpdate) {
        const verseId = getRandomVerseId();
        const verseData = await fetchBibleVerse(verseId);
        
        if (verseData) {
          saveDailyVerse(verseData);
          return res.status(200).json({ message: 'Daily verse updated successfully', verse: verseData });
        } else {
          // If API call fails, return the existing verse
          const currentVerse = getDailyVerse();
          return res.status(200).json({ 
            message: 'Failed to fetch new verse, returning existing verse', 
            verse: currentVerse 
          });
        }
      } else {
        // No update needed
        const currentVerse = getDailyVerse();
        return res.status(200).json({ 
          message: 'No update needed', 
          verse: currentVerse 
        });
      }
    }
  } catch (error) {
    console.error('Error handling daily verse request:', error);
    return res.status(500).json({ message: 'Error processing request' });
  }
} 