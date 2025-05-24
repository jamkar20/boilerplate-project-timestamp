// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", function (req, res) {
  let now = Date.now();
  res.status(200).json({ unix: now, utc: new Date(now).toUTCString() });
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  let date;
  let miliseconds = Number(req.params.date);

  try {
    if (!Number.isNaN(miliseconds)) {
      date = new Date(Number(req.params.date));
    } else {
      date = new Date(req.params.date);
      if (isNaN(date.getTime())) {
        res.status(400).json({ error: "Invalid Date" });
        return;
      }
    }
    res.status(200).json({ unix: date.getTime(), utc: date.toUTCString() });
  } catch (error) {
    res.status(400).json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
