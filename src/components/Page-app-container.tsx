import { Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import LoginWithAccount from "./Login-with-social-account";
import PageEditMetrics from "./Page-edit-metrics";
import Footer from "./Footer";
import { IProps } from "../metricfun.types";

function LoginWithAccountWrapper(props: IProps): JSX.Element {
  return (
    <div className="h-full flex justify-center items-center">
      <LoginWithAccount {...props} />
    </div>
  );
}
export default function MainContainer(props: IProps): JSX.Element {
  const OuterContainer = "metrics bg-white dark:bg-slate-800 dark:text-white";
  const InnerConatainer = "h-5/6 mb-2";

  return (
    <div className={OuterContainer}>
      <Header {...props} />
      <div className={InnerConatainer}>
        <Routes>
          <Route path="welcome" element={<PageEditMetrics {...props} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

// <Route path="/" element={<LoginWithAccountWrapper {...props} />} />
