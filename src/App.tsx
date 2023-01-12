import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContainer from "./components/Page-app-container";
import { userDataDecoder, newMetricDataDecoder } from "./jsonDataDecoders";
import {
  IState,
  Msg,
  IProps,
  ChartTypeSelected,
  IMetricUi,
} from "./metricfun.types";
import {
  getDefaultMetricUiData,
  updateMetricUiData,
} from "./metricDataHelpers";

type MetricUpdatedData = {
  id: string;
  name: string;
  chartType: ChartTypeSelected;
};
type MetricId = { id: string };

function updateStateMetricList(
  msg: Msg,
  setMsg: React.Dispatch<React.SetStateAction<Msg>>
) {
  return (metric: IMetricUi): IMetricUi => {
    switch (msg.type) {
      case "ToggleEditable":
        return {
          ...metric,
          isEditable: !metric.isEditable,
          name: metric.previousName,
          chartTypeSelected: metric.previousChartTypeSelected,
          isMetricNameEditable: false,
          requestMetricDeletion: false,
          showMetricSaveCancelCtrls: false,
        };
      case "RequestMetricDeletion":
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
          // cancel submit changes, reset values
          return metric.id === msg.id
            ? {
                ...metric,
                name: metric.previousName,
                chartTypeSelected: metric.previousChartTypeSelected,
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
          // validate data, before submit
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
                type: metric.isNewMetric ? "CreateMetric" : "UpdateMetricData",
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
      // -- with service
      case "CreateMetric":
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
        return metric.id === msg.id
          ? {
              ...metric,
              previousName: metric.name,
              previousChartTypeSelected: metric.chartTypeSelected,
              isSavingChanges: false,
            }
          : metric;
      case "NewMetricUpdated":
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
  const navigate = useNavigate();

  const [state, setState] = useState<IState>({
    id: 0,
    isDark: false,
    isLogged: false,
    userName: "",
    isEditable: false,
    metrics: [],
  });

  const [msg, setMsg] = useState<Msg>({ type: "None" });

  const [updateMetricData, setUpdateMetricData] = useState<MetricUpdatedData>({
    id: "",
    name: "",
    chartType: "None",
  });

  const [createMetric, setCreateMetric] = useState<MetricUpdatedData>({
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
      case "LoginWithSocialNetwork":
        // TODO should be updated when real login is done
        // for now, just navigate to /welcome
        navigate("/welcome");
        setMsg({ type: "IsLogged", userName: "Alice" });
        break;
      case "Logout":
        updatedState = { ...state, isLogged: false, userName: "" };
        navigate("/");
        break;
      case "IsLogged":
        updatedState = { ...state, isLogged: true, userName: msg.userName };
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
        updatedState = {
          ...state,
          isEditable: !state.isEditable,
          metrics: state.metrics
            .filter(({ isNewMetric }) => !isNewMetric)
            .map(updateStateMetricList(msg, setMsg)),
        };
        break;
      case "CreateNewMetricUi":
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
      // metric component messages dispatchs
      case "MetricUpdated":
      // when we get the response from Service
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

      case "UpdateMetricData":
      case "CreateMetric":
        const fn =
          msg.type === "UpdateMetricData"
            ? setUpdateMetricData
            : setCreateMetric;

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
          setDeleteMetric({ id: msg.id });
          updatedState = {
            ...state,
            metrics: state.metrics.map(updateStateMetricList(msg, setMsg)),
          };
        }
        break;
      case "None":
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
    if (createMetric.id) {
      async function saveMetric() {
        try {
          const response = await axios.post("/newMetric.json", createMetric);
          const { data }: { data: { status?: string } } = response;

          // TODO remove mock data (when we have the Api service)
          const { name, id } = createMetric;

          setMsg({
            type: "NewMetricUpdated",
            id: createMetric.id,
            value: { ...newMetricDataDecoder(data), name, id },
          });

          setCreateMetric({ id: "", name: "", chartType: "None" }); // reset
        } catch (err: any) {
          console.error(err.message || "");
        }
      }

      saveMetric();
    }
  }, [createMetric]);

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
