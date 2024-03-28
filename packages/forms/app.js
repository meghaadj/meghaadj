import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import favicon from "serve-favicon";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

import backend from "./lib/backend.js";
import config from "./config.js";
import packageJson from "./package.json" assert { type: "json" };
import routes from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 50000,
  })
);

const corsOptions = {
  exposedHeaders: "x-jwt-token",
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const connections = {};
app.use((req, _res, next) => {
  req.connections = connections;
  next();
});

const server = http.createServer(app);
const allowedDomains = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
  "http://localhost:4001",
  "https://iwsaustralia.com.au",
  "https://integratedhr.com.au",
];

app.use((_req, res, next) => {
  var origin = _req.headers.origin;

  if (config.disableLocalhost && origin.startsWith("http://localhost")) {
    res.setHeader("Access-Control-Allow-Origin", null);
  } else if (allowedDomains.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", null);
  }

  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,Strict-Transport-Security,X-XSS-Protection,X-Content-Type-Options,Referrer-Policy,X-Requested-With,X-Frame-Options,Content-Type,Accept,cache-control,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Content-Security-Policy"
  );

  const csp = `base-uri 'self'; connect-src 'self' data: ${
    config.disableLocalhost ? "" : "http://localhost"
  } https://iwsaustralia.com.au https://integratedhr.com.au; default-src 'self' 'unsafe-eval'; font-src 'self'; frame-src 'self'; img-src 'self' data: ${
    config.disableLocalhost ? "" : "http://localhost"
  }; manifest-src 'self'; media-src 'self'; object-src 'none'; script-src 'self' 'unsafe-eval';`;

  res.header("Content-Security-Policy", csp);

  next();
});

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};
const port = normalizePort(config.port || "3001");
app.set("port", port);

app.set("app_name", packageJson.name);
app.set("version", packageJson.version);
process.env.appName = packageJson.name;
process.env.appVersion = packageJson.version;

app.use((req, _res, next) => {
  req.backend = backend;
  next();
});

app.use("/", routes);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//error handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.log({
    message: err.message,
    error: err,
  });
  res.send({
    message: err.message,
    error: {},
  });
});

export default app;
