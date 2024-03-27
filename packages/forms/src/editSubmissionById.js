import axios from "axios";

import { hasAccess } from "../lib/auth/index.js";
import { auditHelper } from "../lib/helper/index.js";
import { getSettings, ObjectId } from "../lib/queries/index.js";
import { isValidSubmission } from "../lib/validation/index.js";
import { URL } from "url";
import determineUserRoles from "./determineUserRoles.js";
import { encryptPasswordFields } from "../lib/helper/index.js";

import config from "../config.js";
const editSubmissionById = async (req, res) => {
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
      return res.status(404).json({ error: "Wrong form or submission" });
    }

    const user = req.user || null;
    const hasUpdateAllAccess = hasAccess(form, user, "update_all");
    const hasUpdateOwnAccess = user?._id && hasAccess(form, user, "update_own");

    if (!hasUpdateAllAccess) {
      if (
        !hasUpdateOwnAccess ||
        submission.owner?.toString() !== req.user?._id
      ) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }
    const now = new Date();
    const newData = req.body.data;
    if (!isValidSubmission(req, form, newData)) {
      return res.status(400).json({ error: "Invalid Submission Data" });
    }
    if (collectionName === "Users") {
      const userData = await req.backend.models.Users.findOne({
        _id: ObjectId(req.params.sub),
      });

      if (newData.password !== userData.data.password) {
       await  encryptPasswordFields(form, newData);
      }
    }
    const updatedAuditTrailsEntry = auditHelper(
      "update",
      user,
      submission,
      newData,
    );
    const query = {
      _id: ObjectId(req.params.sub),
      form: ObjectId(req.params.id),
      deleted: null,
    };

    const update = {
      data: newData,
      modified: now,
      auditTrail: updatedAuditTrailsEntry,
    };

    if (collectionName === "Users") {
      update.roles = determineUserRoles(form, newData);
    }

    const newSubmission = await req.backend.models[
      collectionName
    ].findOneAndUpdate(query, update, { new: true });

    const actions = form.actions.filter((e) => e.on.includes("edit"));
    const API_KEY = await getSettings(req, "API_KEY");

    actions.forEach(async (action) => {
      try {
        const url = new URL("/iws" + action.path, config.runnerUrl);

        await axios.put(url, newSubmission, {
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
    res.status(500).json({ error: "Server Error" });
  }
};
export default editSubmissionById;
