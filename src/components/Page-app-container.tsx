import Header from "./Header";
import LoginWithAccount from "./Login-with-social-account";
import PageEditMetrics from "./Page-edit-metrics";

type Props = { logged: boolean };
export default function MainContainer({ logged }: Props): JSX.Element {
  const OuterContainer = "metrics bg-white dark:bg-slate-800 dark:text-white";
  const InnerConatainer = "h-5/6";
  return (
    <div className={OuterContainer}>
      <Header />
      <div className={InnerConatainer}>
        {logged ? (
          <PageEditMetrics />
        ) : (
          <div className="h-full flex justify-center items-center">
            <LoginWithAccount />
          </div>
        )}
      </div>
    </div>
  );
}
