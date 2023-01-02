import { MetricUi, DispatchMsg, ChartTypeSelected } from "../metricfun.types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ThreeCircles } from "react-loader-spinner";
import { Pie } from "react-chartjs-2";

type MetricModal = {
  id: string;
  handleClick: DispatchMsg;
};

type MetricSelectType = {
  handleClick: DispatchMsg;
  isSavingChanges: boolean;
  id: string;
};

type MetricChartTypeSelected = {
  chartTypeSelected: ChartTypeSelected;
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
function MetricModal({ id, handleClick }: MetricModal): JSX.Element {
  return (
    <section className="absolute z-10 h-full w-full">
      <div className="absolute h-full w-full bg-indigo-500 opacity-50"></div>
      <div className="content absolute p-5 mt-40 shadow">
        <div className="flex justify-center  inline-block align-middle">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <p className="text-gray-700 text-base mb-4">
              You are about to delete. Do you want to proceed?
            </p>
            <button
              type="button"
              onClick={() => {
                handleClick({
                  type: "DeleteMetric",
                  id,
                });
              }}
              className="inline-block px-6 py-2.5 bg-zinc-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => {
                handleClick({
                  type: "ToggleShowWarning",
                  id,
                });
              }}
              className="ml-5 inline-block px-6 py-2.5 bg-zinc-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
  handleClick,
  isSavingChanges,
  id,
}: MetricSelectType): JSX.Element {
  const PointerEvents: string = isSavingChanges
    ? "pointer-events-none"
    : "pointer-events-auto";

  return (
    <details className="metric-ui__select-chart-option">
      <summary className={PointerEvents} role="button">
        <p>Select Chart Type</p>
      </summary>
      <ul>
        <li>
          <button
            onClick={() => {
              handleClick({
                type: "SelectChartType",
                id,
                chartType: "Pie",
              });
            }}
            className="hover:bg-zinc-200 dark:hover:bg-zinc-500"
          >
            <i className="fa fa-pie-chart"></i>
            <span>Pie</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleClick({
                type: "SelectChartType",
                id,
                chartType: "Line",
              });
            }}
            className="hover:bg-zinc-200 dark:hover:bg-zinc-500"
          >
            <i className="fa fa-line-chart"></i>
            <span>Line</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleClick({ type: "SelectChartType", id, chartType: "Area" });
            }}
            className="hover:bg-zinc-200 dark:hover:bg-zinc-500"
          >
            <i className="fa fa-area-chart"></i>
            <span>Area</span>
          </button>
        </li>
      </ul>
    </details>
  );
}

function MetricTypeDisplay({
  chartTypeSelected,
}: MetricChartTypeSelected): JSX.Element {
  ChartJS.register(ArcElement, Tooltip, Legend);
  // fake data
  const data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // <Pie data={data} />
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

  return (
    <div className="metric-ui__show-chart">
      <ul className={classShowChart()}>
        <li>None</li>
        <li>Pie</li>
        <li> line</li>
        <li>Area</li>
      </ul>
    </div>
  );
}

export default function Metric({
  id,
  name,
  isEditable,
  isMetricNameEditable,
  isSavingChanges,
  showWarning,
  showUpdateMetricChanges,
  hasOnSaveErrors,
  chartTypeSelected,
  metadata,
  handleClick,
  handleOnChange,
}: MetricUi): JSX.Element {
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
        <MetricModal {...{ id, handleClick: eventHandler(handleClick) }} />
      )}
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex justify-between w-56">
            {isMetricNameEditable ? (
              <>
                <input
                  value={name}
                  placeholder="metric name"
                  className="w-40 mr-2"
                  onChange={(evt) => {
                    evt.preventDefault();

                    eventHandler(handleOnChange)({
                      type: "UpdateMetricName",
                      id,
                      value: evt.target?.value || "",
                    });
                  }}
                />
                {hasOnSaveErrors && <p>At least 3 characters</p>}
              </>
            ) : (
              <>
                <span className="mr-2">{name}</span>
                <button
                  onClick={() => {
                    eventHandler(handleClick)({
                      type: "EditMetricName",
                      id,
                    });
                  }}
                >
                  {isEditable && (
                    <i className="fa fa-pencil-square-o fa-lg"></i>
                  )}
                </button>
              </>
            )}
          </div>
          {isEditable && (
            <button
              onClick={() => {
                eventHandler(handleClick)({
                  type: "ToggleShowWarning",
                  id,
                });
              }}
              className="font-extrabold"
            >
              delete metric
            </button>
          )}
        </div>
        {/* end metric name */}
        {isEditable && (
          <MetricOptionsSelector
            {...{ id, isSavingChanges, handleClick: eventHandler(handleClick) }}
          />
        )}
        {/*end chart selector */}
        <MetricTypeDisplay {...{ chartTypeSelected }} />
        {/* end display metric type */}
        {isEditable && showUpdateMetricChanges && (
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => {
                handleClick({
                  type: "UpdateMetric",
                  value: false,
                });
              }}
              className="mr-4"
            >
              cancel
            </button>
            <button
              onClick={() => {
                handleClick({
                  type: "UpdateMetric",
                  value: true,
                });
              }}
            >
              save
            </button>
          </div>
        )}
        {/* end save button */}
        <ul className="text-xs font-bold mt-5">
          {Object.values(metadata).map((data, idx) => (
            <li key={`${idx}_${data}`}>{data}</li>
          ))}
        </ul>
        {/* end display metadata */}
      </div>
    </div>
  );
}
