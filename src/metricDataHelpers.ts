import { nanoid } from "nanoid";
import {
  ChartTypeSelected,
  PieChartDataSets,
  LineChartDataSet,
  MetricData,
  IMetricUi,
  MetricDataSet,
} from "./metricfun.types";

function getChartTypeSelected(chartType: string): ChartTypeSelected {
  switch (chartType.toUpperCase()) {
    case "PIE":
      return "Pie";
    case "AREA":
      return "Area";
    case "LINE":
      return "Line";
    default:
      return "None";
  }
}

function getPieChartData({
  label = "",
  data,
}: MetricDataSet): PieChartDataSets {
  //
  const backgroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  const borderColor = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  return {
    label,
    data,
    backgroundColor,
    borderColor,
    borderWidth: 1,
  };
}

function getLineChartData(fill: boolean) {
  return (
    { label = "", data }: MetricDataSet,
    index: number
  ): LineChartDataSet => {
    const styles = [
      {
        // blue
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        // red
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        // green
        borderColor: "rgb(28, 121, 28)",
        backgroundColor: "rgb(28, 121, 28, 0.5)",
      },
    ];

    return {
      fill,
      label,
      data,
      ...(styles[index] || styles[0]),
    };
  };
}

function getDefaultMetric(): IMetricUi {
  return {
    id: "",
    previousName: "",
    name: "",
    isNewMetric: false,
    isMetricNameEditable: false,
    isEditable: false,
    isSavingChanges: false,
    requestMetricDeletion: false,
    showMetricSaveCancelCtrls: false,
    isValid: false,
    originalChartTypeSelected: "None",
    chartTypeSelected: "None",
    errorTypes: {
      nameLength: false,
      nameEquals: false,
      noChartSelected: false,
    },
    chartsData: {
      pie: { datasets: [], labels: [] },
      area: { datasets: [], labels: [] },
      line: { datasets: [], labels: [] },
    },
    metadata: {
      resolution: "",
      update: "",
      limit: "",
    },
  };
}

export function updateMetricUiData(metricData: MetricData): IMetricUi {
  const defaultMetric = getDefaultMetric();
  const labels = metricData.chartData.labels || [];
  const metadata = metricData.metadata || defaultMetric.metadata;

  return {
    ...defaultMetric,
    id: metricData.id,
    previousName: metricData.name,
    name: metricData.name,
    originalChartTypeSelected: getChartTypeSelected(metricData.chartType),
    chartTypeSelected: getChartTypeSelected(metricData.chartType),
    chartsData: {
      pie: {
        datasets: metricData.chartData.datasets.map(getPieChartData),
        labels,
      },
      area: {
        datasets: metricData.chartData.datasets.map(getLineChartData(true)),
        labels,
      },
      line: {
        datasets: metricData.chartData.datasets.map(getLineChartData(false)),
        labels,
      },
    },
    metadata,
  };
}

export function getDefaultMetricUiData(): IMetricUi {
  // new metrics requiere this data
  return {
    ...getDefaultMetric(),
    id: nanoid(),
    isNewMetric: true,
    isEditable: true,
    isMetricNameEditable: true,
    showMetricSaveCancelCtrls: true,
  };
}
