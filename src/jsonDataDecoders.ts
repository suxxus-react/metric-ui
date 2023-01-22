import * as D from "json-decoder";
import {
  Status,
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

type DeleteMetric = {
  status: Status;
  message?: string;
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
  update: D.oneOfDecoders(D.stringDecoder, D.undefinedDecoder),
  limit: D.oneOfDecoders(D.stringDecoder, D.undefinedDecoder),
  resolution: D.oneOfDecoders(D.stringDecoder, D.undefinedDecoder),
});

const userMetricsDecoder = D.objectDecoder<MetricData>({
  id: D.stringDecoder,
  name: D.stringDecoder,
  chartType: chartTypeDecoder,
  chartData: chartDataDecoder,
  metadata: D.oneOfDecoders(metadataDecoder, D.undefinedDecoder),
});

const oK = D.exactDecoder(Status.Ok);
const conflict = D.exactDecoder(Status.Conflict);
const badRequest = D.exactDecoder(Status.BadRequest);
const created = D.exactDecoder(Status.Created);

const statusDecoder = D.oneOfDecoders<Status>(
  oK,
  conflict,
  badRequest,
  created
);

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

export function deleteMetricDecoder(data: unknown): DeleteMetric {
  //
  const dataDecoder = D.objectDecoder({
    status: statusDecoder,
    message: D.oneOfDecoders(D.stringDecoder, D.undefinedDecoder),
  }).decode(data);

  switch (dataDecoder.type) {
    case "ERR":
      console.warn(
        `DeleteData-decoder -> ${dataDecoder.type}, ${dataDecoder.message}`
      );
      return { status: Status.nothing };
    case "OK":
      return dataDecoder.value;
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
          return D.valueDecoder({ id: result.id, metrics: [] });

        case "OK":
          return D.valueDecoder(result);
      }
    })
    .bind((result) =>
      D.valueDecoder({
        ...result,
        metrics: Array.isArray(result.metrics) ? result.metrics : [],
      })
    )
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
