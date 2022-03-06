import React, { useEffect, useState } from "react";


import { searchQuery } from "../utils/data";
import { client } from "../client";
import Spinner from "../components/Spinner";
import MasonryLayout from "../components/MasonryLayout";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTermEmpty, setSearchTermEmpty] = useState(false);
  useEffect(() => {
    if (searchTerm !== "") {
      setSearchTermEmpty(false)
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }else{
      setSearchTermEmpty(true)
      
    }
  }, []);

  return (
    <>
      {loading && <Spinner message="We are getting you Pins" />}
      {searchTermEmpty && <div className="mt-10 text-center text-lg ">Enter Something to Search</div>}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </>
  );
};

export default Search;
