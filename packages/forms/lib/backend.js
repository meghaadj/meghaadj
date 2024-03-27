import mongoose from "mongoose";
import { EventEmitter } from "events";

import config from "../config.js";
import loadFolder from "./loadFolder.js";

const dbEventEmitter = new EventEmitter();

const router = {};

mongoose.connect(config.mongo, {
  serverSelectionTimeoutMS: 60000,
});

mongoose.connection.on("error", function (err) {
  console.log(err.message);
});

mongoose.connection.once("open", async function () {
  console.log(" > Mongo connection established.");
  dbEventEmitter.emit("connected");

  const schemas = await loadFolder("schemas");
  router.schemas = {};
  router.models = {};
  schemas.forEach((e) => {
    router.schemas[e.name] = e.schema;
    router.models[e.name] = mongoose.model(e.name, e.schema);
  });
});

export default router;
export { dbEventEmitter };
