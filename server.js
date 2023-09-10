const express = require('express');
const app = express();
const moment = require('moment');

// Define the endpoint
app.get('/api', (req, res) => {
  // Get the slack_name and track query parameters
  const slackName = req.query.slack_name;
  const track = req.query.track;

  // Get the current day of the week
  const currentDay = moment().format('dddd');

  // Get the current UTC time
  const utcTime = moment().utc().format('YYYY-MM-DDTHH:mm:ssZ');

  // Create the JSON response
  const response = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: "https://github.com/devil5251069/hngX_Stage1/blob/master/server.js",
    github_repo_url: "https://github.com/devil5251069/hngX_Stage1",
    status_code: 200
  };

  // Set the GitHub URL of the file being run
  if (process.env.GITHUB_FILE_PATH) {
    response.github_file_url = `https://github.com/${process.env.GITHUB_REPOSITORY}/blob/main/${process.env.GITHUB_FILE_PATH}`;
  }

  // Set the GitHub URL of the full source code
  response.github_repo_url = `https://github.com/${process.env.GITHUB_REPOSITORY}`;

  // Return the JSON response
  res.json(response);
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Example app listening on port 3000');
});
