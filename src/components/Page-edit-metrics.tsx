import LoggedHeader from "./Logged-header";
import Metric from "./Metric-editor";
import { State } from "../metricfun.types";
export default function PageEditMetrics(state: State): JSX.Element {
  return (
    <div className="h-full overflow-hidden max-w-xs md:max-w-screen-sm lg:max-w-screen-lg mx-auto">
      <section className="my-5">
        <LoggedHeader {...state} />
      </section>
      <section className="h-full overflow-scroll">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"></div>
      </section>
    </div>
  );
}

// <Metric />
// <Metric />
// <Metric />
// <Metric />
// <Metric />
// <Metric />
// <Metric />
// <Metric />
// <Metric />
// <Metric />
