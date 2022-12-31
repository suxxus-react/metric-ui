import { State } from "../metricfun.types";
export default function LoggedHeader({
  userName,
  toggleEditable,
  createNewMetric,
}: State): JSX.Element {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <div>
          <span className="mr-3">{userName}</span>
          <i className="fa fa-user fa-2x"></i>
        </div>
        <div className="py-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={toggleEditable}
            />
            <label className="form-check-label inline-block">edit</label>
          </div>
        </div>
      </div>
      <button className="md:w-40" onClick={createNewMetric}>
        new metric
      </button>
    </div>
  );
}
