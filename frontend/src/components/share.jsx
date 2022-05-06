import React, { useState } from "react";
import { AiFillCopy, AiOutlineCopy } from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";
import { AiOutlineWhatsApp, AiFillTwitterCircle } from "react-icons/ai";
import { RiFacebookCircleLine } from "react-icons/ri";
import OutsideClickHandler from "react-outside-click-handler";
import { MdOutlineCancel } from "react-icons/md";

const Share = ({ setShareBox }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className="flex items-center justify-center text-white  fixed w-screen h-screen z-1000  "
      style={{ backgroundColor: "rgba(0,0,0,.5)" }}
      onClick={() => {
        console.log("body");
      }}
      
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          setShareBox(false);
        }}
      >
        <div
          className="   p-2  bg-main-color rounded-lg relative  "
          onClick={() => {
            console.log("con");
          }}
        >
          <div className="flex flex-col absolute" style={{ left: "-2rem" }}>
            <MdOutlineCancel size={30} onClick={()=>{setShareBox(false)}} />
            Esc
          </div>
          <div className="flex " style={{ borderBottom: "1px white solid" }}>
            <h3 className="text-md font-sans p-2">{window.location.href}</h3>
            <div className="p-2">
              {copied ? (
                <AiFillCopy size={25} />
              ) : (
                <AiOutlineCopy
                  size={25}
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3 className="m-2 text-lg">Share</h3>
              {copied && (
                <button
                  className=" bg-green-500 delay-75 duration-100 text-white text-sm px-2
              rounded-2xl  border-b-4 mx-2 border-b-green-600 h-max cursor-none m-auto"
                >
                  Copied
                </button>
              )}
            </div>

            <div className="flex">
              <div className="flex text-neutral-300 hover:text-white cursor-pointer w-max p-2 flex-col items-center">
                <BsCodeSlash size={30} />
                Code
              </div>
              <div className="flex text-neutral-300 hover:text-white w-max p-2  cursor-pointer flex-col items-center">
                <AiOutlineWhatsApp size={30} />
                Whatapp
              </div>
              <div className="flex text-neutral-300 hover:text-white w-max p-2  cursor-pointer flex-col items-center">
                <RiFacebookCircleLine size={30} />
                Facebook
              </div>
              <div className="flex text-neutral-300 hover:text-white w-max p-2  cursor-pointer flex-col items-center">
                <AiFillTwitterCircle size={30} />
                Twitter
              </div>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Share;
