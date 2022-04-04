import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../client";
import { pinDetailComments } from "../utils/data";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineReportGmailerrorred,
} from "react-icons/md";
import Spinner from "./Spinner";
import "../App.css";
import AddComment from "../Elements/AddComment";

const Comments = () => {
  let navigate = useNavigate();
  let { pinId } = useParams();

  const [comments, setComments] = useState(null);
  const fetchComments = () => {
    let query = pinDetailComments(pinId);
    if (query) {
      client.fetch(query).then((data) => {
        setComments(data[0].comments);
        console.log(data[0].comments);
      });
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <div>
        <div className="sticky text-lg flex items-center justify-center w-full bg-red-500 py-2 font-bold  comments-main-header w-full md:justify-start ">
          <MdOutlineArrowBackIosNew
            className="cursor-pointer m-0.5"
            onClick={() => {
              navigate(`/pin-detail/${pinId}`);
            }}
          />
          Comments
        </div>
        {comments ? (
          <div className="pt-4">
            {comments.length == 0 ? (
              <div className="mt-10 text-center text-xl ">No Comments </div>
            ) : (
              <div>
                {comments.map((comment, i) => {
                  return <CommentItem comment={comment} key={i} />;
                })}
              </div>
            )}
          </div>
        ) : (
          <Spinner message="Fetching Comments" />
        )}
      </div>
      <div className="sticky bottom-0  py-2 flex">
        <AddComment pinId={pinId} />
        <MdOutlineReportGmailerrorred size={30} className="m-auto mx-2" />
      </div>{" "}
    </>
  );
};
const CommentItem = ({ comment }) => {
  const [mini, setMini] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    console.log(comment);
    comment.comment.length > 70 && setMini(true);
  }, []);

  return (
    <div className="bg-white  rounded-lg  flex  justify-center items-center md:items-start  mb-4">
      <img
        alt="avatar"
        className="rounded-full w-8 h-8 mr-2 shadow-lg cursor-pointer"
        src={comment.postedBy.image}
        onClick={() => {
          navigate(`/profile/${comment.postedBy._id}`);
        }}
      />

      <div
        style={{ width: " 90%" }}
        className="text-gray-600 text-sm text-center md:text-left "
      >
        <h3
          className="text-purple-600 font-semibold text-md text-center md:text-left cursor-pointer "
          onClick={() => {
            navigate(`/profile/${comment.postedBy._id}`);
          }}
        >
          {comment.postedBy.userName}
        </h3>
        {mini ? (
          <div>
            {comment.comment.slice(0, 70)}
            <p
              onClick={() => {
                setMini(false);
              }}
              className="cursor-pointer inline"
            >
              ...
            </p>
          </div>
        ) : (
          <>{comment.comment}</>
        )}
      </div>
    </div>
  );
};

export default Comments;
