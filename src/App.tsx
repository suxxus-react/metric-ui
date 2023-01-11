import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import MainContainer from "./components/Page-app-container";
import { userDataDecoder, newMetricDataDecoder } from "./jsonDataDecoders";
import {
  IState,
  Msg,
  IProps,
  ChartTypeSelected,
  PieChartDataSets,
  LineChartDataSet,
  MetricData,
  IMetricUi,
  MetricDataSet,
} from "./metricfun.types";

type MetricUpdatedData = {
  id: string;
  name: string;
  chartType: ChartTypeSelected;
};
type MetricId = { id: string };

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
      ...(styles[index] || {
        borderColor: "rgb(204, 204, 204)",
        backgroundColor: "rgb(204, 204, 204, 0.5)",
      }),
    };
  };
}

function updateMetricUiData(metricData: MetricData): IMetricUi {
  const labels = metricData.chartData.labels || [];

  const metadata = metricData.metadata || {
    resolution: "",
    update: "",
    limit: "",
  };

  const errorTypes = {
    nameLength: false,
    nameEquals: false,
    noChartSelected: false,
  };

  const defaultMetricData: IMetricUi = {
    id: metricData.id,
    previousName: metricData.name,
    name: metricData.name,
    isNewMetric: false,
    isMetricNameEditable: false,
    isEditable: false,
    isSavingChanges: false,
    requestMetricDeletion: false,
    showMetricSaveCancelCtrls: false,
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
function getDefaultMetricUiData(): IMetricUi {
  const datasets = { datasets: [], labels: [] };

  const chartsData = {
    pie: datasets,
    area: datasets,
    line: datasets,
  };

  const errorTypes = {
    nameLength: false,
    nameEquals: false,
    noChartSelected: false,
  };

  return {
    id: nanoid(),
    previousName: "",
    name: "",
    isNewMetric: true,
    isMetricNameEditable: true,
    isEditable: true,
    isSavingChanges: false,
    requestMetricDeletion: false,
    showMetricSaveCancelCtrls: true,
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

function updateStateMetricList(
  msg: Msg,
  setMsg: React.Dispatch<React.SetStateAction<Msg>>
) {
  return (metric: IMetricUi): IMetricUi => {
    switch (msg.type) {
      case "ToggleEditable":
        // metric is disable to be edited
        return {
          ...metric,
          isEditable: !metric.isEditable,
          name: metric.previousName,
          chartTypeSelected: metric.originalChartTypeSelected,
          isMetricNameEditable: false,
          requestMetricDeletion: false,
          showMetricSaveCancelCtrls: false,
        };
      case "RequestMetricDeletion":
        // prompt to confirm metric deletion
        return metric.id === msg.id
          ? { ...metric, requestMetricDeletion: !metric.requestMetricDeletion }
          : metric;
      case "EditMetricName":
        return metric.id === msg.id
          ? {
              ...metric,
              isMetricNameEditable: !metric.isMetricNameEditable,
              showMetricSaveCancelCtrls: true,
            }
          : metric;
      case "UpdateMetricName":
        return metric.id === msg.id ? { ...metric, name: msg.value } : metric;
      case "SelectChartType":
        return metric.id === msg.id
          ? {
              ...metric,
              chartTypeSelected: msg.value,
              showMetricSaveCancelCtrls: true,
            }
          : metric;
      case "SaveMetricChanges":
        if (!msg.value) {
          // cancel changes
          return metric.id === msg.id
            ? {
                ...metric,
                name: metric.previousName,
                chartTypeSelected: metric.originalChartTypeSelected,
                isMetricNameEditable: false,
                showMetricSaveCancelCtrls: false,
                errorTypes: {
                  nameLength: false,
                  nameEquals: false,
                  noChartSelected: false,
                },
              }
            : metric;
        } else {
          // validate data
          if (metric.id === msg.id) {
            const nameLengthErr = metric.name.length < 3;
            const nameEqualsErr =
              metric.isMetricNameEditable &&
              metric.name === metric.previousName;
            const noChartSelectedErr = metric.chartTypeSelected === "None";

            const isValid = [
              nameLengthErr,
              nameEqualsErr,
              noChartSelectedErr,
            ].every((err) => !err);

            metric = {
              ...metric,
              isValid,
              errorTypes: {
                nameLength: nameLengthErr,
                nameEquals: nameEqualsErr,
                noChartSelected: noChartSelectedErr,
              },
            };

            if (metric.isValid) {
              setMsg({
                type: metric.isNewMetric ? "PostMetric" : "UpdateMetricData",
                id: metric.id,
                value: {
                  name: metric.name,
                  chartTypeSelected: metric.chartTypeSelected,
                },
              });

              metric = {
                ...metric,
                isValid: false,
                errorTypes: {
                  nameLength: false,
                  nameEquals: false,
                  noChartSelected: false,
                },
              };
            }
          }
          //
          return metric;
        }
      case "PostMetric":
      case "UpdateMetricData":
      case "DeleteMetric":
        return metric.id === msg.id
          ? {
              ...metric,
              isSavingChanges: true,
              isMetricNameEditable: false,
              showMetricSaveCancelCtrls: false,
              requestMetricDeletion: false,
            }
          : metric;
      case "MetricUpdated":
        // the metric changes were updated by the service
        return metric.id === msg.id
          ? {
              ...metric,
              previousName: metric.name,
              originalChartTypeSelected: metric.chartTypeSelected,
              isSavingChanges: false,
            }
          : metric;
      case "NewMetricUpdated":
        // a new metric was updated by the service
        return metric.id === msg.id
          ? {
              ...metric,
              ...updateMetricUiData(msg.value),
              isEditable: true,
            }
          : metric;

      default:
        return metric;
    }
  };
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

  const [updateMetricData, setUpdateMetricData] = useState<MetricUpdatedData>({
    id: "",
    name: "",
    chartType: "None",
  });

  const [postMetric, setPostMetric] = useState<MetricUpdatedData>({
    id: "",
    name: "",
    chartType: "None",
  });

  const [deleteMetric, setDeleteMetric] = useState<MetricId>({ id: "" });

  const dispatchMsg = (msg: Msg) => {
    setMsg(msg);
    return msg;
  };

  useEffect(() => {
    let updatedState: IState = state;

    if (import.meta.env.DEV) {
      console.log("msg ", msg);
    }

    switch (msg.type) {
      case "IsLogged":
        updatedState = { ...state, isLogged: true };
        break;
      case "ToggleDarkMode":
        updatedState = { ...state, isDark: !state.isDark };
        break;
      case "UpdateMetricList":
        // when we get the user metrics list
        // from Api
        updatedState = {
          ...state,
          metrics: msg.value,
        };
        break;
      case "ToggleEditable":
        // toggle metric editable status
        updatedState = {
          ...state,
          isEditable: !state.isEditable,
          metrics: state.metrics
            .filter(({ isNewMetric }) => !isNewMetric)
            .map(updateStateMetricList(msg, setMsg)),
        };
        break;
      case "CreateNewMetric":
        // show a new metric box
        updatedState = {
          ...state,
          metrics: [getDefaultMetricUiData(), ...state.metrics],
        };
        break;
      case "RequestMetricDeletion":
      case "EditMetricName":
      case "UpdateMetricName":
      case "SelectChartType":
      case "SaveMetricChanges":
      // metric component dispatchs
      case "MetricUpdated":
      //when we get the response from Api
      case "NewMetricUpdated":
        // when a new metric was registered by the service
        updatedState = {
          ...state,
          metrics: state.metrics.map(updateStateMetricList(msg, setMsg)),
        };
        break;
      case "MetricDeleted":
        // remove metric from the list
        updatedState = {
          ...state,
          metrics: state.metrics.filter(({ id }) => id !== msg.id),
        };
        break;

      // with Api
      case "UpdateMetricData":
      case "PostMetric":
        const fn =
          msg.type === "UpdateMetricData" ? setUpdateMetricData : setPostMetric;

        // submit metric changes to the service
        updatedState = {
          ...state,
          metrics: state.metrics.map(updateStateMetricList(msg, setMsg)),
        };

        fn({
          id: msg.id,
          name: msg.value.name,
          chartType: msg.value.chartTypeSelected,
        });

        break;
      case "DeleteMetric":
        // when the user delete a metric
        const metricFromList: IMetricUi =
          state.metrics.find(({ id }) => id === msg.id) ||
          getDefaultMetricUiData();

        if (metricFromList.isNewMetric) {
          // we do not need to comunicate this to the service
          // so we juse delete it from the list
          setMsg({ type: "MetricDeleted", id: msg.id });
        } else {
          // we need to use the service
          setDeleteMetric({ id: msg.id });
          updatedState = {
            ...state,
            metrics: state.metrics.map(updateStateMetricList(msg, setMsg)),
          };
        }
        break;
      case "None":
        // return the state whith out any modification
        updatedState = { ...state };
        break;
    }

    setState(updatedState);
  }, [msg]);

  useEffect(() => {
    const { isDark } = state;

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.isDark]);

  useEffect(() => {
    if (updateMetricData.id) {
      async function updateMetric() {
        try {
          const response = await axios.put(
            "https://dummyjson.com/http/200",
            updateMetricData
          );

          const { data }: { data: { status?: string } } = response;

          if (data.status === "200") {
            setMsg({ type: "MetricUpdated", id: updateMetricData.id });
          } else {
            console.warn("no matches", data);
          }

          setUpdateMetricData({ id: "", name: "", chartType: "None" }); // reset
        } catch (err: any) {
          console.error(err.message || "");
        }
      }
      updateMetric();
    }
  }, [updateMetricData]);

  useEffect(() => {
    if (postMetric.id) {
      async function saveMetric() {
        try {
          const response = await axios.post("/newMetric.json", postMetric);
          const { data }: { data: { status?: string } } = response;

          // TODO remove mock data (when we have the Api service)
          const { name, id } = postMetric;

          setMsg({
            type: "NewMetricUpdated",
            id: postMetric.id,
            value: { ...newMetricDataDecoder(data), name, id },
          });

          setPostMetric({ id: "", name: "", chartType: "None" }); // reset
        } catch (err: any) {
          console.error(err.message || "");
        }
      }

      saveMetric();
    }
  }, [postMetric]);

  useEffect(() => {
    if (deleteMetric.id) {
      async function deleteUserMetric() {
        try {
          const response = await axios.delete("http://dummyjson.com/http/200", {
            data: { id: deleteMetric.id },
          });

          const { data }: { data: { status?: string } } = response;

          if (data.status === "200") {
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
    if (state.isLogged) {
      async function fetchMetricsData() {
        try {
          const response = await axios.get("/data.json");
          const { data }: { data: unknown } = response;

          dispatchMsg({
            type: "UpdateMetricList",
            value: userDataDecoder(data).metrics.map(updateMetricUiData),
          });
        } catch (err) {
          console.error(err);
        }
      }
      fetchMetricsData();
    }
  }, [state.isLogged]);

  const props: IProps = {
    ...state,
    dispatchMsg,
  };

  return <MainContainer {...props} />;
}

export default App;
