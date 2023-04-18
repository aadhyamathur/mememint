import React from "react";
import { Link, Route } from "wouter";

function Nav() {
  return (
    <div className="top-0 flex border-0 border-b-[1px] border-[#E4E7EB] justify-around h-[80px]">
      <Link href={"/"}>
        <div className="flex mx-2  relative justify-center items-center h-full">
          {/* <img src="./logo.svg" alt="Buzz" /> */}
          <span className="text-2xl">😎</span>
          <h1 className="text-[#202021] text-2xl font-semibold pb-2 ">
            MemeMaker
          </h1>
          <div className="border  border-gray-400 text-gray-600 rounded-md h-fit text-xs p-2 py-[1px]  absolute top-2 -right-12">
            beta
          </div>
        </div>
      </Link>
      <div className="flex items-center">
        <Link href={"/templates"}>
          <button className="hidden sm:flex m-5 bg-main text-[#FEFFFE] border-0 px-3 py-2 rounded-md  items-center">
            <span className="font-black text-2xl mx-2">+</span> Create meme
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
