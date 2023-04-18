import React, { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { getMemes, editMeme } from "../../services";
import { v4 as uuidv4 } from "uuid";
import { mintNFTTx, viewNFTScript } from "../../cadence/code";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { create } from "ipfs-http-client";
import {toast} from 'react-hot-toast';

import { Buffer } from "buffer";
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


function Id(props) {
  const [match, params] = useRoute("/meme/:id");
  const [meme, setMeme] = useState();
  const [file, setFile] = useState();
  const [imgSrc, setImgSrc] = useState();
  const [user, setUser] = useState();
  const [hashData, setHashData] = useState(null);
  const [transactionData, setTransactionData] = useState(null);

  const mint = async () => {
    console.log('minting...')
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
    setHashData(hash)
    setTransactionData(transactionId)
    toast.success('NFT Minted',
    {
      icon: '🚀',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    })

  }
  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);
  const logIn = () => {
    fcl.authenticate();
  };
  const logOut = () => {
    fcl.unauthenticate();
  };


  const fetchMemes = async () => {
    const { data } = await getMemes();
    const memes = data?.memes;
    const res = memes.filter((meme) => meme.id === params.id);
    setMeme(res[0]);
    setImgSrc();
 
  };
 
  useEffect(() => {
    fetchMemes();
  }, []);
  const [texts, setTexts] = useState([
    { id: uuidv4(), text: "", color: "fffff" },
  ]);
  //   const inputHandle = (text, val) => {
  //     const index = texts.findIndex((item) => item.id === text.id);
  //     if (index !== -1) {
  //       const newItems = [...texts];
  //       newItems[index] = { ...newItems[index], text: val };
  //       setTexts(newItems);
  //     }
  //   };
  //   const deleteText = (text) => {
  //     console.log(text.id);
  //     const filter = texts.filter((item) => item.id !== text.id);
  //     setTexts(filter);
  //   };

  const submit = async (e) => {
    e?.preventDefault();
    const data = await editMeme(
      params.id,
      e?.target.elements.top.value,
      e?.target.elements.bottom.value
    );
    setImgSrc(data);
    const imageUrl = data;

fetch(imageUrl)
  .then(response => response.blob())
  .then(blob => {
    const fileblob = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    
    // Do something with the file, e.g. upload it to a server
    setFile(fileblob);
  });
  };

  useEffect(()=>{
    console.log({file})
  },[file])
  
  
  return (
    <div className="m-2">
      <h1 className="text-xl text-gray-700 font-bold m-2 text-center mb-2">
        {meme?.name}
      </h1>
      <div className="flex justify-around gap-5">
        <div className="relative bg-white w-fit">
          <div className="absolute"></div>
          <img src={imgSrc} alt={meme?.name} className="w-[700px]" />
        </div>
        <form className="mt-3" onSubmit={(e) => submit(e)}>
          <h1>Top Text</h1>
          <input
            type="text"
            id="top"
            className="p-1 border px-2 w-full rounded "
          />
          <h1 className="mt-3">Bottom Text</h1>
          <input
            type="text"
            id="bottom"
            className="p-1 border px-2 w-full rounded"
          />
          <button
            className="bg-main text-white rounded  font-bold  w-full p-1 mt-2"
            type="submit"
          >
            Create Meme
          </button>
          {user && user.addr ?      <button className=" bg-main text-white mt-5 font-bold rounded  w-full p-1 " onClick={() => logOut()}>Log Out</button> :        <button className=" bg-main text-white mt-5 font-bold rounded  w-full p-1 " onClick={() => logIn()}> Log In </button>}
          {user && user.addr ? <h1 className="text-main mt-1 text-center">{user.addr}</h1> : null}
          <button
            onClick={() => mint()}
            className=" bg-main text-white mt-5 font-bold rounded  w-full p-1 "
          >
            💎 Mint Meme
          </button>
          
          {
            transactionData && <h1 className="m-1">Transction Id : {transactionData}</h1>
           }{ hashData && <h1 className="m-1">Hash : {hashData}</h1>
          }
        </form>

        {/* logic for multiple texts */}
        {/* <div className="grid grid-cols-1 gap-5 h-fit ">
          {texts.map((text) => {
            return (
              <div className="flex">
                <input
                  className="p-2 bg-white rounded border border-gray-400"
                  onChange={(e) => inputHandle(text, e.target.value)}
                />
                <div
                  className="text-red-400 font-semibold mx-2 -my-3 "
                  onClick={() => deleteText(text)}
                >
                  ❌
                </div>
              </div>
            );
          })}
          <button
            className="bg-main text-white rounded  w-full p-1"
            onClick={() =>
              setTexts([...texts, { id: uuidv4(), text: "", color: "fffff" }])
            }
          >
            Add Text
          </button> */}
        {/* <button
            className="bg-main text-white rounded  w-full p-1 mt-2"
            onClick={() => submit()}
          >
            Submit
          </button> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Id;
