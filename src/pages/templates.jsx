import _ from "lodash";
import React, { useEffect, useState } from "react";
import MemeTemplate from "../components/MemeTemplate";
import { getMemes } from "../services";
import { levenshteinDistance } from "../utils";
import { all } from "axios";

function fuzzySearch(searchString, array) {
  return _.filter(array, (obj) => {
    const text = obj.name.toLowerCase();
    const search = searchString.toLowerCase();

    const distance = levenshteinDistance(search, text);
    const threshold = Math.floor(search.length * 0.25);
    if (distance <= threshold) {
      return true;
    }
    if (text.includes(search)) {
      return true;
    }

    const pattern = `.*${search.split("").join(".*")}.*`;

    if (text.match(new RegExp(pattern))) {
      return true;
    }

    return false;
  });
}

function Templates() {
  const [allMemes, setAllMemes] = useState([]);
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const fetchMemes = async () => {
    setLoading(true);
    const { data } = await getMemes();
    setAllMemes(data?.memes);
    setMemes(data?.memes);
    setLoading(false);
  };

  useEffect(() => {
    fetchMemes();
    console.log(memes);
  }, []);
  const filterMemes = (string) => {
    setSearch(search);
    const newMemes = fuzzySearch(string, memes);
    return setMemes(newMemes);
  };

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-center text-2xl font-semibold text-gray-800 mt-5 mb-4">
        Select a Template
      </h1>
      <input
        type="text"
        onChange={(e) => filterMemes(e.target.value)}
        placeholder="Search Templates"
        className="rounded-full border-[1px] border-main bg-gray-100 w-1/2 p-2 mb-3"
      />
      <div className="">
        {loading ? (
          <h1>loading</h1>
        ) : (
          <div className="grid grid-cols-1  lg:grid-cols-3 place-items-center">
            <div className=" flex flex-col w-[300px] h-[340px] bg-yellow-50 border border-main rounded-lg border-b-[2px]  items-center justify-center font-semibold">
              <p className="text-[40px] text-gray-700 cursor-pointer">
                {" "}
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
              </p>
              <h1 className="text-xl text-gray-700">Upload your own file</h1>
            </div>
            {memes?.map((meme) => (
              <MemeTemplate {...meme} key={meme.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Templates;
