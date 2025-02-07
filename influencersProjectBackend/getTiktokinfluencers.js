const axios = require('axios');

const API_TOKEN = ""; 
// const SEARCH_QUERY = "marketing"; 

async function searchTikTokUsers(searchCategory) {
    console.log("✅ Script started");  

    try {
        console.log("🔄 Sending request to Apify..."); 
        const url = `https://api.apify.com/v2/acts/clockworks~tiktok-user-search-scraper/run-sync-get-dataset-items?token=${API_TOKEN}`;
        
        const response = await axios.post(url, { search: searchCategory });

        console.log("✅ TikTok Users:", response.data);
        const influencers = response.data.map(item => {
            return {
                username: item.username,  // TikTok username
                channelName: item.nickname || item.username,  // Channel name
                description: item.signature || 'No description available',  // Channel description
                followers: item.stats?.followerCount || 0,  // Followers count
                totalLikes: item.stats?.heartCount || 0,  // Total likes (hearts)
                totalViews: item.stats?.videoCount || 0,  // Total video views
                engagementRate: item.stats
                    ? ((item.stats.heartCount / item.stats.videoCount) || 0).toFixed(2)
                    : 'N/A',  // Engagement rate (hearts per video)
                contactInfo: item.contact || 'N/A',  // Contact info (email, phone, etc.)
                country: item.region || 'N/A',  // Origin country
                telegram: item.contact?.telegram || 'N/A',  // Telegram contact
                website: item.contact?.website || 'N/A',  // Website
                email: item.contact?.email || 'N/A',  // Email address
                phone: item.contact?.phone || 'N/A',  // Phone number
            };
        });

        console.log("✅ TikTok Users with Statistics:", influencers);
        return influencers
    } catch (error) {
        console.error("❌ Error:", error.response ? error.response.data : error.message);
    }
}
module.exports = { searchTikTokUsers };


