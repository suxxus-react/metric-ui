import { useEffect, useReducer } from "react";
// import { useNavigate } from "react-router-dom";
import MainContainer from "./components/Page-app-container";
import {
  userDataDecoder,
  deleteMetricDecoder,
  newMetricDataDecoder,
} from "./jsonDataDecoders";

import { useGetApi, useDeleteApi, useUpdateApi, usePostApi } from "./apiCall";

import { IProps, Status } from "./metricfun.types";
import { updateMetricUiData } from "./metricDataHelpers";
import { stateReducer, INITIAL_STATE } from "./reducers";

// const navigate = useNavigate();

function App() {
  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);

  const [{ data, error }, doFetch] = useGetApi();
  const [{ deleteData, deleteErr }, doDelete] = useDeleteApi();
  const [{ updateData, updateErr }, doPut] = useUpdateApi();
  const [{ createData, createErr }, doPost] = usePostApi();

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

  useEffect(() => {
    if (state.updateMetricChanges.id) {
      //
      if (updateErr) {
        console.error(updateErr);
      }

      if (updateData) {
        // TODO we for now we decode using delteMetricDecoder
        // since we are using a fake HTTP request and we eil get always 200
        const decoded = deleteMetricDecoder(updateData);
        if (decoded.status === Status.Ok) {
          dispatch({ type: "MetricUpdated", id: state.updateMetricChanges.id });
        } else {
          console.warn(decoded.status);
        }
      } else {
        doPut({
          url: "http://dummyjson.com/http/200",
          body: {
            name: state.updateMetricChanges.name,
            id: state.updateMetricChanges.id,
            chartType: state.updateMetricChanges.chartType,
          },
        });
      }
    }
  }, [
    doPut,
    updateData,
    updateErr,
    state.updateMetricChanges.id,
    state.updateMetricChanges.chartType,
    state.updateMetricChanges.name,
  ]);
  //
  useEffect(() => {
    if (state.saveNewMetricChanges.id) {
      //
      if (createErr) {
        console.error(createErr);
      }

      if (createData) {
        const decoded = newMetricDataDecoder(createData);
        dispatch({
          type: "NewMetricUpdated",
          id: state.saveNewMetricChanges.id,
          value: {
            ...decoded,
            name: state.saveNewMetricChanges.name,
            id: state.saveNewMetricChanges.id,
          },
        });
      } else {
        doPost({
          url: "/newMetric.json",
          body: {
            name: state.saveNewMetricChanges.name,
            id: state.saveNewMetricChanges.id,
            chartType: state.saveNewMetricChanges.chartType,
          },
        });
      }
    }
  }, [
    createData,
    createErr,
    doPost,
    state.saveNewMetricChanges.id,
    state.saveNewMetricChanges.name,
    state.saveNewMetricChanges.chartType,
  ]);

  const props: IProps = {
    ...state,
    dispatchMsg: dispatch,
  };

  return <MainContainer {...props} />;
}

export default App;
