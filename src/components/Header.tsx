import { IProps } from "../metricfun.types";
export default function Header({ isDark, dispatchMsg }: IProps): JSX.Element {
  const sun = <i className="fa fa-sun-o"></i>;
  const moon = <i className="fa fa-moon-o"></i>;
  return (
    <header className="flex justify-between">
      <div className="metric-fun-rgb bg-no-repeat w-24 h-20"></div>
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
