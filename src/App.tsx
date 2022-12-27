// import { useState } from "react";
import Metric from "./components/Metric-ui";

function App() {
  return (
    <div className="metrics">
      <header className="mb-6">
        <h1 className="metrics__logo">fun-metrics</h1>
      </header>
      <div className="max-w-xs md:max-w-screen-sm lg:max-w-screen-lg mx-auto">
        <section>
          <div className="flex flex-col space-y-4 mb-5">
            <div className="flex justify-between ">
              <div>
                <span className="mr-3">user name</span>
                <i className="fa fa-user fa-2x"></i>
              </div>
              <div className="py-3">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                  />
                  <label className="form-check-label inline-block text-gray-800 font-black">
                    edit
                  </label>
                </div>
              </div>
            </div>
            <button className="md:w-40">new metric</button>
          </div>
        </section>
        <section>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
        </section>
      </div>
    </div>
  );
}

export default App;
