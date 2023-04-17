import React from "react";

function Nav() {
  return (
    <div className="top-0 flex border-0 border-b-[1px] border-[#E4E7EB] justify-around h-[80px]">
      <a href={"/"}>
        <div className="flex mx-2  relative justify-center items-center h-full">
          {/* <img src="./logo.svg" alt="Buzz" /> */}
          <span>😎</span>
          <h1 className="text-[#202021] text-2xl font-semibold pb-2 ">
            memeMaker
          </h1>
          <div className="border  border-gray-400 text-gray-600 rounded-md h-fit text-xs p-2 py-[1px]  absolute top-2 -right-12">
            beta
          </div>
        </div>
      </a>
      <div className="flex items-center">
        <a href={"/docs"}>
          <h2 className="mx-3">Docs</h2>
        </a>
        <h2 className="mx-3">SDK</h2>
        <a href={"/register"}>
          <button className="hidden sm:flex m-5 bg-main text-[#FEFFFE] border-0 px-3 py-2 rounded-md  items-center">
            <img src="./chat.svg" alt="comments" className="mx-1 h-5" /> Add
            Buzz to your site
          </button>
        </a>
      </div>
    </div>
  );
}

export default Nav;
