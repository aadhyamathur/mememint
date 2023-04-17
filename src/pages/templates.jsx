import React, { useEffect, useState } from "react";
import axios from "axios";
import MemeTemplate from "../components/MemeTemplate";
import { getMemes } from "../services";

function Templates() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMemes = async () => {
    setLoading(true);
    const { data } = await getMemes();
    setMemes(data?.memes);
    setLoading(false);
  };

  useEffect(() => {
    fetchMemes();
    console.log(memes);
  }, []);
  return (
    <>
      <h1 className="text-center text-2xl font-semibold text-gray-800 mt-5 mb-4">
        Select a Template
      </h1>
      <div className="">
        {loading ? (
          <h1>loading</h1>
        ) : (
          <div className="grid grid-cols-3 place-items-center">
            {memes?.map((meme) => (
              <MemeTemplate {...meme} key={meme.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Templates;
