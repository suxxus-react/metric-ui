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

export default function userDataDecoder(data: unknown): UserDataDecoded {
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
