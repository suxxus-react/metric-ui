import LoggedHeader from "./Logged-header";
import Metric from "./Metric-editor";
import { IProps } from "../metricfun.types";
export default function PageEditMetrics(props: IProps): JSX.Element {
  const { metrics } = props;
  return (
    <div className="h-full overflow-hidden max-w-xs md:max-w-screen-sm lg:max-w-screen-lg mx-auto">
      <section className="my-5">
        <LoggedHeader {...props} />
      </section>
      <section className="h-full overflow-scroll">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((props) => {
            return <Metric {...props} />;
          })}
        </div>
      </section>
    </div>
  );
}
