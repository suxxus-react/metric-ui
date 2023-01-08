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

type MetricUpdatedData = {
  id: string;
  name: string;
  chartType: ChartTypeSelected;
};

type MetricId = { id: string };

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

function getDefaultMetricUi(metricData: MetricData): IMetricUi {
  const labels = metricData.chartData.labels || [];

  const metadata = metricData.metadata || {
    resolution: "",
    update: "",
    limit: "",
  };

  const errorTypes = { nameLength: false, noChartSelected: false };

  const defaultMetricData: IMetricUi = {
    id: metricData.id,
    originalName: metricData.name,
    name: metricData.name,
    isNewMetric: false,
    isMetricNameEditable: false,
    isEditable: false,
    isSavingChanges: false,
    showWarning: false,
    showUpdateMetricChanges: false,
    isValid: false,
    errorTypes,
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

  return defaultMetricData;
}

// metricUi transform data Helpers
// ===============================

// default metricUI data
function updateMetricsUiOnCreateNewMetric(): IMetricUi {
  const datasets = { datasets: [], labels: [] };

  const chartsData = {
    pie: datasets,
    area: datasets,
    line: datasets,
  };

  const errorTypes = { nameLength: false, noChartSelected: false };

  return {
    id: nanoid(),
    originalName: "",
    name: "",
    isNewMetric: true,
    isMetricNameEditable: true,
    isEditable: true,
    isSavingChanges: false,
    showWarning: false,
    showUpdateMetricChanges: true,
    isValid: false,
    originalChartTypeSelected: "None",
    chartTypeSelected: "None",
    errorTypes,
    chartsData,
    metadata: {
      resolution: "",
      update: "",
      limit: "",
    },
  };
}

function updateMetricUiList(
  msg: Msg,
  setMsg: React.Dispatch<React.SetStateAction<Msg>>
) {
  return (metric: IMetricUi): IMetricUi => {
    switch (msg.type) {
      case "ToggleEditable":
        return {
          ...metric,
          isEditable: !metric.isEditable,
          name: metric.originalName,
          chartTypeSelected: metric.originalChartTypeSelected,
          isMetricNameEditable: false,
        };
      case "ToggleShowWarning":
        return metric.id === msg.id
          ? { ...metric, showWarning: !metric.showWarning }
          : metric;
      case "EditMetricName":
        return metric.id === msg.id
          ? {
              ...metric,
              isMetricNameEditable: !metric.isMetricNameEditable,
              name: "",
              showUpdateMetricChanges: true,
            }
          : metric;
      case "UpdateMetricName":
        return metric.id === msg.id ? { ...metric, name: msg.value } : metric;
      case "SelectChartType":
        return metric.id === msg.id
          ? {
              ...metric,
              chartTypeSelected: msg.value,
              showUpdateMetricChanges: true,
            }
          : metric;
      case "SaveMetricChanges":
        if (!msg.value) {
          // cancel changes
          return metric.id === msg.id
            ? {
                ...metric,
                name: metric.originalName,
                chartTypeSelected: metric.originalChartTypeSelected,
                isMetricNameEditable: false,
                showUpdateMetricChanges: false,
                errorTypes: { nameLength: false, noChartSelected: false },
              }
            : metric;
        } else {
          if (metric.id === msg.id) {
            metric.isValid = true;
            // validate data
            if (metric.name.length < 3) {
              const errorTypes = { ...metric.errorTypes, nameLength: true };
              metric = {
                ...metric,
                errorTypes,
                isValid: false,
              };
            }

            if (metric.chartTypeSelected === "None") {
              const errorTypes = {
                ...metric.errorTypes,
                noChartSelected: true,
              };
              metric = {
                ...metric,
                errorTypes,
                isValid: false,
              };
            }

            if (metric.isValid) {
              setMsg({
                type: "SubmitMetricChanges",
                id: metric.id,
                value: {
                  name: metric.name,
                  chartTypeSelected: metric.chartTypeSelected,
                },
              });

              metric = {
                ...metric,
                isValid: false,
                errorTypes: { nameLength: false, noChartSelected: false },
              };
            }
          }
          //
          return metric;
        }
      case "SubmitMetricChanges":
      case "DeleteMetric":
        return metric.id === msg.id
          ? {
              ...metric,
              isSavingChanges: true,
              isMetricNameEditable: false,
              showUpdateMetricChanges: false,
              showWarning: false,
            }
          : metric;
      case "MetricChangesUpdatedOk":
        return metric.id === msg.id
          ? {
              ...metric,
              originalName: metric.name,
              isNewMetric: false,
              originalChartTypeSelected: metric.chartTypeSelected,
              isSavingChanges: false,
            }
          : metric;

      default:
        return metric;
    }
  };
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
    userName: "Alice",
    isEditable: false,
    metrics: [],
  });

  const [msg, setMsg] = useState<Msg>({ type: "None" });

  const [metricChanges, setMetricChanges] = useState<MetricUpdatedData>({
    id: "",
    name: "",
    chartType: "None",
  });

  const [deleteMetric, setDeleteMetric] = useState<MetricId>({ id: "" });

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
          metrics: state.metrics
            .filter(({ isNewMetric }) => !isNewMetric)
            .map(updateMetricUiList(msg, setMsg)),
        };
        break;
      case "CreateNewMetric":
        updatedState = {
          ...state,
          metrics: [updateMetricsUiOnCreateNewMetric(), ...state.metrics],
        };
        break;
      case "ToggleShowWarning":
      case "EditMetricName":
      case "UpdateMetricName":
      case "SelectChartType":
      case "SaveMetricChanges":
      case "MetricChangesUpdatedOk":
        updatedState = {
          ...state,
          metrics: state.metrics.map(updateMetricUiList(msg, setMsg)),
        };
        break;
      case "SubmitMetricChanges":
        updatedState = {
          ...state,
          metrics: state.metrics.map(updateMetricUiList(msg, setMsg)),
        };

        setMetricChanges({
          id: msg.id,
          name: msg.value.name,
          chartType: msg.value.chartTypeSelected,
        });

        break;
      case "DeleteMetric":
        const metricFromList: IMetricUi =
          state.metrics.find(({ id }) => id === msg.id) ||
          updateMetricsUiOnCreateNewMetric();

        if (metricFromList.isNewMetric) {
          setMsg({ type: "MetricDeleted", id: msg.id });
        } else {
          setDeleteMetric({ id: msg.id });
          updatedState = {
            ...state,
            metrics: state.metrics.map(updateMetricUiList(msg, setMsg)),
          };
        }
        break;

      case "MetricDeleted":
        updatedState = {
          ...state,
          metrics: state.metrics.filter(({ id }) => id !== msg.id),
        };
        break;
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
    if (metricChanges.id) {
      async function updateMetric() {
        try {
          const response = await axios.put(
            "https://dummyjson.com/http/200",
            metricChanges
          );

          const { data }: { data: { message?: string } } = response;

          if (data.message === "OK") {
            setMetricChanges({ id: "", name: "", chartType: "None" });
            setMsg({ type: "MetricChangesUpdatedOk", id: metricChanges.id });
          }
        } catch (err) {
          console.error(err);
          //do some stuff
        }
      }

      updateMetric();
    }
  }, [metricChanges]);

  useEffect(() => {
    if (deleteMetric.id) {
      async function deleteUserMetric() {
        try {
          const response = await axios.delete("http://dummyjson.com/http/200", {
            data: { id: deleteMetric.id },
          });

          const { data }: { data: { message?: string } } = response;

          if (data.message === "OK") {
            setMsg({
              type: "MetricDeleted",
              id: deleteMetric.id,
            });
            setDeleteMetric({ id: "" });
          }
        } catch (err) {
          console.error(err);
        }
      }
      deleteUserMetric();
    }
  }, [deleteMetric]);

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
          console.error(err);
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
