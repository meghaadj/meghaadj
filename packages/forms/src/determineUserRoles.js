import { FormIds, Roles } from "../lib/enums/index.js";
import { ObjectId } from "../lib/queries/index.js";

const determineUserRoles = (form, data) => {
  // Admin users get the Administrator and Authenticated roles
  if (form._id.equals(FormIds.ADMIN)) {
    return [ObjectId(Roles.ADMIN), ObjectId(Roles.AUTHENTICATED)];
  }

  // Agents get the Agent and Authenticated roles plus 1 more specific role
  // The specific role comes from an input field on the Agent form
  // e.g Payroll Onshore
  if (form._id.equals(FormIds.AGENT)) {
    return [
      ObjectId(Roles.AGENT),
      ObjectId(Roles.AUTHENTICATED),
      ObjectId(data.role),
    ];
  }

  // Customer Users get Authenticated role and 1 more specific role from input
  // e.g Site Admin
  if (form._id.equals(FormIds.USER)) {
    return [ObjectId(Roles.AUTHENTICATED), ObjectId(data.role)];
  }

  // Unknown form
  return [];
};

export default determineUserRoles;
