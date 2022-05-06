import { client } from "../client";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import { fetchUser } from "../utils/data";

const AddComment = ({ pinId }) => {
  const [user, setUser] = useState(null);

  const [addingComment, setAddingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState([false, ""]);
  useEffect(() => {
    const userInfo = fetchUser();
    setUser(userInfo);
  }, []);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          //   fetchPinDetails();
          setComment("");
          setAddingComment(false);
          document.location.reload();
        });
    }
  };
  const RunForComment =()=>{
    comment
            ? addComment()
            : setError([true, "Comment is empty"], () => {
                <Error message="Comment can't be empty" />;
              });
  }
  return (
    <div className="flex w-full justify-center">
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
        onKeyPress={(event)=>{if(event.key==="Enter"){ RunForComment() }}}
        value={comment}
        id="finput"
      />
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-full text-sm h-max p-3  m-auto text-center  dark:bg-red-600 dark:hover:bg-red-700  
     focus:ring-4 focus:ring-red-300 focus:ring-red-900"
        onClick={() => {
          RunForComment()
        }}
      >
        {addingComment ? "Posting" : "Post"}
      </button>
      {error[0] ? <Error message={error[1]} /> : null}
    </div>
  );
};

export default AddComment;
