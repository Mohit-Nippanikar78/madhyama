import React, { useState } from "react";
import { Feed, Navbar, Search, PinDetail, CreatePin } from "../components";
import { Link, Routes, Route } from "react-router-dom";

const Pins = ({ user,updateApp }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="bg-gray-50 ">
      <div className=" border-solid border-black bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
        />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="category/:categoryId" element={<Feed />} />
         
          <Route
            path="create-pin"
            element={<CreatePin user={user && user} />}
          />
          <Route
            path="search"
            element={
              <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                key={searchTerm}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
