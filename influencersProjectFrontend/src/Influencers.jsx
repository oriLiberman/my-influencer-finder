import { useState } from "react";


export default function Influencers({fetchInfluencers,influencers}) {
  const [category, setCategory] = useState("");
 function callServerforInfluencers () {
    fetchInfluencers(category);
  };


  return (
    <div>
      <h1>Find Influencers</h1>
      <input
        type="text"
        placeholder="Enter influencer category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
     <button onClick={callServerforInfluencers}>Search
        Search
      </button>

      <div>
        {influencers.map((influencer, index) => (
          <div key={index}>
            <h2>{influencer.name}</h2>
            <p>{influencer.channelName}</p>
            <p>{influencer.channelDescription}</p>
            <p>Subscribers: {influencer.subscribersCount}</p>
            <p>Total Views: {influencer.totalViews}</p>
            <p>Amount Of Videos: {influencer.videoCount}</p>
            <p>{influencer.channelDescription}</p>
            <a href={influencer.relevantVideoLinks[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              Most Viewed Video
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
