import React from "react";
import { Link, Routes, Route, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AiFillHome } from "react-icons/ai";

const Sidebar = ({ toggleSidebar, user }) => {
  let isNotActiveStyle =
    "flex items-center px-5 bg-white text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize ";
  let isActiveStyle = "";

  const categories = ["Animals", "Food", "PhotoGraphy", "Gaming", "Coding"];

  return (
    <div className="flex flex-col justify-between h-full  min-w-210 hide-scrollbar ">
      <div className="flex flex-1 flex-col hide-scrollbar justify-between border-solid border-r-2 border-black">
        <div>
          <Link
            to="/"
            className="cursor-pointer px-5 pt-1 my-2 w-190 gap-2 flex items-center"
            onClick={() => {
              toggleSidebar(false);
            }}
          >
            <img src={Logo} className="w-full" alt="logo" />
          </Link>
          <div className="flex  flex-col">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={() => {
                toggleSidebar(false);
              }}
              >
              <AiFillHome /> Home
            </NavLink>
            {categories.map((category, index) => {
              return (
                <NavLink
                  key={index}
                  to={`category/${category}`}
                  className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={() => {
                  toggleSidebar(false);
                }}
                >
                  {category}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div>
          {user && (
            <Link to={`profile/${user._id}`} className="flex items-center ">
              <img
                src={user.image}
                className="w-14 rounded-full mx-2"
                alt="profile-image"
              />
              <p>{user.userName}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
