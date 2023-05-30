const express = require("express");
const request = require("postman-request");
const cors = require("cors");

const ProxyURL = "https://api.videoo.dev";

const app = express();

app.use(cors({
  origin: "*"
}))

app.use((req, res) => {
    request({
      url: `${ProxyURL}${req.url}`
    }).on("error", function(e) {
      res.end("Error occurred while creating server")
    }).pipe(res);
});

app.listen(80)