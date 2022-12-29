import Header from "./Header";
import LoginWithAccount from "./Login-with-social-account";

export default function MainContainer() {
  const OuterContainer = "metrics bg-white dark:bg-slate-800 dark:text-white";
  const InnerConatainer = "h-5/6 flex items-center justify-center";
  return (
    <div className={OuterContainer}>
      <Header />
      <div className={InnerConatainer}>
        <LoginWithAccount />
      </div>
    </div>
  );
}
