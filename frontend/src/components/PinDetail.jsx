import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../client";
import { fetchUser, pinDetailQuery } from "../utils/data";
import { urlFor } from "../client";
import Spinner from "./Spinner";
import "./css/PinDetail.css";
import Error from "./Error";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { BsFillBookmarkFill } from "react-icons/bs";
import AddComment from "../Elements/AddComment";
import CommentBox from "./CommentBox";
import { useNavigate } from "react-router-dom";

const PinDetail = ({ user, setShareBox }) => {
  let { pinId } = useParams();
  const [pinLiked, setPinLiked] = useState(false);
  const [pinDetails, setPinDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [error, setError] = useState([false, ""]);
  const [likedKey, setLikedKey] = useState(0);
  const [likesCounts, setLikesCounts] = useState(0);
  let navigate = useNavigate();

  const fetchPinDetails = () => {
    setLoading(true);
    let ComUser = fetchUser();
    let query = pinDetailQuery(pinId, ComUser._id);
    if (query) {
      client
        .fetch(query)

        .then((data) => {
          setPinDetails(data[0]);
          setLikesCounts(data[0].likesCount);
          console.log(data[0]);
        });
    }
  };
  useEffect(() => {
    fetchPinDetails();
  }, []);

  useEffect(() => {
    if (pinDetails) {
      let savedPins = pinDetails?.save?.filter(
        (item) => item?.userId === user?._id
      );
      savedPins = savedPins?.length > 0 ? true : false;
      setAlreadySaved(savedPins);

      if (pinDetails.likes.length == 1) {
        setLikedKey(pinDetails.likes[0]._key);
        setPinLiked(true);
      }

      setLoading(false);
    }
  }, [pinDetails]);

  // const addComment = () => {
  //   if (comment) {
  //     setAddingComment(true);
  //     client
  //       .patch(pinId)
  //       .setIfMissing({ comments: [] })
  //       .insert("after", "comments[-1]", [
  //         {
  //           comment,
  //           _key: uuidv4(),
  //           postedBy: { _type: "postedBy", _ref: user._id },
  //         },
  //       ])
  //       .commit()
  //       .then(() => {
  //         fetchPinDetails();
  //         setComment("");
  //         setAddingComment(false);
  //       });
  //   }
  // };
  const savePin = (id) => {
    client
      .patch(id)
      .setIfMissing({ save: [] })
      .insert("after", "save[-1]", [
        {
          _key: uuidv4(),
          userId: user?._id,
          postedBy: {
            _type: "postedBy",
            _ref: pinDetails?._id,
          },
        },
      ])
      .commit()
      .then(() => {
        setAlreadySaved(true);
      });
  };

  if (loading) {
    return <Spinner message="Getting Pin" />;
  }
  return (
    <>
      <div className=" bg-white  m-4 md:p-2 p-0 flex-col md:flex-row flex justify-center rounded-lg pin-detail">
        <div className="flex items-center w-full md:w-1/2   ">
          {pinDetails?.image ? (
            <img
              src={pinDetails?.image && urlFor(pinDetails.image).url()}
              alt=""
              className="rounded-lg  m-auto   "
              style={{ maxHeight: "500px" }}
            />
          ) : (
            <div className="flex justify-center items-center w-full">
              <video
                src={pinDetails?.videourl}
                controls
                width={window.innerHeight / 2}
              ></video>
            </div>
          )}
        </div>
        <div className="w-full flex justify-between flex-col md:w-1/2 my-2 md:my-2 md:ml-2  ">
          <div
            className="w-full grid place-items-center "
            style={{ gridTemplateColumns: "1fr auto 1fr" }}
          >
            <div
              className="content-none top-1/2 bg-black w-full left-0 block "
              style={{ height: "2px" }}
            ></div>
            <Link
              to={`/profile/${pinDetails?.postedBy._id}`}
              className="cursor-pointer flex items-center justify-center mx-2 "
            >
              <img
                src={
                  pinDetails
                    ? pinDetails.postedBy.image
                    : "https://i.pinimg.com/170x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
                }
                alt=""
                className="w-10 rounded-full "
              />
              <h2 className="ml-2 font-bold">
                {pinDetails?.postedBy.userName}
              </h2>
            </Link>
            <div
              className="content-none top-1/2 bg-black w-full left-0 block"
              style={{ height: "2px" }}
            ></div>
          </div>
          <div className="flex-initial">
            <h2 className="text-lg">{pinDetails?.title}</h2>
            <h3 className="text-sm">{pinDetails?.about} </h3>
          </div>
          <div className="md:flex-1  overflow-y-auto pin-details-comments">
            <div id="task-comments" className="pt-4">
              {pinDetails && <CommentBox pinDetails={pinDetails} />}
            </div>
          </div>

          {/* <div className="flex w-full justify-center">
            <img
              className="w-10 h-10 rounded-full m-auto md:mx-2"
              src={
                user
                  ? user.image
                  : "https://i.pinimg.com/170x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
              }
              alt=""
            />
            <input
              type="text"
              className="p-2 rounded-md border-2 w-full m-2"
              placeholder="Add your Comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
              id="finput"
            />
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-full text-sm h-max p-3  m-auto text-center  dark:bg-red-600 dark:hover:bg-red-700  
             focus:ring-4 focus:ring-red-300 focus:ring-red-900"
              onClick={() => {
                comment
                  ? addComment()
                  : setError([true, "Comment is empty"], () => {
                      <Error message="Comment can't be empty" />;
                    });
              }}
            >
              {addingComment ? "Posting" : "Post"}
            </button>
          </div> */}
          <AddComment user={user} pinId={pinId} />

          <div className="flex justify-between items-center p-2 bg-red-500  ">
            <div className="flex">
              {!pinLiked ? (
                <AiOutlineHeart
                  size={25}
                  className="cursor-pointer"
                  onClick={() => {
                    setLikesCounts(likesCounts + 1);
                    setPinLiked(true);
                    client
                      .patch(`${pinId}`)
                      .setIfMissing({ likes: [] })
                      .insert("after", "likes[-1]", [
                        { _key: uuidv4(), likedBy: { _ref: user._id } },
                      ])
                      .inc({ likesCount: 1 })
                      .commit()
                      .then(() => {
                        navigate("/");
                      });
                  }}
                />
              ) : (
                <AiFillHeart
                  size={25}
                  className="cursor-pointer"
                  onClick={() => {
                    setLikesCounts(likesCounts - 1);
                    setPinLiked(false);
                    client
                      .patch(`${pinId}`)
                      .unset([`likes[_key == "${likedKey}"]`])
                      .dec({ likesCount: 1 })
                      .commit()
                      .then(() => {
                        navigate("/");
                      });
                  }}
                />
              )}
              {likesCounts}
              <Link to={`comments`}>
                <FaRegComment size={25} className="cursor-pointer mx-2" />
              </Link>

              <FiSend
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  setShareBox(true);
                }}
              />
            </div>
            <div className="flex ">
              {alreadySaved ? (
                <BsFillBookmarkFill size={25} className="cursor-pointer" />
              ) : (
                <FiBookmark
                  className="cursor-pointer"
                  size={25}
                  onClick={() => {
                    
                    savePin(pinDetails._id);
                  }}
                />
              )}
              <BsThreeDotsVertical size={25} />
            </div>
          </div>
        </div>
      </div>
      {error[0] ? <Error message={error[1]} /> : null}
    </>
  );
};

export default PinDetail;
