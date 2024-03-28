import { customFiltering, comparativeFiltering } from "../lib/queries/index.js";
import { hasSubmissionAccess } from "../lib/auth/index.js";
import config from "../config.js";
import { ObjectId } from "../lib/queries/index.js";

const getAllSubmissionsById = async (req, res) => {
  try {
    const form = await req.backend.models.Forms.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const collectionName = form.collectionName || "Submissions";

    const {
      limit = config.apiLimit,
      page = 1,
      searchField = null,
      searchValue = null,
      selectFields = null,
      sort = {},
    } = req.query;

    if (page <= 0 || limit < 0 || limit > config.apiLimit) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    const query = {};

    for (const key in req.query) {
      try {
        query[key] = JSON.parse(req.query[key]);
        comparativeFiltering(key, query, req);
      } catch (error) {
        // If JSON parsing fails, set the value as-is (e.g., if it's a string)
        query[key] = req.query[key];
        comparativeFiltering(key, query, req);
      }
    }

    customFiltering(req, query);

    query.form = ObjectId(req.params.id);
    query.deleted = null;
    delete query.limit;
    delete query.page;
    delete query.searchField;
    delete query.searchValue;
    delete query.selectFields;
    delete query.sort;

    for (const key in sort) {
      if (typeof sort[key] === "string") {
        sort[key] = parseInt(sort[key]);
      }
    }
    const skip = (page - 1) * limit;

    // regex search on a specific field
    if (searchField && searchValue) {
      const regex = new RegExp(searchValue, "i");
      query[searchField] = regex;
    }

    const user = req.user || null;

    let checkAccess = await hasSubmissionAccess(form, user, query, req, res);

    if (!checkAccess) {
      return res
        .status(200)
        .json({ message: "Success", count: 0, submissions: [] });
    }

    const count = await req.backend.models[collectionName].countDocuments(
      query
    );
    const submissions = await req.backend.models[collectionName]
      .find(query)
      .select(selectFields)
      .skip(skip)
      .limit(limit)
      .sort(sort);

    res
      .status(200)
      .json({ message: "Success", count: count, submissions: submissions });
  } catch (error) {
    console.log("error", error);
  }
};

export default getAllSubmissionsById;
