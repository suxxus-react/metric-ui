// import { useState } from "react";
import Metric from "./components/Metric-ui";

// <Metric />
function App() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-xs sm:max-w-xs  md:max-w-screen-sm lg:max-w-screen-lg my-4 mx-auto">
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
  );
}

export default App;
