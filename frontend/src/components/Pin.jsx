import React, { useEffect, useState } from "react";
import { client, urlFor } from "../client";
import { useNavigate, Link } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { fetchUser, userQuery } from "../utils/data";
import { v4 as uuidv4 } from "uuid";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  let navigate = useNavigate();
  let user = fetchUser();

  useEffect(() => {console.log(pin, user); }, []);
  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };
  let alreadySaved = pin?.save?.filter(
    (item) => item?.userId === user?._id
  );
  console.log(alreadySaved)
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId:  user?._id,
            postedBy: {
              _type: "postedBy",
              _ref: pin?._id,
            },
          }
        ])
        .commit()
        .then(() => {
          
          console.log("Pin saved");
        });
    }
  };

  return (
    <div className="flex m-2 flex-col">
      <div
        className="relative cursor-pointer                       rounded-lg w-max "
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => {
          navigate(`/pin-detail/${pin._id}`);
        }}
      >
        <img src={urlFor(pin.image).width(250).url()} alt="" />
        {postHovered && (
          <div className=" absolute flex flex-col flex-1  w-full h-full top-0 r-0  flex items-center justify-between ">
            <div className="flex justify-between h-max w-full m-2">
              <div className="flex top-0 r-0 bg-white px-2 py-2 rounded-full">
                <a
                  href={`${pin.image.asset.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdDownloadForOffline className="rounded-lg" fontSize={20} />
                </a>
              </div>
              <div className="flex">
                {alreadySaved.length !== 0 ? (
                  <button className="p-2 bg-red-500 rounded-2xl text-white">
                    {pin?.save?.length} Saved
                  </button>
                ) : (
                  <button
                    className="p-2 py-0 bg-red-500 rounded-xl text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                       e.preventDefault()
                      savePin(pin._id);
                     
                    }}
                  >
                    {" "}
                    Save{" "}
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between w-full mb-3">
              {/* {pin && (
                <a
                  href={pin.destination}
                  rel="noreferrer"
                  target="_blank "
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {pin.destination.length > 20
                    ? pin.destination.slice(8, 20)
                    : pin.destination.slice(8)}
                </a>
              )} */}
              {pin?.postedBy._id === user?._id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(pin._id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
        <Link
          to={`/user-profile/${pin?.postedBy._id}`}
          className="flex gap-2 mt-2 items-center"
        >
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={pin?.postedBy.image}
            alt="user-profile"
          />
          <p className="font-semibold capitalize">{pin?.postedBy.userName}</p>
        </Link>
    </div>
  );
};

export default Pin;