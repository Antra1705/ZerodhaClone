import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import StockChartDrawer from "./StockChartDrawer";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openAnalyticsWindow: (uid) => {},
  closeAnalyticsWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedAnalyticsUID, setSelectedAnalyticsUID] = useState("");

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenAnalyticsWindow = (uid) => {
    setIsAnalyticsOpen(true);
    setSelectedAnalyticsUID(uid);
  };

  const handleCloseAnalyticsWindow = () => {
    setIsAnalyticsOpen(false);
    setSelectedAnalyticsUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openAnalyticsWindow: handleOpenAnalyticsWindow,
        closeAnalyticsWindow: handleCloseAnalyticsWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isAnalyticsOpen && (
        <StockChartDrawer
          symbol={selectedAnalyticsUID}
          onClose={handleCloseAnalyticsWindow}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;