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

App.get("/api", (req, res) => {
  const name = req.query.slack_name;
  const track = req.query.track;

  const response = {
    slack_name: name,
    current_day: daysOfWeek[weekNumber],
    utc_time: currentDate.toISOString(),
    track: track,
    github_file_url: "./index.js",
    github_repo_url: "https://github.com/samsonOdunola/HNG_backend_stage_one",
    status_code: 200,
  };

  return res.status(200).json({ ...response });
});

App.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
