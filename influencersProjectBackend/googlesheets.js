const { google } = require('googleapis');
const path = require('path');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const moment = require('moment');
const SPREADSHEET_ID = '1MpwgSUbNzcZxVfuEvk0v3Noo9MwqlNTU7LQIioBOC1Y';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// google authentication
async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    keyFile: path.join(__dirname, './credentials.json'), // Path to your credentials file
  });

  return await auth.getClient();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// writing to spreadsheets
async function writeSpreadSheetValues(spreadsheetId, auth, values) {
  const sheets = google.sheets('v4');
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: { values },
    auth,
  });
}

async function writeDataToSheets(data) {
  const values = data.map((influencer) => [
    moment().format('HH:mm DD/MM/YYYY'),
    influencer.name,
    influencer.channelName,
    influencer.subscribersCount,
    influencer.totalViews,
    influencer.channelDescription,
    influencer.contactEmail,
    influencer.relevantVideoLinks.join(', '),
  ]);

  const auth = await getAuthToken();
  await writeSpreadSheetValues(SPREADSHEET_ID, auth, values);
}

module.exports = { writeDataToSheets};

