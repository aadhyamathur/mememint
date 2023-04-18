import React from "react";

import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { useState, useEffect } from "react";
/* import the ipfs-http-client and buffer libraries */
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import toast from 'react-hot-toast'

import { mintNFTTx, viewNFTScript } from "../cadence/code.js";

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


  const [scriptResult, setScriptResult] = useState([]);

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
    console.log("helllo ")
    const hash = added.path;
    const transactionId = await fcl.send([
      fcl.transaction(mintNFTTx),
      fcl.args([  
        fcl.arg(hash, types.String),
        fcl.arg("Meme NFT", types.String)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    console.log(hash);
    console.log(transactionId);

  }
  const view = async () => {
    const result = await fcl.send([
      fcl.script(viewNFTScript),
      fcl.args([
        fcl.arg(user.addr, types.Address)
      ])
    ]).then(fcl.decode);

    console.log(result);
    setScriptResult(result);
  }
  return (
    <div>
      {user && user.addr ? <h1>{user.addr}</h1> : null}

      <h1 className="text-yellow-600 text-2xl"> Hi MemeMint </h1>
      <button onClick={() => logIn()}> Log In </button>
      <button onClick={() => logOut()}>Log Out</button>
<div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={() => mint()}>Mint HolidayNFT</button>
      <button onClick={() => view()}>View HolidayNFT</button>
      
      </div>
      {scriptResult.length !== 0
          ? <div>
              <img src={`https://ipfs.infura.io/ipfs/${scriptResult[0]}`} />
              <h2>{scriptResult[1]}</h2>
            </div>
          : null
        }
   
    </div>
  );
}

export default Mint;
