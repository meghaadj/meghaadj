import axios from "axios";
import mongoose from "mongoose";
import { URL } from "url";
import { isValidSubmission } from "../lib/validation/index.js";
import config from "../config.js";

const createSubmissionById = async (req, res) => {
  const form = await req.backend.models.Forms.findById(req.params.id);
  if (!form) {
    return res.status(404).json({ error: "Form not found" });
  }

  const user = req.user || {};
  const now = new Date();

  const formStatus = await isValidSubmission(req, form, req.body.data);
  if (!formStatus) {
    return res.status(400).json({ error: "Invalid Submission Data" });
  }

  const collectionName = form.collectionName || "Submissions";

  // allow access and owner to be overriden by req.body but not other fields
  const sub = new req.backend.models[collectionName]({
    access: [],
    owner: user._id,
    ...req.body,
    _id: new mongoose.Types.ObjectId(),
    form: req.params.id,
    auditTrail: [
      {
        type: "create",
        accessed: [now],
        entity: user?._id || "anonymous",
      },
    ],
    created: now,
    modified: now,
    deleted: null,
  });

  await sub.save();

  const actions = form.actions.filter((e) => e.on.includes("create"));

  actions.forEach(async (action) => {
    try {
      const parsedUrl = new URL("/iws" + action.path, config.runnerUrl);

      const url = parsedUrl.toString();

      await axios.post(url, sub, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  });

  res.json({ status: 200, message: "Submission created.", submission: sub });
};

export default createSubmissionById;
