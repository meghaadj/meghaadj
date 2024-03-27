import { makeAutoObservable, runInAction } from "mobx";
import { Roles } from "enums";

class AuthStore {
  token = "";
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token) {
    this.token = token;
  }

  setUser(user) {
    runInAction(() => {
      this.user = user;
    });
  }

  hasRole(role) {
    const roles = this.user?.roles || [];
    return roles.includes(role);
  }

  isAdmin() {
    return this.hasRole(Roles.ADMIN);
  }

  isAuthenticated() {
    return this.hasRole(Roles.AUTHENTICATED);
  }


  isExternalPayroll() {
    return this.hasRole(Roles.EXTERNAL_PAYROLL);
  }

  isBookkeepingAgent() {
    return (
      this.hasRole(Roles.BOOKKEEPING_ONSHORE) ||
      this.hasRole(Roles.BOOKKEEPING_OFFSHORE)
    );
  }

  isPayrollAgent() {
    return (
      this.hasRole(Roles.PAYROLL_ONSHORE) ||
      this.hasRole(Roles.PAYROLL_OFFSHORE)
    );
  }

  isCustomerSupport() {
    return this.hasRole(Roles.CUSTOMER_SUPPORT);
  }
  
  reset() {
    this.token = "";
    this.user = null;
  }
}

const authStore = new AuthStore();
export default authStore;
