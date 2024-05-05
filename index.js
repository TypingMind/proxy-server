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
app.use(proxy(process.env.TARGET));

console.log(process.env);
const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

const server =
  process.env.USE_HTTPS == 'true'
    ? https.createServer(options, app)
    : http.createServer(options, app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  process.env.USE_HTTPS == 'true'
    ? console.log(`Proxy listening on https://localhost:${port}`)
    : console.log(`Proxy listening on http://localhost:${port}`);
});
