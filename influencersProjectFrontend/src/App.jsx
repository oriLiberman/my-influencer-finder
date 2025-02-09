import Influencers from "./Influencers";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [youtubeInfluencers, setYoutubeInfluencers] = useState([]);
  const [tiktokInfluencers, setTiktokInfluencers] = useState([]);
  async function fetchInfluencers(category) {
    if (!category.trim()) {console.log("missing value")
      return
    }
  
    try {
      const response = await axios.get(
        `http://localhost:3000/getInfluencers?category=${category}`
      );
      setYoutubeInfluencers(response.data.youtubeInfluencers);
      setTiktokInfluencers(response.data.tiktokInfluencers);
    } catch (error) {
      console.error("Error fetching influencers:", error);
    } 
  }
  
  return (
    <Router>
      <div className="App">
        <h1>Influencer Finder</h1>
        <Routes>
        <Route 
            path="/" 
            element={
              <Influencers
                youtubeInfluencers={youtubeInfluencers}
                tiktokInfluencers={tiktokInfluencers}
                fetchInfluencers={fetchInfluencers}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;