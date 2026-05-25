import React, { useContext } from "react";
import WatchList from "./WatchList";
import TerminalChart from "./TerminalChart";
import BuyActionWindow from "./BuyActionWindow";
import { GeneralContextProvider } from "./GeneralContext";
import GeneralContext from "./GeneralContext";

const TerminalWorkspace = ({ children }) => {
  const { selectedSymbol } = useContext(GeneralContext);

  return (
    <div className="terminal-layout">
      <aside className="terminal-sidebar glass-panel">
        <WatchList />
      </aside>

      <section className="terminal-workspace">
        <div className="terminal-chart-zone glass-panel">
          <TerminalChart symbol={selectedSymbol} />
        </div>
        <div className="terminal-route-content">{children}</div>
      </section>

      <aside className="terminal-order-rail glass-panel">
        <BuyActionWindow uid={selectedSymbol} docked />
      </aside>
    </div>
  );
};

const Dashboard = ({ children }) => {
  return (
    <GeneralContextProvider>
      <TerminalWorkspace>{children}</TerminalWorkspace>
    </GeneralContextProvider>
  );
};

export default Dashboard;
