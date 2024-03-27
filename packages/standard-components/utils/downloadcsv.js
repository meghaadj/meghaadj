import { axios } from "standard-components/services";
import appConfig from "appConfig";

const downloadcsv = async (url, formId, name, queryParams, token) => {
  try {
    let body = {};
    body = queryParams;
    body.limit = 1000;
    body.formId = formId;
    body.name = name;

    const runnerUrl = appConfig.RUNNER_URL + `/${url}`;

    const response = await axios.post(runnerUrl, body);

    if (response.status === 200) {
      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });

      // Create a download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", `${name}.csv`);

      // Append the link to the document and trigger a click event
      document.body.appendChild(link);
      link.click();

      // Clean up
      return document.body.removeChild(link);
    }
  } catch (err) {
    alert("Failed Export the report");
  }
};

export { downloadcsv };
