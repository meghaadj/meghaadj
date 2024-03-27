import ObjectId from "./ObjectId.js";

const comparativeFiltering = (key, query, req) => {
  if (key.startsWith("data.")) {
    const field = key.substring(5);
    delete query[key];

    if (req.query[key] === "true") {
      req.query[key] = true;
    } else if (req.query[key] === "false") {
      req.query[key] = false;
    } else if (req.query[key] === "null") {
      req.query[key] = null;
    }

    if (field.endsWith("__ne")) {
      query[`data.${field.slice(0, -4)}`] = { $ne: req.query[key] };
    } else if (field.endsWith("__gt")) {
      query[`data.${field.slice(0, -4)}`] = { $gt: req.query[key] };
    } else if (field.endsWith("__gte")) {
      query[`data.${field.slice(0, -5)}`] = { $gte: req.query[key] };
    } else if (field.endsWith("__lt")) {
      query[`data.${field.slice(0, -4)}`] = { $lt: req.query[key] };
    } else if (field.endsWith("__lte")) {
      query[`data.${field.slice(0, -5)}`] = { $lte: req.query[key] };
    } else if (field.endsWith("__in")) {
      query[`data.${field.slice(0, -4)}`] = { $in: req.query[key].split(",") };
    } else if (field.endsWith("__nin")) {
      query[`data.${field.slice(0, -5)}`] = { $nin: req.query[key].split(",") };
    } else if (field.endsWith("__exists")) {
      query[`data.${field.slice(0, -8)}`] = {
        $exists: req.query[key] === "true",
      };
    } else if (field.endsWith("__regex")) {
      const sanitizedInput = req.query[key].replace(/[^a-zA-Z0-9]/g, "");
      query[`data.${field.slice(0, -7)}`] = {
        $regex: new RegExp(sanitizedInput),
      };
    } else {
      query[`data.${field}`] = req.query[key];
    }
  }
  if (key.startsWith("_id")) {
    const field = key;
    const vals = req.query[key].split(",");
    delete query[key];
    if (field.endsWith("__in")) {
      query["_id"] = { $in: vals.map((e) => ObjectId(e)) };
    }
  }
};

export default comparativeFiltering;
