import React, { useState } from "react";

const MetricsContext = React.createContext([{}, () => {}]);

function MetricsContextProvider(props) {
: console.log("props-> ", props);
  const [state, setState] = useState({
    logged: false,
  });
  return (
    <MetricsContext.Provider value={[state, setState]}>
      {props.children}
    </MetricsContext.Provider>
  );
}

export { MetricsContext, MetricsContextProvider };
