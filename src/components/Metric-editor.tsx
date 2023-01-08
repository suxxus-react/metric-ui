import {
  IMetricUiCtrls,
  DispatchMsg,
  ChartTypeSelected,
  ChartsData,
} from "../metricfun.types";
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { ThreeCircles } from "react-loader-spinner";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

type MetricModal = {
  id: string;
  dispatchMsg: DispatchMsg;
};

type MetricSelectType = {
  dispatchMsg: DispatchMsg;
  isSavingChanges: boolean;
  id: string;
};

type MetricChartTypeSelected = {
  chartTypeSelected: ChartTypeSelected;
  isNewMetric: boolean;
  chartsData: ChartsData;
};

// helpers
// =======
//
type EventHandlerHelperProps = { isSavingChanges: boolean };

const eventHandlerHelper =
  ({ isSavingChanges }: EventHandlerHelperProps) =>
  (fn: DispatchMsg): DispatchMsg =>
    isSavingChanges ? () => ({ type: "None" }) : fn;

// component
// =========
function MetricModal({ id, dispatchMsg }: MetricModal): JSX.Element {
  return (
    <section className="absolute z-10 h-full w-full">
      <div className="metric-ui__show-saving-spinner"></div>
      <div className="content absolute z-10 p-5 mt-40 shadow">
        <div className="flex justify-center  inline-block align-middle">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <p className="text-gray-700 text-base mb-4">
              You are about to delete. Do you want to proceed?
            </p>
            <button
              className="mr-2"
              onClick={() => {
                dispatchMsg({
                  type: "DeleteMetric",
                  id,
                });
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                dispatchMsg({
                  type: "ToggleShowWarning",
                  id,
                });
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricOptionsSelector({
  dispatchMsg,
  isSavingChanges,
  id,
}: MetricSelectType): JSX.Element {
  const PointerEvents: string = isSavingChanges
    ? "pointer-events-none"
    : "pointer-events-auto";

  const Button = "button-default hover:bg-zinc-200 dark:hover:bg-zinc-500";

  const ChartName = "mr-10";

  return (
    <details className="metric-ui__select-chart-option">
      <summary className={PointerEvents} role="button">
        <p>Select Chart Type</p>
      </summary>
      <ul>
        <li>
          <button
            onClick={() => {
              dispatchMsg({
                type: "SelectChartType",
                id,
                value: "Pie",
              });
            }}
            className={Button}
          >
            <i className="fa fa-pie-chart"></i>
            <span className={ChartName}>Pie</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              dispatchMsg({
                type: "SelectChartType",
                id,
                value: "Line",
              });
            }}
            className={Button}
          >
            <i className="fa fa-line-chart"></i>
            <span className={ChartName}>Line</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              dispatchMsg({ type: "SelectChartType", id, value: "Area" });
            }}
            className={Button}
          >
            <i className="fa fa-area-chart"></i>
            <span className={ChartName}>Area</span>
          </button>
        </li>
      </ul>
    </details>
  );
}

function MetricTypeDisplay({
  isNewMetric,
  chartTypeSelected,
  chartsData,
}: MetricChartTypeSelected): JSX.Element {
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const { pie, area, line } = chartsData;

  const classShowChart = (): string => {
    switch (chartTypeSelected) {
      case "Pie":
        return "metric-ui__show-chart__pie";
      case "Line":
        return "metric-ui__show-chart__line";
      case "Area":
        return "metric-ui__show-chart__area";
      case "None":
        return "metric-ui__show-chart__default";
    }
  };

  const classShowChartIcon = (): string =>
    isNewMetric ? "metric-ui__show-chart__icon" : "";

  const getChartText = (): string => {
    const text = "Fun Charts ";
    switch (chartTypeSelected) {
      case "Pie":
        return `${text}"Pie"`;
      case "Area":
        return `${text}"Area"`;
      case "Line":
        return `${text}"Line"`;
      case "None":
        return "";
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: getChartText(),
      },
    },
  };

  return (
    <div className="metric-ui__show-chart">
      <ul className={`${classShowChart()} ${classShowChartIcon()}`}>
        <li>
          <i className="fa fa-bar-chart text-zinc-300"></i>
        </li>
        {isNewMetric ? (
          <>
            <li>
              <i className="fa fa-pie-chart"></i>
            </li>
            <li>
              <i className="fa fa-line-chart"></i>
            </li>
            <li>
              <i className="fa fa-area-chart"></i>
            </li>
          </>
        ) : (
          <>
            <li>
              <Pie options={options} data={pie} />
            </li>
            <li>
              <Line options={options} data={line} />
            </li>
            <li>
              <Line options={options} data={area} />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default function Metric({
  id,
  name,
  isEditable,
  isNewMetric,
  isMetricNameEditable,
  isSavingChanges,
  showWarning,
  showUpdateMetricChanges,
  errorTypes,
  chartTypeSelected,
  chartsData,
  metadata,
  dispatchMsg,
}: IMetricUiCtrls): JSX.Element {
  //
  const eventHandler = eventHandlerHelper({ isSavingChanges });

  return (
    <div className="metric-ui">
      {isSavingChanges && (
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass="metric-ui__show-saving-spinner"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      )}
      {showWarning && (
        <MetricModal {...{ id, dispatchMsg: eventHandler(dispatchMsg) }} />
      )}
      <div className="p-4">
        <div className="flex justify-between">
          <div className="">
            {isEditable && isMetricNameEditable ? (
              <>
                <input
                  value={name}
                  placeholder="metric name"
                  className="
                    mt-1
                    h-full
                    w-full
                    block
                    rounded-md
                    bg-gray-200
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0k "
                  onChange={(evt) => {
                    evt.preventDefault();

                    eventHandler(dispatchMsg)({
                      type: "UpdateMetricName",
                      id,
                      value: evt.target?.value || "",
                    });
                  }}
                />
                {errorTypes.nameLength && (
                  <p className="form-warning-errors">At least 3 characters</p>
                )}
              </>
            ) : (
              <>
                <span className="mr-2">{name}</span>
                {isEditable && (
                  <button
                    className="button-default"
                    onClick={() => {
                      eventHandler(dispatchMsg)({
                        type: "EditMetricName",
                        id,
                      });
                    }}
                  >
                    <i className="fa fa-pencil-square-o fa-lg"></i>
                  </button>
                )}
              </>
            )}
          </div>
          {isEditable && (
            <button
              className="button-default"
              onClick={() => {
                eventHandler(dispatchMsg)({
                  type: "ToggleShowWarning",
                  id,
                });
              }}
            >
              <i className="fa fa-trash-o fa-2x"></i>
            </button>
          )}
        </div>
        {/* end metric name */}
        {isEditable && (
          <MetricOptionsSelector
            {...{ id, isSavingChanges, dispatchMsg: eventHandler(dispatchMsg) }}
          />
        )}
        {/*end chart selector */}
        <MetricTypeDisplay
          {...{ chartTypeSelected, chartsData, isNewMetric }}
        />
        {errorTypes.noChartSelected && (
          <p className="form-warning-errors">choose a chart option</p>
        )}
        {/* end display metric type */}
        {isEditable && showUpdateMetricChanges && (
          <div className="mt-8 flex justify-end">
            {!isNewMetric && (
              <button
                onClick={() => {
                  dispatchMsg({
                    type: "SaveMetricChanges",
                    id,
                    value: false,
                  });
                }}
                className="mr-4"
              >
                cancel
              </button>
            )}
            <button
              onClick={() => {
                dispatchMsg({
                  type: "SaveMetricChanges",
                  id,
                  value: true,
                });
              }}
            >
              save
            </button>
          </div>
        )}
        {/* end save button */}
        <ul className="metric-ui__metadata  text-xs font-bold mt-5 ">
          {Object.values(metadata).map((data, idx) => (
            <li key={`${idx}_${data}`}>{data}</li>
          ))}
        </ul>
        {/* end display metadata */}
      </div>
    </div>
  );
}
