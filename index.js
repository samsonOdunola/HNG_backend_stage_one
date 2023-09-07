const express = require("express");
const App = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

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

const getApproximateUTC = () => {
  const currentUTC = new Date();

  // Get the current minutes
  const currentMinutes = currentUTC.getUTCMinutes();

  // Round the minutes to the nearest multiple of 2 (for example, 0, 2, 4, ...)
  const roundedMinutes = Math.round(currentMinutes / 2) * 2;

  // Set the rounded minutes to the current UTC time
  currentUTC.setUTCMinutes(roundedMinutes);

  return currentUTC.toISOString();
};

App.get("/api", (req, res) => {
  const name = req.query.slack_name;
  const track = req.query.track;

  const response = {
    slack_name: name,
    current_day: daysOfWeek[weekNumber],
    utc_time: getApproximateUTC().slice(0, -5) + "Z",
    track: track,
    github_file_url:
      "https://github.com/samsonOdunola/HNG_backend_stage_one/blob/master/index.js",
    github_repo_url: "https://github.com/samsonOdunola/HNG_backend_stage_one",
    status_code: 200,
  };
  res.setHeader("Content-Type", "application/json");

  return res.status(200).json({ ...response });
});

App.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
