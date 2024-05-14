import React from "react";

const Banner = () => {
  return (
    <>
       <div className="container-fluid">
      <div className="relative w-full h-[80vh]">
        {/* Background image */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j-CMHVAK7sdmt7xqDDZoXMtXVE03UGV-_JYHGmMuGw&s"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Overlay text centered on the image */}
        <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-4xl">
         Mern Authentication
        </p>
      </div>
    </div>
    </>
  );
};

export default Banner;
