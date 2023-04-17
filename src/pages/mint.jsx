import React from "react";

import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { useState, useEffect } from "react";
/* import the ipfs-http-client and buffer libraries */
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { Link, Route } from "wouter";

const projectId = process.env.REACT_APP_IPFS_PROJECT_ID;
const projectSecret = process.env.REACT_APP_IPFS_SECRET;
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

function Mint() {
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
    <>
      {user && user.addr ? <h1>{user.addr}</h1> : null}

      <h1 className="text-yellow-600 text-2xl"> Hi MemeMint </h1>
      <button onClick={() => logIn()}> Log In </button>
      <button onClick={() => logOut()}>Log Out</button>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={() => mint()}>Mint HolidayNFT</button>
    </>
  );
}

export default Mint;
