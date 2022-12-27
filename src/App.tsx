// import { useState } from "react";
import Metric from "./components/Metric-ui";

// <Metric />
function App() {
  return (
    <>
      <header>
        <div>logo </div>
        <button>new metric</button>
        <div>
          <span>user name</span>
          <i className="fa fa-user fa-2x"></i>
        </div>
        <button>edit</button>
      </header>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-xs md:max-w-screen-sm lg:max-w-screen-lg my-4 mx-auto">
        <Metric />
        <Metric />
        <Metric />
        <Metric />
        <Metric />
        <Metric />
        <Metric />
        <Metric />
        <Metric />
      </div>
    </>
  );
}

export default App;
