import { makeAutoObservable } from "mobx";

class ModalStore {
  currentReport = {};
  currentSite = {};
  newUserEmail = "";
  sendEmail = true;

  showArchiveSiteModal = false;
  showBulkStatusModal = false;
  showBulkStatusTransitionModal= false;
  showChangeCustomerPasswordModal = false;
  showChangePasswordModal = false;
  showPublishReportModal = false;
  showScheduleReportModal = false;
  showUpdateApprovalStatusModal = false;
  showUserCreationModal = false;
  showUserReportsModal = false;
  showUserServicesModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  setReport(report) {
    this.currentReport = report;
  }

  setSite(site) {
    this.currentSite = site;
  }

  openArchiveSiteModal() {
    this.showArchiveSiteModal = true;
  }

  openBulkStatusModal() {
    this.showBulkStatusModal = true;
  }

  openBulkStatusTransitionModal(){
    this.showBulkStatusTransitionModal = true;
  }

  openChangeCustomerPasswordModal() {
    this.showChangeCustomerPasswordModal = true;
  }

  openChangePasswordModal() {
    this.showChangePasswordModal = true;
  }

  openPublishReportModal() {
    this.sendEmail = true;
    this.showPublishReportModal = true;
  }

  openUpdateApprovalStatusModal() {
    this.showUpdateApprovalStatusModal = true;
  }

  openUserCreationModal() {
    this.showUserCreationModal = true;
  }

  openUserReportsModal() {
    this.showUserReportsModal = true;
  }

  openUserServicesModal(email) {
    this.showUserServicesModal = true;
    this.newUserEmail = email;
  }

  closeBulkStatusModal() {
    this.showBulkStatusModal = false;
  }

  closeBulkStatusTransitionModal(){
    this.showBulkStatusTransitionModal = false;
  }

  closeChangeCustomerPasswordModal() {
    this.showChangeCustomerPasswordModal = false;
  }

  closeArchiveSiteModal() {
    this.showArchiveSiteModal = false;
  }

  closeChangePasswordModal() {
    this.showChangePasswordModal = false;
  }

  closePublishReportModal() {
    this.showPublishReportModal = false;
  }

  closeUpdateApprovalStatusModal() {
    this.showUpdateApprovalStatusModal = false;
  }

  closeUserCreationModal() {
    this.showUserCreationModal = false;
  }

  closeUserReportsModal() {
    this.showUserReportsModal = false;
    this.newUserEmail = "";
  }

  closeUserServicesModal() {
    this.showUserServicesModal = false;
  }
}

const modalStore = new ModalStore();
export default modalStore;
