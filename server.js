import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});


app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  let parsedDate;

  // 1. If no date is passed (/api), default to now
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  } else {
    // 2. If date is purely digits (Unix millisecond timestamp), parse as integer
    if (/^\d+$/.test(date)) {
      parsedDate = new Date(parseInt(date, 10));
    } else {
      parsedDate = new Date(date);
    }
  }

  // 3. Check for invalid date
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // 4. Return valid response with millisecond Unix timestamp and UTC string
  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});
// Do not change code above this line

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
