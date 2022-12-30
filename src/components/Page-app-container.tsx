import { useContext } from "react";
import Header from "./Header";
import LoginWithAccount from "./Login-with-social-account";
import PageEditMetrics from "./Page-edit-metrics";
import Footer from "./Footer";
import useMetricContext from "../useMetricContext";
export default function MainContainer(...args): JSX.Element {
  //
  console.log("args ", args);

  const OuterContainer = "metrics bg-white dark:bg-slate-800 dark:text-white";
  const InnerConatainer = "h-5/6 mb-2";
  // const logged = true;
  const { logged } = useMetricContext();
  console.log("state -> ", logged);

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
      <Footer />
    </div>
  );
}
