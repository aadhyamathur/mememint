import "./App.css";

import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Templates from "./pages/templates";
import Mint from "./pages/mint";
import Home from "./pages/index";
/* import the ipfs-http-client and buffer libraries */
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { Link, Route } from "wouter";

function App() {
  return (
    <div className="App font-lato">
      <Navbar />

      <Route path="/templates">
        <Templates />
      </Route>
      <Route path="/mint">
        <Mint />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </div>
  );
}

export default App;
