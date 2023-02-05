import React from "react";
import { FaCar } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
const SuperScript = () => {
  return (
    <div className="flex gap-7 py-1 items-center ">
      <span>
        <svg height="20" viewBox="0 0 36.289 20.768" className="">
          <path d="M18.9 20.77V0h4.93v20.77zM0 10.39a8.56 8.56 0 1 1 8.56 8.56A8.56 8.56 0 0 1 0 10.4zm5.97-.01a2.6 2.6 0 1 0 2.6-2.6 2.6 2.6 0 0 0-2.6 2.6zm27 5.2l-1.88-1.87-1.87 1.88H25.9V12.3l1.9-1.9-1.9-1.89V5.18h3.27l1.92 1.92 1.93-1.92h3.27v3.33l-1.9 1.9 1.9 1.9v3.27z"></path>
        </svg>
      </span>

      <div className="flex items-center gap-2 hover:text-[#3A77FF] hover:cursor-pointer ">
        <div className="h-10 w-10 flex items-center justify-center rounded-full shadow-inner">
          <FaCar />
        </div>
        <div className="text-xs">MOTORS</div>
      </div>
      <div className="flex items-center gap-2 hover:text-[#3A77FF] hover:cursor-pointer">
        <div className="h-10 w-10 flex items-center justify-center rounded-full shadow-inner">
          <BsBuilding />
        </div>
        <div className="text-xs">PROPERTY</div>
      </div>
    </div>
  );
};

export default SuperScript;
