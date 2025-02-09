import { useState } from "react";


export default function Influencers({fetchInfluencers,youtubeInfluencers,tiktokInfluencers}) {
  const [category, setCategory] = useState("");
  const [isyoutube,setIsyoutube] = useState(true);
 
function choosingSortingcategory(ev){
  if (ev.target.value=="youtube"){
    setIsyoutube (true)
  }
  else {setIsyoutube (false)}
}

  return (
    <div>
      <h1>Find Influencers</h1>
      <input
        type="text"
        placeholder="Enter influencer category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
     
     <button onClick={() => fetchInfluencers(category)}>Search</button>
    

      <div>
        <label>Select Platform:</label>
      <select
        value={category}
        onChange={choosingSortingcategory}
      >
        <option value="youtube">YouTube</option>
        <option value="tiktok">TikTok</option>
      </select>
      {isyoutube?youtubeInfluencers.map((influencer, index) => (
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
        )):tiktokInfluencers.map((influencer, index) => (
          <div key={index}>
            <h2>name: {influencer.name}</h2>
            <p>ProfileUrl: {influencer.profileUrl}</p>
            <p>Nickname: {influencer.nickName}</p>
            <p>Bio: {influencer.bioLink}</p>
            <p>AvatarUrl: {influencer.originalAvatarUrl}</p>
            <p>Avatar: {influencer.avatar}</p>
            <p>Region: {influencer.region}</p>
            <p>Following: {influencer.following}</p>
            <p>Friends: {influencer.friends}</p>
            <p>Heart: {influencer.heart}</p>
            <p>Videos: {influencer.video}</p>
            <p>Fans: {influencer.fans}</p>
          </div>
        )) }
        
      </div>
    </div>
  );
}
