import { Roles } from "../enums/index.js";

// returns true if any of the user's roles is present in the given accessType's roles array
const hasAccess = (form, user, accessType) => {
  const userRoles = user?.roles || [];
  const access = form.access.find((e) => e.type === accessType);
  const rolesWithAccess = access?.roles?.map((id) => id.toString()) || [];

  if (rolesWithAccess.includes(Roles.ANONYMOUS)) return true;
  if (hasMatch(rolesWithAccess, userRoles)) return true;
  return false;
};

const hasMatch = (array1, array2) => {
  const set1 = new Set(array1);
  return array2.some((value) => set1.has(value));
};

export default hasAccess;
