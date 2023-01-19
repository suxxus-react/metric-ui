import { useEffect, useReducer } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import MainContainer from "./components/Page-app-container";
import {
  userDataDecoder,
  deleteMetricDecoder,
  newMetricDataDecoder,
} from "./jsonDataDecoders";

import { useGetApi, useDeleteApi, useUpdateApi } from "./apiCall";

import { IState, IProps, Status } from "./metricfun.types";
import { updateMetricUiData } from "./metricDataHelpers";
import { stateReducer } from "./reducers";

const INITIAL_STATE: IState = {
  id: 0,
  isDark: false,
  isLogged: true,
  userName: "",
  isEditable: false,
  deleteMetric: { id: "" },
  updateMetricChanges: {
    id: "",
    name: "",
    chartType: "None",
  },
  saveNewMetricChanges: {
    id: "",
    name: "",
    chartType: "None",
  },
  metrics: [],
};

function App() {
  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);

  const [{ data, error }, doFetch] = useGetApi();
  const [{ deleteData, deleteErr }, doDelete] = useDeleteApi();
  const [{ updateData, updateErr }, updateBody, doPut] = useUpdateApi();

  // const navigate = useNavigate();

  useEffect(() => {
    if (state.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.isDark]);

  useEffect(() => {
    if (state.isLogged) {
      if (error) {
        console.error(error);
      }

      if (data) {
        dispatch({
          type: "UpdateMetricList",
          value: userDataDecoder(data).metrics.map(updateMetricUiData),
        });
      } else {
        doFetch("/data.json");
      }
    }
  }, [state.isLogged, data, error, doFetch]);

  useEffect(() => {
    if (state.deleteMetric.id) {
      if (deleteErr) {
        console.error(deleteErr);
      }

      if (deleteData) {
        const decoded = deleteMetricDecoder(deleteData);
        if (decoded.status === Status.Ok) {
          dispatch({
            type: "MetricDeleted",
            id: state.deleteMetric.id,
          });
        } else {
          console.warn(decoded.status);
        }
      } else {
        doDelete("http://dummyjson.com/http/200");
      }
    }
  }, [state.deleteMetric.id, deleteErr, deleteData, doDelete]);
  //
  useEffect(() => {
    if (state.updateMetricChanges.id) {
      if (updateError) {
        console.error(updateErr);
      }

      if (updateData) {
        // const decoded =
      }
      // async function updateMetric() {
      //   try {
      //     const response = await axios.put("https://dummyjson.com/http/200", {
      //       name: state.updateMetricChanges.name,
      //       id: state.updateMetricChanges.id,
      //       chartType: state.updateMetricChanges.chartType,
      //     });
      //
      //     const { data }: { data: { status?: string } } = response;
      //
      //     if (data.status === "200") {
      //       dispatch({
      //         type: "MetricUpdated",
      //         id: state.updateMetricChanges.id,
      //       });
      //     } else {
      //       console.warn("no matches", data);
      //     }
      //
      //     /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      //   } catch (err: any) {
      //     console.error(err.message || "");
      //   }
      // }
      //
      // updateMetric();
    }
  }, [
    state.updateMetricChanges.id,
    state.updateMetricChanges.chartType,
    state.updateMetricChanges.name,
  ]);
  //
  // useEffect(() => {
  //   if (state.saveNewMetricChanges.id) {
  //     async function saveMetric() {
  //       try {
  //         const response = await axios.post("/newMetric.json", {
  //           name: state.saveNewMetricChanges.name,
  //           id: state.saveNewMetricChanges.id,
  //           chartType: state.saveNewMetricChanges.chartType,
  //         });
  //         const { data }: { data: { status?: string } } = response;
  //
  //         dispatch({
  //           type: "NewMetricUpdated",
  //           id: state.saveNewMetricChanges.id,
  //           value: {
  //             ...newMetricDataDecoder(data),
  //             name: state.saveNewMetricChanges.name,
  //             id: state.saveNewMetricChanges.id,
  //           },
  //         });
  //
  //         /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  //       } catch (err: any) {
  //         console.error(err.message || "");
  //       }
  //     }
  //
  //     saveMetric();
  //   }
  // }, [
  //   state.saveNewMetricChanges.id,
  //   state.saveNewMetricChanges.name,
  //   state.saveNewMetricChanges.chartType,
  // ]);

  const props: IProps = {
    ...state,
    dispatchMsg: dispatch,
  };

  return <MainContainer {...props} />;
}

export default App;
