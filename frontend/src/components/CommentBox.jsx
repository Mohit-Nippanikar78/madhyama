import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
    };
  }
  render() {
    return (    
      <>
        {this.props.pinDetails?.comments?.length == 0 ? (
          <div className="mt-10 text-center text-xl ">No Comments </div>
        ) : (
        
            this.props.pinDetails?.comments?.map((comment, index) => {
              return (
                <div
                  className="bg-white  rounded-lg  flex  justify-center items-center md:items-start  mb-4"
                  key={index}
                >
                  <img
                    alt="avatar"
                    className="rounded-full w-8 h-8 mr-2 shadow-lg "
                    src={comment.postedBy.image}
                  />

                  <div
                    style={{ width: " 90%" }}
                    className="text-gray-600 text-sm text-center md:text-left "
                  >
                    <h3 className="text-purple-600 font-semibold text-md text-center md:text-left ">
                      {comment.postedBy.userName}
                    </h3>
                    {comment.comment}
                  </div>
                </div>
              );
            })
        
        )}
      </>
    );
  }
}

export default CommentBox;
