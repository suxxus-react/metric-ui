import { IProps } from "../metricfun.types";
export default function LoginWithAccount({ dispatchMsg }: IProps): JSX.Element {
  const Button =
    "flex justify-center w-full h-14 bg-gray-300 font-medium pt-3 rounded-lg text-black md:w-60";
  return (
    <button
      onClick={() => {
        dispatchMsg({ type: "LoginWithSocialNetwork", value: "Github" });
      }}
      className={Button}
    >
      <i className="fa fa-github-alt fa-2x mr-4" aria-hidden="true"></i>
      <span className="font-extrabold">Login with Github</span>
    </button>
  );
}
