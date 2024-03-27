import { Roles } from "../enums/index.js";

// returns true if any of the user's roles is present in any roles array of any access type
const hasAnyAccess = (form, user) => {
  const userRoles = user?.roles || [];
  const rolesWithAccess = new Set(userRoles);
  const access = form.access || [];

  for (const accessSetting of access) {
    const roles = accessSetting?.roles?.map((id) => id.toString()) || [];

    for (const role of roles) {
      if (rolesWithAccess.has(role) || role === Roles.ANONYMOUS) {
        return true;
      }
    }
  }

  return false;
};

export default hasAnyAccess;
