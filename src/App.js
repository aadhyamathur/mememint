import "./App.css";

import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Templates from "./pages/templates";
import Mint from "./pages/mint";
import Home from "./pages/index";
import Meme from "./pages/meme/id";
import {Toaster} from 'react-hot-toast'
/* import the ipfs-http-client and buffer libraries */

import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { Link, Route } from "wouter";
import { mintNFTTx, viewNFTScript } from "./cadence/code.js";

const projectId = "2Jg0M9eybJ1dltguJTWfhnooRsr";
const projectSecret = "0f4dbad34e18bf3c4cff4920302c71b7";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

fcl
  .config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

function App() {
  const [user, setUser] = useState();
  const [file, setFile] = useState();
  const [addr,setAddr]=useState();
  const [fclData,setFcl]=useState();

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);
  const logIn = () => {
    fcl.authenticate();
  };
  const logOut = () => {
    fcl.unauthenticate();
  };
  const mint = async () => {
    const added = await client.add(file);
    const hash = added.path;
    const transactionId = await fcl
      .send([
        fcl.transaction(mintNFTTx),
        fcl.args([
          fcl.arg(hash, types.String),
          fcl.arg("Holiday NFT", types.String),
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
      .then(fcl.decode);
  };


  return (
    <div className="App font-lato">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <Navbar addr={addr} setAdddr={setAddr} fcl={fcl}/>

      <Route path="/templates">
        <Templates />
      </Route>
      <Route path="/mint">
        <Mint />
      </Route>
      <Route path="/meme/:id">
        <Meme addr={addr} setAdddr={setAddr} setFcl={setFcl}/>
      </Route>
      <Route path="/">
        <Home />
      </Route>  
    </div>
  );
}

export default App;
