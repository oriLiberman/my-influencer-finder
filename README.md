1. in the main componnent there is a localhost server just to test.
2. there is a scrapper components for tiktok and youtube influencers by category - their info stats and more and write the data to a googlesheet file(optional).
3. function main get the influencers info in an arrays, one array for tiktok and one for youtube - for both you need googleconsole api and service acount json.
4. you will also need apify api from their website, its nececary to apply the api where is needed in the code in every component. 
5. for google sheet you will neeed the sheet id also and to enable googlesheet, v4 search youtube data and more in you google console .
6. the data main returns its 2 arrays and the function works only once there is a get request from the frontend for influencers, might take a minute untill main would finish and get the data.
7. the data is sent  back as res and you can map and disply them in the web, there is an open react project in frontend with brouser router so you can add simillar componenets easy and not work twice.
