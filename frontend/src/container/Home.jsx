import React, { useEffect, useRef, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Pins from "./Pins";
import { Sidebar, UserProfile } from "../components";
import Logo from "../assets/logo.png";
import Login from "../components/Login";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { client } from "../client";
import { userQuery ,fetchUser} from "../utils/data";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  let navigate = useNavigate();

  useEffect(async () => {
    const userInfo = fetchUser();
    setUser(userInfo)

    
  
  }, []);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-grey-50 md:flex-row flex-col h-screen">
      <div className="hidden md:flex hide-scrollbar">
        <Sidebar user={user && user} toggleSidebar={setToggleSidebar} />
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
            <img src={Logo} alt="logo" />
          </Link>
          <Link to={`profile/${user?._id}`}>
            <img src={user?.image} alt="Profile Image" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 h-screen overflow-y-auto animate-slide-in bg-pink-200 z-10">
            <div className="absolute w-full flex justify-end p-3">
              <AiFillCloseCircle
                fontSize={40}
                className="cursor-pointer "
                onClick={() => {
                  setToggleSidebar(false);
                }}
              />
            </div>
            <Sidebar user={user && user} toggleSidebar={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
