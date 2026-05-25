import React from "react";
// import { Route, Routes } from "react-router-dom";

// import Apps from "./Apps";
// import Funds from "./Funds";
// import Holdings from "./Holdings";
// import Orders from "./Orders";
// import Positions from "./Positions";

import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>

      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
