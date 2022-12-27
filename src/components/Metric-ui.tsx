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
  return (
    <div className="metric-ui__show-chart">
      <ul>
        <li>
          <img
            src="https://landing.moqups.com/img/content/charts-graphs/area-charts/simple-stacked-area-chart/simple-stacked-area-chart-1600.png"
            alt="area"
          />
        </li>
        <li>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F225-2250017_pie-chart-cliparts-20-buy-clip-art-circle.png&f=1&nofb=1&ipt=5eee5de401e20d09224432e123221eda6763c00f86168e441be4bbb23192751c&ipo=images"
            alt="pie"
          />
        </li>
        <li>
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.favpng.com%2F4%2F0%2F24%2Fline-chart-market-graph-of-a-function-png-favpng-YFWMX89r3pXcYraLZci3W6gqE.jpg&f=1&nofb=1&ipt=386589c302b1b71f4cfdb1d69d4249f1ed233c53a7c118bee3e623b05f40c817&ipo=images"
            alt="line"
          />
        </li>
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
