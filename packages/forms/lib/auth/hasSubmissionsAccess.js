import hasAccess from "./hasAccess.js";
import { ObjectId } from "../queries/index.js";

const hasSubmissionAccess = async (form, user, query, req) => {
  try {
    const userId = user?._id;

    const hasReadAllAccess = hasAccess(form, user, "read_all");
    const hasReadOwnAccess = user?._id && hasAccess(form, user, "read_own");

    if (hasReadAllAccess) {
      return true;
    }

    if (hasReadOwnAccess) {
      query.$or = [
        { owner: ObjectId(user._id) },
        { "access.type": "read", "access.resources": ObjectId(user._id) },
      ];
      return true;
    }

    const submissionAccessQuery = {
      "access.type": "read",
      "access.resources": userId,
      form: req.params.id,
      deleted: null,
    };

    const submissions = await req.backend.models.Submissions.find(
      submissionAccessQuery,
    );

    if (submissions.length > 0) {
      query["access.type"] = "read";
      query["access.resources"] = userId;
      return true;
    }

    return false;
  } catch (error) {
    console.log("erorr", error);
  }
};

export default hasSubmissionAccess;
