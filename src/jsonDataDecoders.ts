import * as D from "json-decoder";
import {
  UserDataDecoded,
  MetricData,
  Metadata,
  MetricDataChart,
  MetricDataSet,
} from "./metricfun.types";
type UserData = {
  id: number;
  metrics?: unknown;
};
const chartPie = D.exactDecoder("pie");
const chartLine = D.exactDecoder("line");
const chartArea = D.exactDecoder("area");

const chartTypeDecoder = D.oneOfDecoders<string>(
  chartPie,
  chartLine,
  chartArea
);

const ChartDataSetsDecoder = D.objectDecoder<MetricDataSet>({
  label: D.oneOfDecoders(D.stringDecoder, D.undefinedDecoder),
  data: D.arrayDecoder(D.numberDecoder),
});

const chartDataDecoder = D.objectDecoder<MetricDataChart>({
  labels: D.oneOfDecoders(D.arrayDecoder(D.stringDecoder), D.undefinedDecoder),
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

export function newMetricDataDecoder(data: unknown): MetricData {
  const dataDecoder = userMetricsDecoder.decode(data);

  switch (dataDecoder.type) {
    case "OK":
      return dataDecoder.value;
    case "ERR":
      console.warn(
        `newMetricData-decoder ${dataDecoder.type}`,
        dataDecoder.message
      );
      return {
        id: "",
        name: "",
        chartType: "",
        chartData: { datasets: [] },
      };
  }
}

export function userDataDecoder(data: unknown): UserDataDecoded {
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
      const resultMetrics: MetricData[] = Array.isArray(result.metrics)
        ? result.metrics
        : [];

      const metrics = resultMetrics
        .map((obj) => {
          obj.metadata = {
            update: "",
            limit: "",
            resolution: "",
            ...obj.metadata,
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
