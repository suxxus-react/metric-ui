import Header from "./Header";
import LoginWithAccount from "./Login-with-social-account";
import PageEditMetrics from "./Page-edit-metrics";
import Footer from "./Footer";
import { State } from "../metricfun.types";

export default function MainContainer(state: State): JSX.Element {
  const { isLogged, handleClick } = state;
  const OuterContainer = "metrics bg-white dark:bg-slate-800 dark:text-white";
  const InnerConatainer = "h-5/6 mb-2";
  return (
    <div className={OuterContainer}>
      <Header {...state} />
      <div className={InnerConatainer}>
        {isLogged ? (
          <PageEditMetrics {...state} />
        ) : (
          <div className="h-full flex justify-center items-center">
            <LoginWithAccount {...state} />
          </div>
        )}
      </div>
      <Footer />
      <button
        onClick={() => {
          handleClick({
            type: "IsLogged",
          });
        }}
      >
        test
      </button>
    </div>
  );
}
