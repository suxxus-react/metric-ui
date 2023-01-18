import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainContainer from "./components/Page-app-container";
import { userDataDecoder, newMetricDataDecoder } from "./jsonDataDecoders";
import { IState, IProps } from "./metricfun.types";
import { updateMetricUiData } from "./metricDataHelpers";
import { stateReducer } from "./reducers";

const INITIAL_STATE: IState = {
  id: 0,
  isDark: false,
  isLogged: false,
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLogged) {
      async function fetchMetricsData() {
        try {
          const response = await axios.get("/data.json");
          const { data }: { data: unknown } = response;

          dispatch({
            type: "UpdateMetricList",
            value: userDataDecoder(data).metrics.map(updateMetricUiData),
          });
          navigate("/welcome"); // TODO remove whe github login is finished

          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        } catch (err: any) {
          console.error(err.message);
        }
      }
      fetchMetricsData();
    }
  }, [state.isLogged, navigate]);

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
          const response = await axios.put("https://dummyjson.com/http/200", {
            name: state.updateMetricChanges.name,
            id: state.updateMetricChanges.id,
            chartType: state.updateMetricChanges.chartType,
          });

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
  }, [
    state.updateMetricChanges.id,
    state.updateMetricChanges.chartType,
    state.updateMetricChanges.name,
  ]);

  useEffect(() => {
    if (state.saveNewMetricChanges.id) {
      async function saveMetric() {
        try {
          const response = await axios.post("/newMetric.json", {
            name: state.saveNewMetricChanges.name,
            id: state.saveNewMetricChanges.id,
            chartType: state.saveNewMetricChanges.chartType,
          });
          const { data }: { data: { status?: string } } = response;

          dispatch({
            type: "NewMetricUpdated",
            id: state.saveNewMetricChanges.id,
            value: {
              ...newMetricDataDecoder(data),
              name: state.saveNewMetricChanges.name,
              id: state.saveNewMetricChanges.id,
            },
          });

          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        } catch (err: any) {
          console.error(err.message || "");
        }
      }

      saveMetric();
    }
  }, [
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
