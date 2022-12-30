import { useContext } from "react";
import { MetricsContext } from "./context";

function setIsLogged(state, setState) {
  return () => {
    setState({ ...state, logged: !state.logged });
  };
}
export default () => {
  const [state, setState] = useContext(MetricsContext);

  return {
    toggleLogged: setIsLogged(state, setState),
    logged: state.logged,
  };
};
