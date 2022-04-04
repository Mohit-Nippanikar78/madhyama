import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

const MasonryLayout = ({ pins }) => {
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };
  return (
    <div>
      <Masonry
        className="animate-slide-fwd flex"
        breakpointCols={breakpointColumnsObj}
      >
        {pins?.map((pin) => (
          <Pin pin={pin} key={pin._id} />
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryLayout;
