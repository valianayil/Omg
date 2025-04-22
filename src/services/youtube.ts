interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
}

export async function getMostViewedVideos(): Promise<YouTubeVideo[]> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UC-bW6BvAPTgdpvNXjMKmHWA';

    console.log(`Fetching videos for channel: ${channelId}`);

    // First, get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
      { cache: 'no-store' }
    );
    
    if (!channelResponse.ok) {
      console.error(`Channel API error: ${channelResponse.status}`);
      return [];
    }
    
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      console.error('No channel found with ID:', channelId);
      return [];
    }
    
    // Get videos directly using search API with higher limit
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&type=video&order=viewCount&key=${apiKey}`,
      { cache: 'no-store' }
    );
    
    if (!searchResponse.ok) {
      console.error(`Search API error: ${searchResponse.status}`);
      return [];
    }
    
    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      console.error('No videos found for channel:', channelId);
      return [];
    }

    // Get video IDs for detailed information
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    // Get video details including duration and view count
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${apiKey}`,
      { cache: 'no-store' }
    );
    
    if (!videosResponse.ok) {
      console.error(`Videos API error: ${videosResponse.status}`);
      return [];
    }
    
    const videosData = await videosResponse.json();

    if (!videosData.items || videosData.items.length === 0) {
      console.error('No video details found');
      return [];
    }

    // Sort videos by view count (highest first) and take top 4
    const sortedVideos = videosData.items
      .sort((a: any, b: any) => {
        const viewsA = parseInt(a.statistics.viewCount || '0');
        const viewsB = parseInt(b.statistics.viewCount || '0');
        return viewsB - viewsA;
      })
      .slice(0, 4);

    console.log(`Found ${sortedVideos.length} videos sorted by view count`);

    // Format the response
    return sortedVideos.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails?.high?.url || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
      duration: formatDuration(video.contentDetails.duration),
      views: formatViews(video.statistics.viewCount || '0'),
      publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString()
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

// Keep for backward compatibility
export async function getLatestVideos(): Promise<YouTubeVideo[]> {
  return getMostViewedVideos();
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
}

function formatViews(views: string): string {
  const numViews = parseInt(views);
  if (numViews >= 1000000) {
    return `${(numViews / 1000000).toFixed(1)}M views`;
  }
  if (numViews >= 1000) {
    return `${(numViews / 1000).toFixed(1)}K views`;
  }
  return `${numViews} views`;
} 