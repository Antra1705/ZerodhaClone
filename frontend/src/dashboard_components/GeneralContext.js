import React, { useState } from "react";

const GeneralContext = React.createContext({
  selectedSymbol: "AAPL",
  setSelectedSymbol: () => {},
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  openAnalyticsWindow: () => {},
  closeAnalyticsWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");

  const selectSymbol = (uid) => {
    if (uid) setSelectedSymbol(uid);
  };

  return (
    <GeneralContext.Provider
      value={{
        selectedSymbol,
        setSelectedSymbol: selectSymbol,
        openBuyWindow: selectSymbol,
        closeBuyWindow: () => {},
        openAnalyticsWindow: selectSymbol,
        closeAnalyticsWindow: () => {},
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
