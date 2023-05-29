// var path = require('path'),
//     express = require('express'),
//     {engine} = require('express-handlebars'),
//     iframeReplacement = require('node-iframe-replacement');

// function Server() {

//     // create an instance of express
//     var app = express();

//     // add iframe replacement to express as middleware (adds res.merge method)
//     app.use(iframeReplacement);

//     // add handlebars view engine (you can use any)
//     app.engine('hbs', engine());

//     // let express know how to locate the views/templates
//     app.set('views', path.resolve(__dirname, 'views'));
//     app.set('view engine', 'hbs');

//     // create simple route to test our fake news
//     app.get('/', function(req, res) {

//         // respond to this request with our fake-new content embedded within the BBC News home page
//         res.merge('fake-news', {
//             sourceUrl: 'https://www.typescriptlang.org/',                             // external url to fetch
//             sourcePlaceholder: 'div[data-entityid="container-top-stories#1"]'   // css selector to inject our content into
//         });
//     });

//     // start the server
//     app.listen(8080, function() {
//         console.log('Server running... Visit http://localhost:8080 in your browser');
//     });
// }

// module.exports = new Server();

// const path = require("path");
// const express = require("express");
// const createIframe = require("node-iframe").default;

// const app = express();

// app.use(createIframe);


// app.get("*", (req, res) => {
//   res.createIframe({
//     url: `https://www.typescriptlang.org${req.url}`,
//     baseHref: req.query.baseHref, // optional: determine how to control link redirects,
//     config: { cors: { script: true } }, // optional: determine element cors or inlining #shape src/iframe.ts#L34
//   });
// });

// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "./index.html"));
// // })

// app.listen(3003, () => {
//     console.log("success")
// })

var http = require('http');



http.createServer(onRequest).listen(3002);

function onRequest(client_req, client_res) {
  console.log('serve: ' + client_req.url);
  // client_res.writeHead(200, {'Access-Control-Allow-Origin': '*'});


  // client_res.writeHead(200, {'Access-Control-Allow-Methods' : 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE'});


  // client_res.writeHead('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Token, Web-Token');
 client_res.setHeader('Access-Control-Allow-Origin', '*'); // client address
    client_res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
    client_res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    client_res.setHeader('Access-Control-Allow-Credentials', true);

  var options = {
    hostname: 'api.videoo.dev',
    port: 80,
    path: client_req.url,
    method: client_req.method,
    headers: client_req.headers
  };

  var proxy = http.request(options, function (res) {
    client_res.writeHead(res.statusCode, res.headers)
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}