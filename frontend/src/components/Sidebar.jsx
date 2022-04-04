import React, { useEffect, useRef, useState } from "react";
import { Link, Routes, Route, NavLink } from "react-router-dom";
import Logo from "../assets/logowhite.png";
import { AiFillHome } from "react-icons/ai";
import { categories } from "../utils/data";
import "./css/Sidebar.css";

const Sidebar = ({ user, updatingParent }) => {
  let isNotActiveStyle =
    "flex items-center px-5 bg-white text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize ";
  let isActiveStyle = "";
  const headref = useRef(null);
  const [midSidebarTop, setMidSidebarTop] = useState(80);
  const [sidebarHeadShadow, setSidebarHeadShadow] = useState(false);
  const [sidebarBottomShadow, setSidebarBottomShadow] = useState(true);
  const [sidebarMidHover, setSidebarMidHover] = useState(false);
  useEffect(() => {
    window.screen.width >= 768 && setSidebarMidHover(false);
    setMidSidebarTop(headref.current.offsetHeight);
  }, [headref]);
  useEffect(() => {
    window.screen.width <= 768 && setSidebarMidHover(true);
  }, [sidebarMidHover]);

  return (
    <div className="sidebar" id="sidebar">
      <div
        className={
          sidebarHeadShadow
            ? "sidebar-start shadow-md w-full z-10  "
            : "sidebar-start w-full z-10"
        }
        style={{
          borderBottom: sidebarHeadShadow
            ? "solid 1px white"
            : "solid 1px var(--brand-purple)",
        }}
        ref={headref}
      >
        <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190  items-center">
          <img src={Logo} alt="logo" className="w-150 sm:w-full  " />
        </Link>
      </div>
      <div
        onMouseEnter={() => {
          setSidebarMidHover(true);
        }}
        onMouseLeave={() => {
          setSidebarMidHover(false);
        }}
        onScroll={(e) => {
          e.target.scrollTop > 10
            ? setSidebarHeadShadow(true)
            : setSidebarHeadShadow(false);
          e.target.scrollHeight - e.target.offsetHeight ==
          Math.floor(e.target.scrollTop)
            ? setSidebarBottomShadow(false)
            : setSidebarBottomShadow(true);
        }}
        className="sidebar-mid overflow-y-auto md:overflow-y-hidden "
        style={{
          top: `${midSidebarTop}px`,
          overflowY: sidebarMidHover ? "scroll" : "hidden",
        }}
      >
        <ul>
          <li className="sidebar-links " style={{ top: "80px" }}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "sidebar-a-active" : "")}
              onClick={() => {
                updatingParent(false);
              }}
            >
              <AiFillHome className="my-2 mx-4" fontSize={20} />
              <h2 className="flex items-center ">Home</h2>
            </NavLink>
          </li>
          {categories.map((item, index) => {
            return (
              <li className="sidebar-links" key={index}>
                <NavLink
                  to={`/category/${item.name}`}
                  className={({ isActive }) =>
                    isActive ? "sidebar-a-active " : ""
                  }
                  onClick={() => {
                    updatingParent(false);
                  }}
                >
                  <img
                    src={item.image}
                    className="w-10 h-10 rounded-full mx-2"
                    alt=""
                  />
                  <h2 className="capitalize flex items-center mx-2 text-sm">
                    {item.name}
                  </h2>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Link
        to={`profile/${user?._id}`}
        className="sidebar-end  w-full bg-pink flex items-center justify-around p-2 "
        style={{
          boxShadow: sidebarBottomShadow && " rgb(0 0 0) 0px 2px 9px",
          borderTop: sidebarBottomShadow && "1px solid white",
        }}
      >
        <img src={user?.image} className="w-14 rounded-full" alt="" />
        <h2>{user?.userName}</h2>
      </Link>
    </div>
  );
};

export default Sidebar;
