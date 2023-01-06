import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import * as D from "json-decoder";
import MainContainer from "./components/Page-app-container";
import {
  IState,
  Msg,
  IProps,
  UserDataDecoded,
  ChartTypeSelected,
  PieChartDataSets,
  LineChartDataSet,
  MetricData,
  IMetricUi,
  Metadata,
  MetricDataChart,
  MetricDataSet,
} from "./metricfun.types";

type UserData = {
  id: number;
  metrics?: unknown;
};

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

function getPieChartData({ label, data }: MetricDataSet): PieChartDataSets {
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
  return ({ label, data }: MetricDataSet): LineChartDataSet => {
    return {
      fill,
      label,
      data,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    };
  };
}

function getDefaultMetricUi(metricData: MetricData) {
  const labels = metricData.chartData.labels || [];

  const metadata = metricData.metadata || {
    resolution: "",
    update: "",
    limit: "",
  };

  const defaultMetricData = {
    id: metricData.id,
    name: metricData.name,
    isMetricNameEditable: false,
    isEditable: false,
    isSavingChanges: false,
    showWarning: false,
    showUpdateMetricChanges: false,
    hasOnSaveErrors: false,
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

  return defaultMetricData;
}

// metricUi transform data Helpers
// ===============================
function updateMetricsUiOnToggleEditable(metricUi: IMetricUi): IMetricUi {
  return {
    ...metricUi,
    isEditable: !metricUi.isEditable,
  };
}

// default metricUI data
function updateMetricsUiOnCreateNewMetric(): IMetricUi {
  const datasets = { datasets: [], labels: [] };

  const chartsData = {
    pie: datasets,
    area: datasets,
    line: datasets,
  };

  return {
    id: nanoid(),
    name: "",
    isMetricNameEditable: false,
    isEditable: true,
    isSavingChanges: false,
    showWarning: false,
    showUpdateMetricChanges: false,
    hasOnSaveErrors: false,
    chartTypeSelected: "None",
    chartsData,
    metadata: {
      resolution: "",
      update: "",
      limit: "",
    },
  };
}

function updateMetricUiList(
  id: string,
  metrics: IMetricUi[],
  msg: Msg
): IMetricUi[] {
  console.log(JSON.stringify(metrics, null, 2));
  return metrics.map((metric) => {
    if (metric.id === id) {
      // console.log(metric);
      const copy = { ...metric };
      switch (msg.type) {
        case "ToggleShowWarning":
          copy.showWarning = !copy.showWarning;
          return copy;
      }
    }
    return metric;
  });
}

function userDataDecoder(data: unknown): UserDataDecoded {
  const chartPie = D.exactDecoder("pie");
  const chartLine = D.exactDecoder("line");
  const chartArea = D.exactDecoder("area");

  const chartTypeDecoder = D.oneOfDecoders<string>(
    chartPie,
    chartLine,
    chartArea
  );

  const ChartDataSetsDecoder = D.objectDecoder<MetricDataSet>({
    label: D.stringDecoder,
    data: D.arrayDecoder(D.numberDecoder),
  });

  const chartDataDecoder = D.objectDecoder<MetricDataChart>({
    labels: D.oneOfDecoders(
      D.arrayDecoder(D.stringDecoder),
      D.undefinedDecoder
    ),
    datasets: D.arrayDecoder(ChartDataSetsDecoder),
  });

  const metadataDecoder = D.objectDecoder<Metadata>({
    update: D.stringDecoder,
    limit: D.stringDecoder,
    resolution: D.stringDecoder,
  });

  const userMetricsDecoder = D.objectDecoder<MetricData>({
    id: D.stringDecoder,
    name: D.stringDecoder,
    chartType: chartTypeDecoder,
    chartData: chartDataDecoder,
    metadata: D.oneOfDecoders(metadataDecoder, D.undefinedDecoder),
  });

  const dataDecoder = D.objectDecoder<UserData>({
    id: D.numberDecoder,
    metrics: D.oneOfDecoders(D.undefinedDecoder, D.anyDecoder),
  })
    .bind((result) =>
      D.valueDecoder({ ...result, metrics: result.metrics || [] })
    )
    .bind((result) => {
      const metricsDecoder = D.arrayDecoder(userMetricsDecoder).decode(
        result.metrics
      );

      switch (metricsDecoder.type) {
        case "ERR":
          console.warn(
            `UserData.metrics-decoder -> ${metricsDecoder.type}`,
            metricsDecoder.message
          );
          return D.valueDecoder({ id: 0, metrics: [] });

        case "OK":
          return D.valueDecoder(result);
      }
    })
    .bind((result) => {
      const resultCopy = JSON.parse(JSON.stringify(result));

      const metrics = resultCopy.metrics
        .map((obj: MetricData) => {
          obj.metadata = obj.metadata || {
            update: "",
            limit: "",
            resolution: "",
          };
          obj.chartData.labels = obj.chartData.labels || [];
          return obj;
        })
        .flat();

      return D.valueDecoder({ ...result, metrics });
    })
    .decode(data);

  switch (dataDecoder.type) {
    case "OK":
      return dataDecoder.value;
    case "ERR":
      console.warn(`UserData-decoder ${dataDecoder.type}`, dataDecoder.message);
      return {
        id: 0,
        metrics: [],
      };
  }
}

function App() {
  const [state, setState] = useState<IState>({
    id: 0,
    isDark: false,
    isLogged: true,
    userName: "",
    isEditable: false,
    metrics: [],
  });

  const [msg, setMsg] = useState<Msg>({ type: "None" });

  const dispatchMsg = (msg: Msg) => {
    setMsg(msg);
    return msg;
  };

  const { isLogged } = state;

  useEffect(() => {
    let updatedState: IState = state;
    console.log("msg ", msg);
    switch (msg.type) {
      case "IsLogged":
        updatedState = { ...state, isLogged: true };
        break;
      case "UpdateMetrics":
        updatedState = {
          ...state,
          metrics: msg.value,
        };
        break;
      case "ToggleEditable":
        updatedState = {
          ...state,
          isEditable: !state.isEditable,
          metrics: state.metrics.map(updateMetricsUiOnToggleEditable),
        };
        break;
      case "CreateNewMetric":
        updatedState = {
          ...state,
          metrics: [updateMetricsUiOnCreateNewMetric(), ...state.metrics],
        };
        break;
      case "ToggleShowWarning":
        updatedState = {
          ...state,
          metrics: updateMetricUiList(msg.id, state.metrics, msg),
        };
      case "None":
        updatedState = { ...state };
        break;
      default:
        updatedState = { ...state };
        break;
    }
    setState(updatedState);
  }, [msg]);

  useEffect(() => {
    if (isLogged) {
      async function fetchMetricsData() {
        try {
          const response = await axios.get("/data.json");
          const { data }: { data: unknown } = response;

          dispatchMsg({
            type: "UpdateMetrics",
            value: userDataDecoder(data).metrics.map(getDefaultMetricUi),
          });
        } catch (err) {
          alert(err);
        }
      }
      fetchMetricsData();
    }
  }, [isLogged]);

  const props: IProps = {
    ...state,
    dispatchMsg,
  };

  return <MainContainer {...props} />;
}

export default App;
