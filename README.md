# Proxy server

This is a proxy for local use

# Installation

1. Install Node.js

https://nodejs.org/en

2. Install dependencies

```
npm install
```

3. Set proxy target (`TARGET`) in .env file. `PORT` and `USE_HTTPS` are optional, you are free to alter or get rid of them.

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

Your proxy will be at `http://localhost:5000` or `https://localhost:5000` (if you use https).

It will proxy your request with the corresponding path to the target.

For example, if your target is `https://api.anthropic.com`:

```
https://localhost:5000/v1/messages -> https://api.anthropic.com/v1/messages
```
