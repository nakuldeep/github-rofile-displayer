import React from "react";

function Card(props) {
    
  return (
    <div className="h-20 w-[40vw] rounded-2xl border-1 border-gray-300 bg-gray-100 flex justify-center items-center md:w-50">
      <div>
        <p className="font-bold text-center">{props.no}</p>
        <p className="font-extralight  text-gray-700">{props.data }</p>
      </div>
    </div>
  );
}

export default Card;
