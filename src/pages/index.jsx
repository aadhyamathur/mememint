import React from "react";
import { Link, Route } from "wouter";

function index() {
  return (
    <>
      <div className="mt-[40px] sm:mt-[100px] justify-center items-center  flex-col">
        <h3 className="justify-center items-center flex text-xl my-3 ">
          Create and Mint memes
          <img src="./speaker.svg" alt="speaker" className="h-7 mx-2" />
        </h3>
        <h1 className="text-[45px] font-bold text-center">
          Get<span className="text-main"> ownership </span>
          for your <br />
          <span className="text-main"> creativity</span> and{" "}
          <span className="text-main"> imagination</span>
        </h1>
        <h2 className=" text-[18px]  mx-auto text-center my-4">
          {/* <span className="text-main text-semibold">built on Lens</span>{" "}
          Decentralized social graph.
          <br /> Allow your users to utilize a user-owned social graph and
          engage with your content. */}
        </h2>
        <Link href={"/templates"}>
          <button className="m-6 mt-15 bg-main text-[#FEFFFE] border-0 px-5 py-3 rounded-md flex items-center mx-auto">
            {/* <img src="./chat.svg" alt="comments" className="mx-1 h-5" /> */}
            <span className="font-black text-2xl mx-2">+</span>
            Create Meme
          </button>
        </Link>
      </div>

      {/* <img
        src="./demo1.png"
        alt="demo"
        className="w-[90vw] sm:w-[50%] rounded-lg  border-2 border-dashed mx-auto border-main my-20 mb-30"
      />
      <a href="https://www.lens.xyz" target="_blank" rel="noreferrer">
        <div className="cursor-pointer mx-auto my-10 flex text-2xl bg-[#AAFE2C] text-[#01501E] justify-center items-center w-fit p-3 py-3 rounded-md">
          <img src="./lens.svg" alt="lens" className="mx-3" />
          Built on Lens Protocol{" "}
        </div>
      </a> */}
    </>
  );
}

export default index;
