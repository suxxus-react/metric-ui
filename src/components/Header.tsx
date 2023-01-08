import { IProps } from "../metricfun.types";
export default function Header({ isDark, dispatchMsg }: IProps): JSX.Element {
  const sun = <i className="fa fa-sun-o"></i>;
  const moon = <i className="fa fa-moon-o"></i>;
  return (
    <header className="flex justify-between">
      <h1 className="metrics__logo">fun-metrics</h1>
      <button
        className="button-default"
        onClick={() => {
          dispatchMsg({
            type: "ToggleDarkMode",
          });
        }}
      >
        {isDark ? sun : moon}
      </button>
    </header>
  );
}
