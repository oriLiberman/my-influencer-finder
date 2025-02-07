import Influencers from "./Influencers";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [influencers, setInfluencers] = useState([]);
  async function fetchInfluencers(category, apiKey) {
    if (!category.trim() || !apiKey.trim()) {console.log("missing value")
      return
    }
  
    try {
      const response = await axios.get(
        `http://localhost:5000/getInfluencers?category=${category}&apiKey=${apiKey}`
      );
      setInfluencers(response.data);
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
            element={<Influencers influencers={influencers} fetchInfluencers={fetchInfluencers} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;