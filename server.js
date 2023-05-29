var http = require("http");
// var url = require("url");
var request = require("postman-request");

const pUrl = "https://npmjs.org";

const proxyRequest = (req, res) => {
  // var queryData = url.parse(req.url, true).query;
  // if(queryData.url) {
    request({
      url: `${pUrl}${req.url}`
    }).on("error", function(e) {
      res.end("Error occurred while creating server")
    }).pipe(res);
  // } else {
    // res.end("Please enter URL to proxy")
  // }
}

http.createServer(proxyRequest).listen(8000)