import { useState } from "react";
// import "./App.css";

function MetricName(): JSX.Element {
  return (
    <>
      <input value="" placeholder="metric name" />
      <button>submit</button>
      <p>metric name</p>
    </>
  );
}

function MetricTypeSelection(): JSX.Element {
  return (
    <ul>
      <li>
        <button>area</button>
      </li>
      <li>
        <button>pie</button>
      </li>
      <li>
        <button>line</button>
      </li>
    </ul>
  );
}

function ChartPreview(): JSX.Element {
  return (
    <ul>
      <li>
        <img
          src="https://landing.moqups.com/img/content/charts-graphs/area-charts/simple-stacked-area-chart/simple-stacked-area-chart-1600.png"
          alt="area"
          width="100"
        />
      </li>
      <li>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F225-2250017_pie-chart-cliparts-20-buy-clip-art-circle.png&f=1&nofb=1&ipt=5eee5de401e20d09224432e123221eda6763c00f86168e441be4bbb23192751c&ipo=images"
          alt="pie"
          width="100"
        />
      </li>
      <li>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.favpng.com%2F4%2F0%2F24%2Fline-chart-market-graph-of-a-function-png-favpng-YFWMX89r3pXcYraLZci3W6gqE.jpg&f=1&nofb=1&ipt=386589c302b1b71f4cfdb1d69d4249f1ed233c53a7c118bee3e623b05f40c817&ipo=images"
          alt="line"
          width="100"
        />
      </li>
    </ul>
  );
}

function Metric(): JSX.Element {
  return (
    <div className="metric-ui">
      <MetricName />
      <button name="delete-metric">x</button>
      <MetricTypeSelection />
      <button name="save-selected-metric">save</button>
      <ChartPreview />
      <div id="metadata">
        <p>limit x </p>
        <p>162 updates</p>
        <p>monthly resolution</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Metric />
    </div>
  );
}

export default App;
