import { hasAccess } from "../lib/auth/index.js";
import { auditHelper } from "../lib/helper/index.js";
import { ObjectId } from "../lib/queries/index.js";

const getSubmissionById = async (req, res) => {
  const form = await req.backend.models.Forms.findById(req.params.id);
  if (!form) {
    return res.status(404).json({ error: "Form not found" });
  }

  const collectionName = form.collectionName || "Submissions";

  try {
    const query = {
      _id: ObjectId(req.params.sub),
      form: ObjectId(req.params.id),
      deleted: null,
    };

    const user = req.user || null;
    const hasReadAllAccess = hasAccess(form, user, "read_all");
    const hasReadOwnAccess = user?._id && hasAccess(form, user, "read_own");

    if (!hasReadAllAccess && !hasReadOwnAccess) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!hasReadAllAccess) query.owner = ObjectId(user._id);

    const submission = await req.backend.models[collectionName].findOne(query);

    const updatedAuditTrailsEntry = auditHelper("read", user, submission);
    const newSubmission = await req.backend.models[
      collectionName
    ].findOneAndUpdate(
      {
        _id: ObjectId(req.params.sub),
      },
      {
        auditTrail: updatedAuditTrailsEntry,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Success", submission: newSubmission });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export default getSubmissionById;
