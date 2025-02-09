
async function getInfluencersChannels(category) {
  const searchUrl = "https://www.googleapis.com/youtube/v3/search";
  
  try {
    const response = await axios.get(searchUrl, {
      params: {
        part: "snippet",
        type: "channel",
        q: category,
        maxResults: 10, 
        key: API_KEY,
      },
    });

    const channelsData = await Promise.all(
      response.data.items.map(async (item) => modifyChannelsData(item))
    );

    return channelsData;
  } catch (error) {
    console.error("Error fetching data from YouTube API:", error);
    throw error;
  }
}

// Fetch detailed channel information
async function bringAllChannelsData(channelId) {
  const channelDetailsUrl = "https://www.googleapis.com/youtube/v3/channels";

  const response = await axios.get(channelDetailsUrl, {
    params: {
      part: "snippet,contentDetails,statistics,brandingSettings",
      id: channelId,
      key: API_KEY,
    },
  });

  return response.data.items[0];
}

// Fetch the most viewed video from the last month
async function getMostViewedVideo(channelId) {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const searchUrl = "https://www.googleapis.com/youtube/v3/search";

  try {
    const response = await axios.get(searchUrl, {
      params: {
        part: "snippet",
        channelId: channelId,
        order: "viewCount",
        publishedAfter: oneMonthAgo.toISOString(),
        type: "video",
        maxResults: 1,
        key: API_KEY,
      },
    });

    if (response.data.items.length > 0) {
      return `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;
    } else {
      return "No recent high-view videos found";
    }
  } catch (error) {
    console.error("Error fetching most viewed video:", error);
    return "Error fetching data";
  }
}

// Modify and enrich channel data
async function modifyChannelsData(item) {
  const channelId = item.snippet.channelId;
  const channel = await bringAllChannelsData(channelId);
  const mostViewedVideo = await getMostViewedVideo(channelId);
  const countryRegex =
   /\b(USA|United States|UK|Canada|India|Germany|France|Australia|Spain|Brazil|Mexico|Japan|China|Russia|Italy|Netherlands)\b/i;
  const extractedCountry = channel.brandingSettings?.channel?.description.match(countryRegex);
  const channelData = {
    name: item.snippet.title,
    channelName: item.snippet.channelTitle,
    countryOfOrigin: channel.brandingSettings?.country || extractedCountry || "Unknown",
    subscribersCount: channel.statistics.subscriberCount,
    totalViews: channel.statistics.viewCount,
    videoCount: channel.statistics.videoCount,
    channelDescription: channel.snippet.description,
    contactInfo: channel.brandingSettings?.channel?.description.match(
      /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(https?:\/\/[\S]+)/g
    ) || "Not available",
    topViewedCountry: "Unavailable (Requires YouTube Analytics API)",
    relevantVideoLinks: [mostViewedVideo],
  };
  console.log(`Final data for channel ${channelId}:`, channelData);
  return channelData;
}

