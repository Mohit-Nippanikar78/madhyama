import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true);
    let query;
    if (categoryId) {
      query = searchQuery(categoryId);
    } else {
      query = feedQuery;
    }
    client.fetch(query).then((data) => {
      setPins(data);
      console.log(data);
      setLoading(false);
    });
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding new Feeds to your feed!" />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
