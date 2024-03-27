import { Button, ButtonGroup } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { observer } from "mobx-react";

import { confirmUpdateReport } from "components/confirmationWindows";
import {
  PublishReportModal,
  UpdateApprovalStatusModal,
} from "components/modals";
import { ReportType, ReportStatus } from "enums";
import { modalStore } from "stores";

const ReportActionButtons = (props) => {
  const report = props.report;
  const type = report?.data?.type?.data?.name;
  const status = report?.data?.status;
  const published = report?.data?.published;

  const scheduled = status === ReportStatus.SCHEDULED;

  const approvalTypes = [
    ReportType.BAS_REPORT,
    ReportType.PAYROLL_APPROVAL,
    ReportType.PRE_EOFY_REVIEW,
    ReportType.SUPER_REPORT,
    ReportType.SUPER_RETURN,
  ];

  const noScheduleTypes = [
    ReportType.BAS_REPORT,
    ReportType.SUPER_REPORT,
    ReportType.SUPER_RETURN,
  ];

  const showScheduleLaterButton =
    !published && !scheduled && !noScheduleTypes.includes(type);

  const showPublishReportButton =
    !published && !scheduled && !approvalTypes.includes(type);

  const showPublishForApprovalButton =
    !published && !scheduled && approvalTypes.includes(type);

  const showUpdateApprovalStatusButton =
    published &&
    approvalTypes.includes(type) &&
    type !== ReportStatus.PRE_EOFY_REVIEW;

  const showUpdateToProcessedButton =
    published &&
    [ReportType.SUPER_REPORT, ReportType.SUPER_RETURN].includes(type);

  const showUpdateToPaidButton =
    published &&
    [ReportType.SUPER_REPORT, ReportType.SUPER_RETURN].includes(type);

  const showUpdateToLodgedButton = type === ReportType.BAS_REPORT;

  const showScheduledButton = !published && scheduled;

  const showCancelPublishButton = !published && scheduled;

  const showUnPublish = type === ReportType.PRE_EOFY_REVIEW;
  const showUpdateToPending = type === ReportType.PRE_EOFY_REVIEW;
  const showUpdateToFinalized = type === ReportType.PRE_EOFY_REVIEW;

  const handlePublish = () => {
    modalStore.setReport(report);
    modalStore.openPublishReportModal();
  };

  const handleUpdateApprovalStatus = () => {
    modalStore.setReport(report);
    modalStore.openUpdateApprovalStatusModal();
  };

  const theme = createTheme({
    palette: {
      gray: {
        main: "#222222",
        contrastText: "#fcfcfc",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <>
        {modalStore.showPublishReportModal && <PublishReportModal />}
        {modalStore.showUpdateApprovalStatusModal && (
          <UpdateApprovalStatusModal />
        )}

        <ButtonGroup
          data-testid="report-action-buttons"
          variant="contained"
          color="gray"
          sx={{
            border: 0,
            borderRadius: 0,
            boxShadow: "none",
            "& .MuiButton-root": {
              fontFamily: "sans-serif",
              marginX: 0.5,
              textTransform: "none",
            },
          }}
        >
          {showScheduleLaterButton && (
            <Button data-testid="schedule-later-button" color="success">
              Schedule Later
            </Button>
          )}

          {showPublishReportButton && (
            <Button data-testid="publish-report-button" onClick={handlePublish}>
              Publish Report
            </Button>
          )}

          {showPublishForApprovalButton && (
            <Button
              data-testid="publish-for-approval-button"
              color="success"
              onClick={handlePublish}
            >
              Publish For Approval
            </Button>
          )}

          {showUpdateApprovalStatusButton && (
            <Button
              data-testid="update-approval-status-button"
              color="success"
              onClick={handleUpdateApprovalStatus}
            >
              Update Approval Status
            </Button>
          )}

          {showUpdateToProcessedButton && (
            <Button
              data-testid="update-to-processed-button"
              onClick={() => confirmUpdateReport(report, "process")}
            >
              Update to Processed
            </Button>
          )}

          {showUpdateToPaidButton && (
            <Button
              data-testid="update-to-paid-button"
              color="warning"
              onClick={() => confirmUpdateReport(report, "finalise")}
            >
              Update to Paid
            </Button>
          )}

          {showUpdateToLodgedButton && (
            <Button
              data-testid="update-to-lodged-button"
              color="warning"
              onClick={() => confirmUpdateReport(report, "finalise")}
            >
              Update to Lodged
            </Button>
          )}

          {showScheduledButton && (
            <Button data-testid="scheduled-button">Scheduled</Button>
          )}

          {showCancelPublishButton && (
            <Button data-testid="cancel-publish-button">Cancel Publish</Button>
          )}

          {showUnPublish && (
            <Button data-testid="unpublish-button">Unpublish</Button>
          )}

          {showUpdateToPending && (
            <Button
              data-testid="update-to-pending-button"
              color="primary"
              onClick={() => confirmUpdateReport(report, "process")}
            >
              Update to Pending
            </Button>
          )}

          {showUpdateToFinalized && (
            <Button
              data-testid="update-to-finalized-button"
              color="success"
              onClick={() =>
                confirmUpdateReport(report, ReportStatus.PAID, "finalise")
              }
            >
              Update to Finalized
            </Button>
          )}
        </ButtonGroup>
      </>
    </ThemeProvider>
  );
};

export default observer(ReportActionButtons);
