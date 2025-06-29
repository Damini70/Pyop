import React, { useState } from "react";
import "./Explore.css";
import ExploreSection from "../ExploreSection/ExploreSection";

const Explore = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="">
      {!toggle ? (
        <div className="explore-more-wrapper">
          <button
            className="btn btn-submit-dark disabled"
            // onClick={() => setToggle(!toggle)}
          >
            <span className="text-theme text-black font-bold">
              Explore More
            </span>
          </button>
        </div>
      ) : (
        <>
          <ExploreSection alignment="left" />
          <ExploreSection alignment="right" />
        </>
      )}
    </div>
  );
};

export default Explore;
