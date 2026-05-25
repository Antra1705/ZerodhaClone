import React from "react";
import Hero from "./Hero";
import TickerStrip from "./TickerStrip";
import Features from "./Features";
import Stats from "./Stats";
import Pricing from "./Pricing";
import OpenAccount from "../OpenAccount";

function HomePage() {
  return (
    <main className="mk-home">
      <Hero />
      <TickerStrip />
      <Features />
      <Stats />
      <Pricing />
      <OpenAccount />
    </main>
  );
}

export default HomePage;
