import React from "react";

function MemeTemplate(props) {
  return (
    <div className="border border-b-[2px]  border-main m-3 rounded-lg w-fit bg-yellow-50 text-gray-600 cursor-pointer">
      <img
        className="h-[300px] rounded-lg rounded-b-0 border-b-[2px] border-main"
        src={props.url}
        alt={props.name}
      />
      <h1 className="text-center p-2  font-bold">{props.name}</h1>
    </div>
  );
}

export default MemeTemplate;
