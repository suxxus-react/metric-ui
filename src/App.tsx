import { useState, useEffect } from "react";
import axios from "axios";
import * as D from "json-decoder";
import MainContainer from "./components/Page-app-container";
import {
  IState,
  Msg,
  IProps,
  ChartData,
  ChartDataSets,
  PieChartDataSets,
  LineChartDataSet,
} from "./metricfun.types";

function updateStateData(
  setState: React.Dispatch<React.SetStateAction<IState>>
) {
  return (msg: Msg, state: IState): void => {
    // console.log("update state msg -> ", msg);
    let updatedState: IState = state;
    switch (msg.type) {
      case "IsLogged":
        updatedState = { ...state, isLogged: true };
        break;
      case "UpdateMetrics":
        updatedState = {
          ...state,
          // metrics: msg.value,
        };
        break;
      case "ToggleEditable":
        updatedState = { ...state, isEditable: !state.isEditable };
        break;
      case "None":
        updatedState = { ...state };
        break;
      default:
        updatedState = { ...state };
        break;
    }

    setState(updatedState);
  };
}

type MetricData = {
  id: string;
  name: string;
  chartType: string;
  chartsData: ChartData;
};
type UserData = {
  id: number;
  metrics?: MetricData[] | any;
};

function userDataDecoder(data: unknown): UserData {
  const chartPie = D.exactDecoder("pie");
  const chartLine = D.exactDecoder("line");
  const chartArea = D.exactDecoder("area");

  const chartTypeDecoder = D.oneOfDecoders<string>(
    chartPie,
    chartLine,
    chartArea
  );

  const PieChartDataSets = D.objectDecoder<PieChartDataSets>({
    label: D.stringDecoder,
    data: D.arrayDecoder(D.numberDecoder),
    backgroundColor: D.arrayDecoder(D.stringDecoder),
    borderColor: D.arrayDecoder(D.stringDecoder),
    borderWidth: D.numberDecoder,
  });

  const LineChartDataSets = D.objectDecoder<LineChartDataSet>({
    fill: D.boolDecoder,
    label: D.stringDecoder,
    data: D.arrayDecoder(D.numberDecoder),
    backgroundColor: D.stringDecoder,
    borderColor: D.stringDecoder,
  });

  const ChartDataSetsDecoder = D.oneOfDecoders<ChartDataSets[]>(
    D.arrayDecoder(PieChartDataSets),
    D.arrayDecoder(LineChartDataSets)
  );

  const chartDataDecoder = D.objectDecoder<ChartData>({
    labels: D.oneOfDecoders(
      D.arrayDecoder(D.stringDecoder),
      D.undefinedDecoder
    ),
    datasets: ChartDataSetsDecoder,
  });

  const userMetricsDecoder = D.objectDecoder<MetricData>({
    id: D.stringDecoder,
    name: D.stringDecoder,
    chartType: chartTypeDecoder,
    chartsData: chartDataDecoder,
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
          console.error(
            `metricsDecoder -> ${metricsDecoder.type}`,
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
          obj.chartsData.labels = obj.chartsData.labels || [];
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
      console.warn(dataDecoder.type, dataDecoder.message);
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

  const updateState = updateStateData(setState);
  const { isLogged } = state;

  useEffect(() => {
    if (isLogged) {
      async function fetchMetricsData() {
        try {
          const response = await axios.get("/data.json");
          const { data }: { data: unknown } = response;

          userDataDecoder(data);

          updateState(
            {
              type: "UpdateMetrics",
              value: [],
            },
            { ...state }
          );
        } catch (err) {
          alert(err);
        }
      }
      fetchMetricsData();
    }
  }, [isLogged]);

  const props: IProps = {
    ...state,
    dispatchMsg: (msg: Msg) => {
      updateState(msg, { ...state });
      return msg;
    },
  };

  return <MainContainer {...props} />;
}

export default App;
