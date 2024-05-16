require('dotenv').config();

const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const proxy = require('express-http-proxy');

app.use(cors());
app.use(morgan('dev'));
app.use((req, res, next) => {
  const url = req.headers['x-target-url'];
  const target = new URL(url);

  delete req.headers['x-target-url'];

  return proxy(target.origin, {
    proxyReqPathResolver: () => {
      return target.pathname + target.search;
    },
  })(req, res, next);
});

const server =
  process.env.USE_HTTPS == 'true'
    ? https.createServer(
        {
          key: fs.readFileSync(path.join(__dirname, 'key.pem')),
          cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
        },
        app
      )
    : http.createServer({}, app);

const port = process.env.PORT || 9000;

server.listen(port, () => {
  process.env.USE_HTTPS == 'true'
    ? console.log(`Proxy listening on https://127.0.0.1:${port}`)
    : console.log(`Proxy listening on http://localhost:${port}`);
});
