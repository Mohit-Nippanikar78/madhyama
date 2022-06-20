import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";
import { client } from "../client";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import Spinner from "./Spinner";
import MasonryLayout from "./MasonryLayout";

const UserProfile = ({ user }) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [togglePins, setTogglePins] = useState("created");
  const [Extras, setExtras] = useState(true);
  let { userId } = useParams();
  useEffect(() => {
    setLoading(true);
    let query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUserDetail(data[0]);
      console.log(data[0]);
      setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (togglePins == "created") {
      let query1 = userCreatedPinsQuery(userId);
      client.fetch(query1).then((data) => {
        console.log(data);
        setPins(data);
      });
    } else if (togglePins == "saved") {
      let query2 = userSavedPinsQuery(userId);
      client.fetch(query2).then((data) => {
        setPins(data);
      });
    }
  }, [togglePins]);

  if (loading) return <Spinner message="Loading Profile" />;
  return (
    <div>
      <div className="w-full relative">
        <div
          className={` cursor-pointer m-2 bg-white hover:bg-gray-100   font-medium rounded-full text-sm  flex items-center p-2.5 text-center  absolute `}
        >
          <div className="relative">
            <BsThreeDotsVertical size={20} />
            <button
              class="flex  mt-6 absolute w-max text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-800 rounded text-sm"
              onClick={() => {}}
            >
              Change BG
            </button>
          </div>
        </div>

        {userDetail._id == user._id && (
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
            className={`top-0 right-4 text-white m-2 bg-red-700 hover:bg-red-800   font-medium rounded-full text-sm px-5 flex items-center p-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 absolute `}
          >
            Log Out
          </button>
        )}

        <img
          src="https://wallpaperaccess.com/full/51364.jpg"
          className="w-full   shadow-md "
          style={{ maxHeight: "50vh" }}
          alt=""
        />
        <div className="flex  items-center flex-col relative -top-10">
          <img
            src={userDetail?.image}
            className="shadow-md rounded-full w-20  "
            alt=""
          />
          <h2 className="text-2xl my-2">{userDetail?.userName}</h2>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            setTogglePins("created");
          }}
          className={`text-white mx-2 bg-red-700 hover:bg-red-800  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700  ${
            togglePins == "created" && "ring-4 ring-red-300 ring-red-900"
          }`}
        >
          Created
        </button>
        {userDetail._id == user._id && (
          <button
            type="button"
            onClick={() => {
              setTogglePins("saved");
            }}
            className={`text-white mx-2 bg-red-700 hover:bg-red-800  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700  ${
              togglePins == "saved" && "ring-4 ring-red-300 ring-red-900"
            }`}
          >
            Saved
          </button>
        )}
      </div>
      {!pins || pins?.length == 0 ? (
        <div className="mt-10 text-center text-xl ">No Pins posted</div>
      ) : (
        <MasonryLayout pins={pins && pins} key={pins} />
      )}
    </div>
  );
};

export default UserProfile;
