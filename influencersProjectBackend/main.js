const { getInfluencersChannels } = require('./getYoutubeinfluencers');
const { writeDataToSheets } = require('./googlesheets');
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors()); 
app.use(express.json());
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getInfluencers", async (req, res) => {
  const category = req.query.category || "marketing"; 
  try {
    const data = await getInfluencersChannels(category);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch influencers data" });
  }
});
// Main function
async function main() {
  try {
    const data = await getInfluencersChannels();
    await writeDataToSheets(data);
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));