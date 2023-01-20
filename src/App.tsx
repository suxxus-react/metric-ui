import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "./components/Page-app-container";
import {
  userDataDecoder,
  deleteMetricDecoder,
  newMetricDataDecoder,
} from "./jsonDataDecoders";

import { Status } from "./metricfun.types";
import { updateMetricUiData } from "./metricDataHelpers";
import { stateReducer, INITIAL_STATE } from "./reducers";

import * as api from "./apiCall";

function App() {
  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);

  const navigate = useNavigate();

  useEffect(() => {
    if (state.navigateTo.url) {
      dispatch({
        type: "NavigeteTo",
        value: { url: "" },
      });
      navigate(state.navigateTo.url);
    }
  }, [state.navigateTo.url, navigate]);

  useEffect(() => {
    if (state.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.isDark]);

  useEffect(() => {
    if (state.isLogged) {
      api.doGet("/data.json").then((d: unknown) => {
        dispatch({
          type: "UpdateMetricList",
          value: userDataDecoder(d).metrics.map(updateMetricUiData),
        });

        dispatch({
          type: "NavigeteTo",
          value: { url: "welcome" },
        });
      });
    } else {
      dispatch({
        type: "NavigeteTo",
        value: { url: "/" },
      });
    }
  }, [state.isLogged]);

  useEffect(() => {
    if (state.deleteMetric.id) {
      api.doDelete("http://dummyjson.com/http/200").then((d: unknown) => {
        const decoded = deleteMetricDecoder(d);
        if (decoded.status === Status.Ok) {
          dispatch({
            type: "MetricDeleted",
            id: state.deleteMetric.id,
          });
        }
      });
    }
  }, [state.deleteMetric.id]);

  useEffect(() => {
    if (state.updateMetricChanges.id) {
      api
        .doPut("http://dummyjson.com/http/200", {
          name: state.updateMetricChanges.name,
          id: state.updateMetricChanges.id,
          chartType: state.updateMetricChanges.chartType,
        })
        .then((d: unknown) => {
          // TODO we for now we decode using delteMetricDecoder
          // since we are using a fake HTTP request and we eil get always 200
          const decoded = deleteMetricDecoder(d);
          if (decoded.status === Status.Ok) {
            dispatch({
              type: "MetricUpdated",
              id: state.updateMetricChanges.id,
            });
          } else {
            console.warn(decoded.status);
          }
        });
    }
  }, [
    state.updateMetricChanges.id,
    state.updateMetricChanges.chartType,
    state.updateMetricChanges.name,
  ]);

  useEffect(() => {
    if (state.saveNewMetricChanges.id) {
      api
        .doPost("/newMetric.json", {
          name: state.saveNewMetricChanges.name,
          id: state.saveNewMetricChanges.id,
          chartType: state.saveNewMetricChanges.chartType,
        })
        .then((d: unknown) => {
          const decoded = newMetricDataDecoder(d);
          dispatch({
            type: "NewMetricUpdated",
            id: state.saveNewMetricChanges.id,
            value: {
              ...decoded,
              name: state.saveNewMetricChanges.name,
              id: state.saveNewMetricChanges.id,
            },
          });
        });
    }
  }, [
    state.saveNewMetricChanges.id,
    state.saveNewMetricChanges.name,
    state.saveNewMetricChanges.chartType,
  ]);

  return <MainContainer {...state} dispatchMsg={dispatch} />;
}

export default App;
