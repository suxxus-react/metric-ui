import MainContainer from "./components/Page-app-container";
import { MetricsContextProvider } from "./context";

function App() {
  return (
    <MetricsContextProvider>
      <MainContainer />
    </MetricsContextProvider>
  );
}

export default App;
