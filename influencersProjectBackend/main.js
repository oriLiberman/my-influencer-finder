const { getInfluencersChannels } = require('./getYoutubeinfluencers.js');
const { searchTikTokUsers } = require('./getTiktokinfluencers.js'); 
// const { writeDataToSheets } = require('./googlesheets');
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors()); 
app.use(express.json());
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
let youtubeInfluencers = []
let tiktokInfluencers = []
app.get("/getInfluencers", async (req, res) => {
  const category = req.query.category || "marketing"; 
  try {
    const data = await main(category)
    res.json(data);
  } catch (error) {
    console.error("Error fetching influencers:", error);
    res.status(500).json({ error: "Failed to fetch influencers data" });
  }
});

// Main function
async function main(category) {
  try {
    youtubeInfluencers = await getInfluencersChannels(category);
    tiktokInfluencers = await searchTikTokUsers(category) 
    // await writeDataToSheets(data);
    return { youtubeInfluencers, tiktokInfluencers };
  } catch (error) {
    console.error('Error in main function:', error);
    return ("error in main function")
  }
}



const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));