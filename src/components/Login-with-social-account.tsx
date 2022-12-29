//
export default function LoginWithAccount(): JSX.Element {
  const Button =
    "flex justify-center w-full h-14 bg-gray-300 font-medium p-3 rounded-lg text-black md:w-60";
  return (
    <a href="#" className={Button}>
      <i className="fa fa-github-alt fa-2x mr-8" aria-hidden="true"></i>
      <span className="font-extrabold">Login with Github</span>
    </a>
  );
}
