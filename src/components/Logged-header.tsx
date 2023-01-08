import { IProps } from "../metricfun.types";
export default function LoggedHeader({
  userName,
  dispatchMsg,
  isEditable,
}: IProps): JSX.Element {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <div>
          <div className="mb-4">
            <span className="mr-3">{userName}</span>
            <i className="fa fa-user fa-2x"></i>
          </div>
          <button
            onClick={() => {
              dispatchMsg({
                type: "Logout",
              });
            }}
          >
            <span className="mr-3">logout</span>
            <i className="fa fa-circle-o-notch fa"></i>
          </button>
        </div>
        <div className="py-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={() => {
                dispatchMsg({
                  type: "ToggleEditable",
                });
              }}
            />
            <label className="form-check-label inline-block">edit</label>
          </div>
        </div>
      </div>
      {isEditable && (
        <div className="md:flex md:justify-end">
          <button
            className="w-full sm:w-40"
            onClick={() => {
              dispatchMsg({ type: "CreateNewMetric", value: dispatchMsg });
            }}
          >
            new metric
          </button>
        </div>
      )}
    </div>
  );
}
