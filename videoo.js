var http = require("http");
var url = require("url");
var request = require("postman-request");

const proxyRequest = (req, res) => {
  var queryData = url.parse(req.url, true).query;
  if(queryData.url) {
    request({
      url: queryData.url
    }).on("error", function(e) {
      res.end("Error occurred while creating server")
    }).pipe(res);
  } else {
    res.end("Please enter URL to proxy")
  }
}

http.createServer(proxyRequest).listen(7000)