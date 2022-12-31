import Header from "./Header";
import LoginWithAccount from "./Login-with-social-account";
import PageEditMetrics from "./Page-edit-metrics";
import Footer from "./Footer";

type Props = { isLogged: boolean };
export default function MainContainer({ isLogged }: Props): JSX.Element {
  const OuterContainer = "metrics bg-white dark:bg-slate-800 dark:text-white";
  const InnerConatainer = "h-5/6 mb-2";
  return (
    <div className={OuterContainer}>
      <Header />
      <div className={InnerConatainer}>
        {isLogged ? (
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
