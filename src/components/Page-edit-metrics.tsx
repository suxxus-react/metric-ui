import LoggedHeader from "./Logged-header";
import Metric from "./Metric-editor";
export default function PageEditMetrics(): JSX.Element {
  return (
    <div className="max-w-xs md:max-w-screen-sm lg:max-w-screen-lg mx-auto">
      <section>
        <LoggedHeader />
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
          <Metric />
        </div>
      </section>
    </div>
  );
}
