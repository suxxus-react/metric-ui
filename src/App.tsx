import { useState } from "react";
import MainContainer from "./components/Page-app-container";
import { State, Msg, DispatchMsg } from "./metricfun.types";

interface IState {
  isDark: boolean;
  isLogged: boolean;
  userName: string;
  isEditable: boolean;
}

interface IProps extends IState {
  handleClick: DispatchMsg;
}
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
    userName: "pepe",
    isEditable: false,
  });

  const props: IProps = {
    ...state,
    handleClick: (msg: Msg) => {
      setState(updateState(msg, { ...state }));
      return msg;
    },
  };

  return <MainContainer {...props} />;
}

export default App;
