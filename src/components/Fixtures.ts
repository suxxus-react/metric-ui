import { IState, ChartData, ChartsData, IMetricUi } from "../metricfun.types";

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const pie: ChartData = {
  labels: [],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const area: ChartData = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: [12, 19, 3, 5, 2, 3],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const line: ChartData = {
  labels,
  datasets: [
    {
      fill: false,
      label: "Dataset 1",
      data: [23, 12, 7, 9, 20, 9],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      fill: false,
      label: "Dataset 2",
      data: [12, 19, 3, 5, 2, 3],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// const noData = { labels: [], datasets: [] };

export const chartsData: ChartsData = {
  pie,
  area,
  line,
};

export const metricProps: Omit<IMetricUi, "dispatchMsg"> = {
  id: "01",
  previousName: "zz top",
  name: "zz top",
  isNewMetric: false,
  isMetricNameEditable: false,
  isEditable: true,
  isSavingChanges: false,
  requestMetricDeletion: false,
  showMetricSaveCancelCtrls: false,
  isValid: false,
  errorTypes: { nameLength: false, noChartSelected: false, nameEquals: false },
  previousChartTypeSelected: "None",
  chartTypeSelected: "None",
  chartsData,
  metadata: {
    resolution: "monthly",
    update: "update ...",
    limit: "limit x",
  },
};

export const metricsState: IState = {
  id: 0,
  isDark: false,
  isLogged: false,
  userName: "",
  isEditable: false,
  updateMetricChanges: { id: "", name: "", chartType: "None" },
  saveNewMetricChanges: { id: "", name: "", chartType: "None" },
  deleteMetric: { id: "" },
  navigateTo: { url: "" },
  metrics: [],
};
