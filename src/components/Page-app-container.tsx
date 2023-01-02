import Header from "./Header";
import LoginWithAccount from "./Login-with-social-account";
import PageEditMetrics from "./Page-edit-metrics";
import Footer from "./Footer";
import { IProps } from "../metricfun.types";

export default function MainContainer(props: IProps): JSX.Element {
  const { isLogged } = props;

  const OuterContainer = "metrics bg-white dark:bg-slate-800 dark:text-white";
  const InnerConatainer = "h-5/6 mb-2";
  return (
    <div className={OuterContainer}>
      <Header {...props} />
      <div className={InnerConatainer}>
        {isLogged ? (
          <PageEditMetrics {...props} />
        ) : (
          <div className="h-full flex justify-center items-center">
            <LoginWithAccount {...props} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
