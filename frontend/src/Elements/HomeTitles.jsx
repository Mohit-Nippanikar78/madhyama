import React from "react";

const HomeTitles = () => {
  return (
   
      <div className="sticky text-lg flex items-center md:justify-center w-full bg-red-500 py-2 font-bold  comments-main-header w-full md:justify-start ">
        <MdOutlineArrowBackIosNew
          className="cursor-pointer mx-2"
          onClick={() => {
            navigate(`/pin-detail/${pinId}`);
          }}
        />
        <div className="w-full m-auto flex justify-center md:block md:w-auto">
          Comments
        </div>
      </div>

  );
};

export default HomeTitles;
