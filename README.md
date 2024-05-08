# Proxy server

This is a proxy for local use

# Installation

1. Install Node.js

https://nodejs.org/en

2. Install dependencies

```
npm install
```

3. You can set proxy port and https in .env file, `PORT` and `USE_HTTPS` are optional, you are free to alter or get rid of them.

4. Install and generate HTTPS certificates (OPTIONAL)

- Install mkcert: https://github.com/FiloSottile/mkcert
- Create local CA

```
mkcert -install
```

- Generate certificates in the current folder:

```
mkcert -key-file key.pem -cert-file cert.pem localhost
```

- Set `USE_HTTPS=true` in .env

5. Start proxy

```
npm start
```

Your proxy will be at `http://localhost:9000` or `https://localhost:9000` (if you use https).

The proxy target must be included in the request headers, for example:

```js
fetch('https://localhost:9000', {
  method: 'POST',
  headers: {
    'x-target-url': 'https://api.anthropic.com/v1/messages',
    // ... other header values
  },
  // ... other values
});
```

It will proxy your request with the corresponding path to the target.
