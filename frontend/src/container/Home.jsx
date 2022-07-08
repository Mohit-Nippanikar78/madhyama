import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Pins from "./Pins";
import { Sidebar, UserProfile } from "../components";
import Logo from "../assets/logo.png";
import Login from "../components/Login";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { client } from "../client";
import { userQuery, fetchUser } from "../utils/data";
import { PinDetail, Comments,EditInfo } from "../components";
import Share from "../components/share";

const Home = ({ updateApp }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const [shareBox, setShareBox] = useState(false);
  const scrollRef = useRef(null);
  let navigate = useNavigate();

  useEffect(async () => {
    const userInfo = fetchUser();
    setUser(userInfo);

    scrollRef.current.scrollTo(0, 0);
  }, []);
  const updatingParent = (bol) => {
    setToggleSidebar(bol);
  };
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setShareBox(false);
    }
  }, []);

  return (
    <div className="flex bg-grey-50 md:flex-row flex-col h-screen">
      {shareBox && <Share setShareBox={setShareBox} />}
      <div className="hidden md:flex ">
        <Sidebar user={user && user} updatingParent={updatingParent} />
      </div>
      <div className="flex md:hidden w-full">
        <div className="flex flex-row justify-between p-2 w-full h-max shadow-md items-center">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => {
              setToggleSidebar(true);
            }}
          />
          <Link to="/">
            <img src={Logo} className="w-40" alt="logo" />
          </Link>
          <Link to={`/profile/${user?._id}`}>
            <img
              src={
                user
                  ? user.image
                  : "https://i.pinimg.com/170x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
              }
              className="w-16 rounded-full md:w-auto"
              alt="Profile Image"
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 h-screen overflow-y-auto animate-slide-in bg-pink-200 z-10">
            <div className="absolute w-max right-0 flex justify-end p-3">
              <AiFillCloseCircle
                fontSize={40}
                className="cursor-pointer z-20 "
                onClick={() => {
                  setToggleSidebar(false);
                }}
              />
            </div>
            <Sidebar user={user && user} updatingParent={updatingParent} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route
            path="pin-detail/:pinId"
            element={
              <PinDetail
                updateApp={updateApp}
                user={user && user}
                setShareBox={setShareBox}
              />
            }
          />
          <Route
            path="pin-detail/:pinId/comments"
            element={<Comments updateApp={updateApp} />}
          />
          <Route path="pindetail/:pinId" element={<Pindetail />} />
          <Route
            path="profile/:userId"
            element={<UserProfile user={user && user} />}
          />
          <Route
            path="profile/:userId/edit-info"
            element={<EditInfo user={user && user} />}
          />
          <Route
            path="/*"
            element={<Pins user={user && user} updateApp={updateApp} />}
          />
        </Routes>
      </div>
    </div>
  );
};
const Pindetail = () => {
  let { pinId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`pin-detail/:${pinId}`, { replace: true });
  }, []);

  return <></>;
};

export default Home;
