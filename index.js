const express = require("express");
const App = express();
const cors = require("cors");

const port = 3000;

App.use(express.json({ limit: "50mb" }));
App.use(cors());
const currentDate = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const weekNumber = currentDate.getDay();

function isWithinTwoHours(date) {
  const twoHoursAgo = new Date();
  twoHoursAgo.setUTCHours(currentDate.getUTCHours() - 2);

  const twoHoursFuture = new Date();
  twoHoursFuture.setUTCHours(currentDate.getUTCHours() + 2);

  return date >= twoHoursAgo && date <= twoHoursFuture;
}
App.get("/api", (req, res) => {
  const name = req.query.slack_name;
  const track = req.query.track;

  const response = {
    slack_name: name,
    current_day: daysOfWeek[weekNumber],
    utc_time: isWithinTwoHours(currentDate),
    track: track,
    github_file_url: file_url,
    github_repo_url: repo_url,
    status_code: code,
  };

  return res.status(200).json({ ...response });
});

App.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
