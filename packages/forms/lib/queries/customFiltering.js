import mongoose from "mongoose";

const customFiltering = (req, query) => {
  Object.keys(req.query).forEach((param) => {
    const [field, resource] = param.split("__");

    if (resource === "resource") {
      const ids = req.query[param]
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id));
      delete query[param];
      query[`data.${field}._id`] = { $in: ids };
    }
  });
};

export default customFiltering;
