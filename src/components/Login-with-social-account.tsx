//
export default function LoginWithAccount(): JSX.Element {
  const Button = "flex justify-around w-52 bg-gray-300 font-medium p-3 rounded";
  return (
    <a href="#" className={Button}>
      <i className="fa fa-github-alt fa-2x" aria-hidden="true"></i>
      <span className="font-extrabold">Login with Github</span>
    </a>
  );
}
