import "./App.css";

import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
/* import the ipfs-http-client and buffer libraries */
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

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

    console.log(hash);
  };
  return (
    <div className="App font-lato">
      <Navbar />
      {user && user.addr ? <h1>{user.addr}</h1> : null}

      <h1 className="text-yellow-600 text-2xl"> Hi MemeMint </h1>
      <button onClick={() => logIn()}> Log In </button>
      <button onClick={() => logOut()}>Log Out</button>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={() => mint()}>Mint HolidayNFT</button>
    </div>
  );
}

export default App;
