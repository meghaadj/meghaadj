import changeLog from "./changeLog.js";

/**
 * Helper function for managing audit trails in submissions.
 * @param {string} type - The type of audit trail action (e.g., 'create', 'update').
 * @param {object} user - The user object associated with the action.
 * @param {object} submission - The submission object to which the audit trail is applied.
 * @param {object} newData - The new data in an object.
 * @returns {array} - The updated array of audit trails for the submission.
 */
const auditHelper = (type, user, submission, newData) => {
  const now = new Date();
  try {
    // Extract previous audit trails from the submission
    let prevAuditTrails = submission.auditTrail || [];

    // Create a new audit trail entry
    let updateAuditTrail = {
      type: type,
      accessed: [],
      entity: user?._id || "anonymous",
    };

    if (type === "update")
      updateAuditTrail.changes = changeLog(submission.data, newData);

    // Check if there is a matching audit trail for the user and type
    const matchingAuditTrail = prevAuditTrails?.find(
      (audit) => audit.entity === user?._id && audit.type === type,
    );

    // Update or create the audit trail entry
    if (matchingAuditTrail && type !== "update") {
      matchingAuditTrail.accessed.push(now);
    } else {
      updateAuditTrail.accessed = [now];
      prevAuditTrails.push(updateAuditTrail);
    }

    // Return the updated array of audit trails
    return prevAuditTrails;
  } catch (error) {
    // Throw an error if there is an issue processing audit trails
    throw new Error(`Error processing audit trails ${error}`);
  }
};

export default auditHelper;
