import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

function MetricModal() {
  return (
    <section className="absolute h-full  w-full">
      <div className="absolute h-full w-full bg-indigo-500 opacity-50"></div>
      <div className="content absolute p-5 mt-40 shadow">
        <div className="flex justify-center  inline-block align-middle">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <p className="text-gray-700 text-base mb-4">
              You are about to delete. Do you want to proceed?
            </p>
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-zinc-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Yes
            </button>
            <button
              type="button"
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

function MetricOptionsSelector(): JSX.Element {
  return (
    <details className="metric-ui__select-chart-option">
      <summary role="button">
        <p>Select Chart Type</p>
      </summary>
      <ul>
        <li>
          <a href="#">
            <i className="fa fa-pie-chart"></i>
            <span>Pie</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-line-chart"></i>
            <span>Line</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-area-chart"></i>
            <span>Area</span>
          </a>
        </li>
      </ul>
    </details>
  );
}

function MetricTypeDisplay(): JSX.Element {
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

  return (
    <div className="metric-ui__show-chart">
      <ul>
        <li>
          <Pie data={data} />
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default function Metric(): JSX.Element {
  return (
    <div className="metric-ui">
      <div className="p-4">
        <div className="flex justify-between">
          <div className="flex justify-between w-56">
            <div className="hidden">
              <input
                readOnly
                value=""
                placeholder="metric name"
                className="w-40 mr-2"
              />
              <i className="cursor-pointer fa fa-check-square fa-lg"></i>
            </div>
            <div>
              <span className="mr-2">metric name</span>
              <i className="cursor-pointer fa fa-pencil-square-o fa-lg"></i>
            </div>
          </div>
          <button className="font-extrabold">x</button>
        </div>
        {/* end metric name */}
        <MetricOptionsSelector />
        {/*end chart selector */}
        <MetricTypeDisplay />
        {/* end display metric type */}
        <div className="mt-2 flex justify-end invisible">
          <button className="mr-4">cancel</button>
          <button className="">save</button>
        </div>
        {/* end save button */}
        <ul className="text-xs font-bold mt-5">
          <li>limit x riched</li>
          <li>162 updates</li>
          <li>monthly resolution</li>
        </ul>
        {/* end display metadata */}
      </div>
    </div>
  );
}
