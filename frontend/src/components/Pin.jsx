import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../client";
import { useNavigate, Link } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { fetchUser, userQuery } from "../utils/data";
import { v4 as uuidv4 } from "uuid";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import HoverVideoPlayer from "react-hover-video-player";

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [user, setUser] = useState(null);
  let navigate = useNavigate();
  let { userId } = useParams();
  useEffect(async () => {
    let userSt = fetchUser(userId);

    await setUser(userSt);
  }, []);

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="flex m-2 mt-4 flex-col ">
      <div
        className="relative cursor-pointer                     "
        onClick={() => {
          navigate(`/pin-detail/${pin._id}`);
        }}
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
      >
        {pin?.image ? (
          <img
            src={urlFor(pin.image).width(250).url()}
            alt=""
            className="rounded-lg"
          />
        ) : (
          <HoverVideoPlayer
            videoSrc={pin.videourl}
            pausedOverlay={
              <img
                src="https://www.thebalancesmb.com/thmb/6gflK8z4FzPq6JwDNWIGJzlA9w8=/4086x2298/smart/filters:no_upscale()/no-cost-online-business-58a6434c3df78c345bae15ae.jpg"
                alt=""
                style={{
                  // Make the image expand to cover the video's dimensions
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            }
            loadingOverlay={
              <div className="loading-overlay">
                <div className="loading-spinner" />
              </div>
            }
          />
        )}

        {postHovered && !pin.videourl && (
          <div className=" absolute flex flex-col flex-1  w-full h-full top-0 r-0  flex items-center justify-between ">
            <div className="flex justify-between h-max w-full m-2">
              <div className="bg-white p-1 rounded-full  flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none">
                {pin?.image && (
                  <a
                    href={`${pin.image.asset.url}?dl=`}
                    download
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MdDownloadForOffline
                      className="rounded-lg"
                      fontSize={20}
                    />
                  </a>
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
                  className="bg-white p-1 group rounded-full  flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                > 
                      <div className="absolute left-8 scale-0 group-hover:scale-100 transition-all duration-100 origin-left bg-black text-white bg-opacity-100">
                        Delete Post 
                      </div>
                  <AiTwotoneDelete fontSize={20} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`profile/${pin?.postedBy._id}`}
        className="flex gap-2 mt-2 items-center "
      >
        {pin && (
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={
              pin
                ? pin.postedBy.image
                : "https://i.pinimg.com/170x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
            }
            alt="user-profile"
          />
        )}
        <p className="font-semibold capitalize">{pin?.postedBy.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
