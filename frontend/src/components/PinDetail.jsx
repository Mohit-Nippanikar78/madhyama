import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { pinDetailQuery } from "../utils/data";
import { urlFor } from "../client";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pinDetail, setPinDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  let { pinId } = useParams();
  const fetchPinDetail = async () => {
    await setLoading(true);

    let query = await pinDetailQuery(pinId);
    await client.fetch(query).then((data) => {
      setPinDetail(data[0]);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchPinDetail();
  }, []);
  if (loading) {
    return <Spinner message="Getting Pin" />;
  }
  return (
    <div className="h-full bg-white m-4 p-2 flex justify-center rounded-lg ">
      <div className="flex items-center w-1/2 h-1/2 ">
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          alt=""
          className="rounded-lg  m-auto "
          style={{ maxHeight: "500px" }}
        />
      </div>
      <div className="w-1/2 ml-2  ">
        <div
          className="w-full grid place-items-center "
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >
          <div
            className="content-none top-1/2 bg-black w-full left-0 block "
            style={{ height: "2px" }}
          ></div>
          <div className="flex items-center justify-center mx-2 ">
            <img
              src={pinDetail?.postedBy.image}
              alt=""
              className="w-10 rounded-full"
            />
            <h2 className="ml-2 font-bold">{pinDetail?.postedBy.userName}</h2>
          </div>
          <div
            className="content-none top-1/2 bg-black w-full left-0 block"
            style={{ height: "2px" }}
          ></div>
        </div>

        <h2 className="text-lg">{pinDetail?.title}</h2>
        <h3 className="text-sm">{pinDetail?.about } </h3>
      </div>
    </div>
  );
};

export default PinDetail;
