import React from "react";

const Banner = ({ pic }) => {
  console.log({ pic });
  return (
    <div className="w-full h-[300px] rounded-2xl overflow-hidden bg-red-600">
      <img
        src={pic}
        alt="banner"
        className="w-full h-full object-cover block"
      />
    </div>
  );
};

export default Banner;
