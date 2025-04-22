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
    console.log('YouTube API endpoint called');
    
    // Add CORS headers for hosted environments
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    const videos = await getMostViewedVideos();
    
    if (videos.length === 0) {
      console.log('No videos returned from service');
    } else {
      console.log(`Returning ${videos.length} videos`);
    }
    
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error in YouTube API route:', error);
    res.status(500).json({ message: 'Error fetching videos', error: String(error) });
  }
} 