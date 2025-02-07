1. The main component runs a local server for testing purposes.
2. There is a scraper component for TikTok and YouTube influencers by category. This component collects information, stats, and more, and optionally writes the data to a Google Sheets file.
3. The main function retrieves influencer data and stores it in two separate arrays: one for TikTok and one for YouTube. Both platforms require Google Console API and service account JSON files.
4. You will also need to integrate the Apify API from their website where necessary in the code. 
5. For Google Sheets, you will need the sheet ID and to enable Google Sheets API v4 and YouTube data API in your Google Console.
6. The main function will return two arrays of data. It will only run after a GET request from the frontend for influencers. This process may take a minute to finish and gather all the data.
7. The data will be sent back as a response, which you can then map and display on the frontend. The React project uses BrowserRouter, making it easy to add similar components without duplication.
8. Run the Backend:
* In a different terminal, navigate to the backend directory.
* Run node main to start the backend server. Make sure to install the necessary modules with npm install if you haven't done so already.
9. Insert APIs and Run the Frontend:
* Ensure that you have the necessary API keys (Apify, Google Sheets, YouTube API).
* Install the required dependencies for the frontend (npm install).
* To run the frontend, execute npm run dev in the terminal. This will start the React app.
10. Start the Server:
* Once the backend server is running with node main, it will listen for GET requests from the frontend.
11. Enjoy:
* Once everything is running, the frontend will make a GET request to the backend, which fetches TikTok and YouTube influencer data. The backend processes this and returns the data in two arrays (one for TikTok and one for YouTube).The data will be sent back to the frontend, where you can map and display it easily. 
