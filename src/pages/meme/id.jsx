import React, { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { getMemes } from "../../services";

function Id() {
  const [match, params] = useRoute("/meme/:id");
  const [meme, setMeme] = useState();
  const fetchMemes = async () => {
    const { data } = await getMemes();
    const memes = data?.memes;
    const res = memes.filter((meme) => meme.id === params.id);
    setMeme(res[0]);
  };
  useEffect(() => {
    fetchMemes();
  }, []);
  return (
    <div className="m-2">
      <h1 className="text-xl text-gray-700">{meme?.name}</h1>
    </div>
  );
}

export default Id;
