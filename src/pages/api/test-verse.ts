import { NextApiRequest, NextApiResponse } from 'next';
import { fetchBibleVerse, getRandomVerseId } from '../../utils/bibleUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const verseId = getRandomVerseId();
    console.log('Fetching verse with ID:', verseId);
    
    const verseData = await fetchBibleVerse(verseId);
    if (verseData) {
      return res.status(200).json(verseData);
    } else {
      return res.status(500).json({ message: 'Failed to fetch verse data' });
    }
  } catch (error) {
    console.error('Test verse error:', error);
    return res.status(500).json({ message: 'Error processing request', error });
  }
} 