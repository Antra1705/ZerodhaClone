import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <div className="dashboard-root">
      <TopBar />
      <div className="dashboard-body">
        <Dashboard>
          <Outlet />
        </Dashboard>
      </div>
    </div>
  );
};

export default Home;
