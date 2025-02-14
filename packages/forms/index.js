#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from "http";
import https from "https";
import app from "./app.js";
import { dbEventEmitter } from "./lib/backend.js";
import config from "./config.js";
/**
 * Create HTTP server.
 */

let server;
if (config.env === "LOCAL") {
  server = http.createServer(app);
} else {
  server = https.createServer(app);
}
/**
 * Listen on provided port, on all network interfaces.
 */
const port = app.get("port");

dbEventEmitter.on("connected", () => {
  console.log(" > Connected to database.");
  server.listen(port);
});

server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
