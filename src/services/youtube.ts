interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  publishedAt: string;
}

export async function getLatestVideos(): Promise<YouTubeVideo[]> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = 'UC-bW6BvAPTgdpvNXjMKmHWA';

    // Get the latest videos using the search endpoint
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=4&order=date&type=video&key=${apiKey}`,
      { cache: 'no-store' } // Ensure fresh data on each request
    );
    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      console.log('No videos found for channel:', channelId);
      return [];
    }

    // Get video IDs for detailed information
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    // Get video details including duration and view count
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${apiKey}`,
      { cache: 'no-store' }
    );
    const videosData = await videosResponse.json();

    // Format the response
    return videosData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails?.high?.url || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
      duration: formatDuration(video.contentDetails.duration),
      views: formatViews(video.statistics.viewCount),
      publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString()
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
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
  return `${minutes}:${seconds.padStart(2, '0')}`;
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