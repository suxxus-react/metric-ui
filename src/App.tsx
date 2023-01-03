import { useState } from "react";
import MainContainer from "./components/Page-app-container";
import { IState, Msg, IProps } from "./metricfun.types";

const updateState = (msg: Msg, state: IState): IState => {
  console.log("msg -> ", msg);
  switch (msg.type) {
    case "IsLogged":
      return { ...state, isLogged: true };
    case "None":
      return { ...state };
    default:
      return { ...state };
  }

  // return { ...state };
};

function App() {
  const [state, setState] = useState<IState>({
    isDark: false,
    isLogged: false,
    userName: "",
    isEditable: false,
    metrics: [],
  });

  const props: IProps = {
    ...state,
    dispatchMsg: (msg: Msg) => {
      setState(updateState(msg, { ...state }));
      return msg;
    },
  };

  return <MainContainer {...props} />;
}

export default App;
