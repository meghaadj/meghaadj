import axios from "axios";

import { hasAccess } from "../lib/auth/index.js";
import { auditHelper } from "../lib/helper/index.js";
import { getSettings, ObjectId } from "../lib/queries/index.js";

import config from "../config.js";
const deleteSubmissionById = async (req, res) => {
  try {
    const form = await req.backend.models.Forms.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: "Not found" });
    }

    const collectionName = form.collectionName || "Submissions";

    const submission = await req.backend.models[collectionName].findById(
      req.params.sub,
    );

    if (!submission) {
      return res.status(404).json({ error: "Not found" });
    }

    if (!submission.form?._id.equals(form._id)) {
      return res.status(404).json({ error: "Not found" });
    }

    const user = req.user || null;
    const hasDeleteAllAccess = hasAccess(form, user, "delete_all");
    const hasDeleteOwnAccess = user?._id && hasAccess(form, user, "delete_own");

    if (!hasDeleteAllAccess) {
      if (
        !hasDeleteOwnAccess ||
        submission.owner?.toString() !== req.user?._id
      ) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }

    const updatedAuditTrailsEntry = auditHelper("delete", user, submission);

    const query = {
      _id: ObjectId(req.params.sub),
      form: ObjectId(req.params.id),
      deleted: null,
    };

    const newSubmission = await req.backend.models[
      collectionName
    ].findOneAndUpdate(
      query,
      {
        deleted: Date.now(),
        auditTrail: updatedAuditTrailsEntry,
      },
      { new: true },
    );

    const actions = form.actions.filter((e) => e.on.includes("delete"));
    const API_KEY = await getSettings(req, "API_KEY");

    actions.forEach(async (action) => {
      const url = config.runnerUrl + action.path;
      try {
        await axios.delete(url, newSubmission, {
          headers: {
            "Content-Type": "application/json",
            "x-jwt-token": req.header("x-jwt-token"),
            "x-api-key": API_KEY,
          },
        });
      } catch (error) {
        console.error("Error:", error);
      }
    });

    return res
      .status(200)
      .json({ message: "Success", submission: newSubmission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
export default deleteSubmissionById;
