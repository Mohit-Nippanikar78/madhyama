import React from "react";
import { MdOutlineError } from "react-icons/md";

const Error = ({ message }) => {
  return (
    <div class="p-2 fixed right-4 bottom-4 animate-slide-out">
      <div class="inline-flex items-center rounded-lg bg-pink-600 leading-nonerounded-full p-2 shadow text-teal text-sm">
        <MdOutlineError color="white" size={"25px"} />
        <span class="inline-flex px-2 text-white">{message}</span>
      </div>
    </div>
  );
};

export default Error;
