import React from "react";
import { IoMdSearch, IoMdAdd } from "react-icons/io";

import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  let navigate = useNavigate();
  if (user)
    return (
      <div className="flex items-center w-full ">
        <div className="flex justify-start items-center focus-within:shadow-md m-4 w-full bg">
          <IoMdSearch fontSize={20} className="mx-2"  />

          <input
            type="text" 
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
            className="p-2 w-full outline-0"
            onFocus={()=>{navigate("/search")}}
          />
          
        </div>
        <div className="flex items-center">
          <Link to={`/profile/${user._id}`} className=" mx-2 w-14 hidden md:block">
            <img src={user.image} alt="profile"  className="rounded-full"/>
          </Link>
          <Link to="/create-pin" className="mx-2 bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAdd fontSize={26} />
          </Link>
        </div>
      </div>

    );
  return null;
};

export default Navbar;
