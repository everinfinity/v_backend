const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3001;
const API_SERVICE_URL = "https://dev.egroup-infocenter.com";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
   res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

// Authorization
app.use('', (req, res, next) => {
  // console.log(req.headers.authorization)
   // if (req.headers.authorization) {
       next();
   // } else {
       // res.sendStatus(403);
   // }
});

// Proxy endpoints
app.use('/', createProxyMiddleware({
   target: API_SERVICE_URL,
   changeOrigin: true,
   pathRewrite: {
       [`^/`]: '',
   },
}));

// Start the Proxy
app.listen(PORT, () => {
   console.log(`Starting Proxy at :${PORT}`);
});