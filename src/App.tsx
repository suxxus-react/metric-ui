import { useState, useEffect, useReducer } from "react";
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
  // getDefaultMetricUiData,
  updateMetricUiData,
} from "./metricDataHelpers";

import { stateReducer } from "./reducers";

// type MetricId = { id: string };

const INITIAL_STATE: IState = {
  id: 0,
  isDark: false,
  isLogged: false,
  userName: "",
  isEditable: false,
  deleteMetric: { id: "" },
  updateMetricChanges: { id: "", name: "", chartType: "None" },
  metrics: [],
};

function App() {
  // const [state, setState] = useState<IState>({
  //   id: 0,
  //   isDark: false,
  //   isLogged: false,
  //   userName: "",
  //   isEditable: false,
  //   metrics: [],
  // });

  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);

  // const [msg, setMsg] = useState<Msg>({ type: "None" });
  //
  // const [updateMetricData, setUpdateMetricData] = useState<MetricUpdatedData>({
  //   id: "",
  //   name: "",
  //   chartType: "None",
  // });
  //
  // const [createMetric, setCreateMetric] = useState<MetricUpdatedData>({
  //   id: "",
  //   name: "",
  //   chartType: "None",
  // });
  //
  // const [deleteMetric, setDeleteMetric] = useState<MetricId>({ id: "" });
  //
  const dispatchMsg = (msg: Msg) => {
    // console.info("msg -> ", msg);
    dispatch(msg);
    return msg;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (state.isLogged) {
      async function fetchMetricsData() {
        try {
          const response = await axios.get("/data.json");
          const { data }: { data: unknown } = response;

          dispatch({
            type: "UpdateMetricList",
            value: userDataDecoder(data).metrics.map(updateMetricUiData),
          });
          navigate("/welcome");
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        } catch (err: any) {
          console.error(err.message);
        }
      }
      fetchMetricsData();
    }
  }, [state.isLogged]);

  useEffect(() => {
    if (state.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.isDark]);

  useEffect(() => {
    if (state.deleteMetric.id) {
      async function deleteUserMetric() {
        try {
          const response = await axios.delete("http://dummyjson.com/http/200", {
            data: { id: state.deleteMetric.id },
          });

          const { data }: { data: { status?: string } } = response;

          if (data.status === "200") {
            dispatch({
              type: "MetricDeleted",
              id: state.deleteMetric.id,
            });
          }
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        } catch (err: any) {
          console.error(err.message);
        }
      }
      deleteUserMetric();
    }
  }, [state.deleteMetric.id]);

  useEffect(() => {
    if (state.updateMetricChanges.id) {
      async function updateMetric() {
        try {
          const response = await axios.put(
            "https://dummyjson.com/http/200",
            state.updateMetricChanges
          );

          const { data }: { data: { status?: string } } = response;

          if (data.status === "200") {
            dispatch({
              type: "MetricUpdated",
              id: state.updateMetricChanges.id,
            });
          } else {
            console.warn("no matches", data);
          }

          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        } catch (err: any) {
          console.error(err.message || "");
        }
      }
      updateMetric();
    }
  }, [state.updateMetricChanges]);

  // useEffect(() => {
  //   let updatedState: IState = state;
  //
  //   if (import.meta.env.DEV) {
  //     console.info("msg ", msg);
  //     return
  //   }

  //   switch (msg.type) {
  //     case "LoginWithSocialNetwork":
  //       // TODO should be updated when real login is done
  //       // for now, just navigate to /welcome
  //       navigate("/welcome");
  //       setMsg({ type: "IsLogged", value: "Alice" });
  //       break;
  //     case "Logout":
  //       updatedState = {
  //         ...state,
  //         isLogged: false,
  //         userName: "",
  //         id: 0,
  //         isEditable: false,
  //         metrics: [],
  //       };
  //       navigate("/");
  //       break;
  //     case "IsLogged":
  //       updatedState = { ...state, isLogged: true, userName: msg.value };
  //       break;
  //     case "ToggleDarkMode":
  //       updatedState = { ...state, isDark: !state.isDark };
  //       break;
  //     case "UpdateMetricList":
  //       // when we get the user metrics list
  //       // from Service
  //       updatedState = {
  //         ...state,
  //         metrics: msg.value,
  //       };
  //       break;
  //     case "ToggleEditable":
  //       updatedState = {
  //         ...state,
  //         isEditable: !state.isEditable,
  //         metrics: state.metrics
  //           .filter(({ isNewMetric }) => !isNewMetric)
  //           .map(updateStateMetricList(msg, setMsg)),
  //       };
  //       break;
  //     case "CreateNewMetricUi":
  //       // show a new metric box
  //       updatedState = {
  //         ...state,
  //         metrics: [getDefaultMetricUiData(), ...state.metrics],
  //       };
  //       break;
  //     case "RequestMetricDeletion":
  //     case "EditMetricName":
  //     case "UpdateMetricName":
  //     case "SelectChartType":
  //     case "SaveMetricChanges":
  //     case "MetricUpdated":
  //     case "NewMetricUpdated":
  //       updatedState = {
  //         ...state,
  //         metrics: state.metrics.map(updateStateMetricList(msg, setMsg)),
  //       };
  //       break;
  //     case "MetricDeleted":
  //       // remove metric from the list
  //       updatedState = {
  //         ...state,
  //         metrics: state.metrics.filter(({ id }) => id !== msg.id),
  //       };
  //       break;
  //
  //     case "UpdateMetric":
  //     case "CreateMetric":
  //       const fn =
  //         msg.type === "UpdateMetric" ? setUpdateMetricData : setCreateMetric;
  //
  //       // submit metric changes to the service
  //       updatedState = {
  //         ...state,
  //         metrics: state.metrics.map(updateStateMetricList(msg, setMsg)),
  //       };
  //
  //       fn({
  //         id: msg.id,
  //         name: msg.value.name,
  //         chartType: msg.value.chartTypeSelected,
  //       });
  //
  //       break;
  //     case "DeleteMetric":
  //       // when the user delete a metric
  //       const metricFromList: IMetricUi =
  //         state.metrics.find(({ id }) => id === msg.id) ||
  //         getDefaultMetricUiData();
  //
  //       if (metricFromList.isNewMetric) {
  //         // we do not need to comunicate this to the service
  //         // so we just delete it from the metrics list
  //         setMsg({ type: "MetricDeleted", id: msg.id });
  //       } else {
  //         setDeleteMetric({ id: msg.id });
  //         updatedState = {
  //           ...state,
  //           metrics: state.metrics.map(updateStateMetricList(msg, setMsg)),
  //         };
  //       }
  //       break;
  //     case "None":
  //       updatedState = { ...state };
  //       break;
  //   }
  //
  //   // setState(updatedState);
  // }, [msg, navigate, state]);
  //
  // useEffect(() => {
  //   const { isDark } = state;
  //
  //   if (isDark) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [state.isDark]);

  // useEffect(() => {
  //   if (updateMetricData.id) {
  //     async function updateMetric() {
  //       try {
  //         const response = await axios.put(
  //           "https://dummyjson.com/http/200",
  //           updateMetricData
  //         );
  //
  //         const { data }: { data: { status?: string } } = response;
  //
  //         if (data.status === "200") {
  //           setMsg({ type: "MetricUpdated", id: updateMetricData.id });
  //         } else {
  //           console.warn("no matches", data);
  //         }
  //
  //         setUpdateMetricData({ id: "", name: "", chartType: "None" }); // reset
  //         /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  //       } catch (err: any) {
  //         console.error(err.message || "");
  //       }
  //     }
  //     updateMetric();
  //   }
  // }, [updateMetricData]);
  //
  // useEffect(() => {
  //   if (createMetric.id) {
  //     async function saveMetric() {
  //       try {
  //         const response = await axios.post("/newMetric.json", createMetric);
  //         const { data }: { data: { status?: string } } = response;
  //
  //         // TODO remove mock data (when we have the Api service)
  //         const { name, id } = createMetric;
  //
  //         setMsg({
  //           type: "NewMetricUpdated",
  //           id: createMetric.id,
  //           value: { ...newMetricDataDecoder(data), name, id },
  //         });
  //
  //         setCreateMetric({ id: "", name: "", chartType: "None" }); // reset
  //         /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  //       } catch (err: any) {
  //         console.error(err.message || "");
  //       }
  //     }
  //
  //     saveMetric();
  //   }
  // }, [createMetric]);
  //
  // useEffect(() => {
  //   if (deleteMetric.id) {
  //     async function deleteUserMetric() {
  //       try {
  //         const response = await axios.delete("http://dummyjson.com/http/200", {
  //           data: { id: deleteMetric.id },
  //         });
  //
  //         const { data }: { data: { status?: string } } = response;
  //
  //         if (data.status === "200") {
  //           setMsg({
  //             type: "MetricDeleted",
  //             id: deleteMetric.id,
  //           });
  //           setDeleteMetric({ id: "" });
  //         }
  //         /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  //       } catch (err: any) {
  //         console.error(err.message);
  //       }
  //     }
  //     deleteUserMetric();
  //   }
  // }, [deleteMetric]);
  //
  // useEffect(() => {
  //   if (state.isLogged) {
  //     async function fetchMetricsData() {
  //       try {
  //         const response = await axios.get("/data.json");
  //         const { data }: { data: unknown } = response;
  //
  //         dispatchMsg({
  //           type: "UpdateMetricList",
  //           value: userDataDecoder(data).metrics.map(updateMetricUiData),
  //         });
  //         /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  //       } catch (err: any) {
  //         console.error(err.message);
  //       }
  //     }
  //     fetchMetricsData();
  //   } else {
  //     dispatchMsg({ type: "Logout" });
  //   }
  // }, [state.isLogged]);
  //
  const props: IProps = {
    ...state,
    dispatchMsg,
  };

  return <MainContainer {...props} />;
}

export default App;
