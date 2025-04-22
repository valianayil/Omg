import { NextApiRequest, NextApiResponse } from 'next';
import { getMostViewedVideos } from '../../services/youtube';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const videos = await getMostViewedVideos();
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error in YouTube API route:', error);
    res.status(500).json({ message: 'Error fetching videos', error: String(error) });
  }
} 