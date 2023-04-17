import React, { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { getMemes, editMeme } from "../../services";
import { v4 as uuidv4 } from "uuid";
import { param } from "@onflow/fcl";

function Id() {
  const [match, params] = useRoute("/meme/:id");
  const [meme, setMeme] = useState();
  const [imgSrc, setImgSrc] = useState();
  const fetchMemes = async () => {
    const { data } = await getMemes();
    const memes = data?.memes;
    const res = memes.filter((meme) => meme.id === params.id);
    setMeme(res[0]);
    setImgSrc(res[0].url);
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
  };
  return (
    <div className="m-2">
      <h1 className="text-xl text-gray-700 font-bold m-2 text-center mb-2">
        {meme?.name}
      </h1>
      <div className="flex justify-around">
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
          <button className=" bg-main text-white mt-5 font-bold rounded  w-full p-1 ">
            💎 Mint Meme
          </button>
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
