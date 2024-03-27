import { makeAutoObservable, runInAction } from "mobx";
import { axios } from "standard-components/services";

import { FormIds } from "enums";
import appConfig from "appConfig";

class ReportStore {
  siteCodeFilter = "";
  siteTagFilter = "";
  startDateFilter = "";
  endDateFilter = "";
  totalReports = 0;
  availableSiteCodes = [];
  reportType=" ";
  reportCurrentStatus=" ";
  reports = [];
  reportsCount = 0;
  selectedReports = [];
  filterQueryParams = {};
  bulkReportStatusChangeCountDown = 0;
  timeLeft =0 ;
  enableBulkStatus=false;
  isReports= false;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedReports(selectedReports) {
    runInAction(() => {
      this.selectedReports = selectedReports;
    });
  }

  setReports(reports) {
    runInAction(() => {
      this.reports = reports;
    });
  }

  setSiteCodeFilter(siteCode) {
    this.siteCodeFilter = siteCode;
  }

  setSiteTagFilter(siteTag) {
    this.siteTagFilter = siteTag;
  }

  setStartDateFilter(date) {
    this.startDateFilter = date;
  }

  setEndDateFilter(date) {
    this.endDateFilter = date;
  }

  setTotalReports(n) {
    this.totalReports = n;
  }

  setReportType(type) {
    this.reportType = type;
  }
  setReportStatus(status) {
    this.reportStatus = status;
  }

  reset() {
    this.siteCodeFilter = "";
    this.siteTagFilter = "";
    this.startDateFilter = "";
    this.endDateFilter = "";
    this.totalReports = 0;
    this.reportSelected = [];
  }
  get statusChangeCountDown() {
    return this.bulkReportStatusChangeCountDown
  }

  get selectedReport(){
    return this.reportSelected
  }
  async getPayrollReports(token, page, queryParams = {}) {
    if (!token) return;
    try {
      const url =
        appConfig.FORMS_URL +
        "/form/" +
        FormIds.REPORT_PAYROLL +
        "/submissions";

      queryParams.page = page;
      queryParams.limit = 10;  

      const response = await axios.get(url, {
        params: queryParams,
      });
      const { count, submissions } = response.data;

      runInAction(() => {
        this.totalReports = count;
        this.payrollReports = submissions;
      });
    } catch (error) {
      console.log("Error fetching reports:", error);
      window.location.href("http://google.com");
    }
  }

  async getBookkeepingReports(token) {}

  async getSites(token) {
    if (!token) return;
    try {
      const url =
        appConfig.FORMS_URL +
        "/form/" +
        FormIds.SITE +
        "/submissions";

      const headers = {
        "x-jwt-token": token,
      }

      const response = await axios.get(url, {
        headers: headers,
      });
      const { submissions } = response.data;

      runInAction(() => {
        this.availableSiteCodes = submissions;
      });
    } catch (error) {
      console.log("Error fetching reports:", error);
    }
  }

  async loadReportsAndSites(token) {}
}

const reportStore = new ReportStore();
export default reportStore;
