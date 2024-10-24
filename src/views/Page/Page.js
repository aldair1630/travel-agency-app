import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./travelscaalbackground.jpg";
// eslint-disable-next-line
import style from "./Page.module.css";

function Page() {
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <Link
        to="/home"
        className="relative z-10 bg-blue-600 text-white text-3xl font-bold py-4 px-20 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 transform hover:scale-110"
      >
        Home
      </Link>
    </div>
  );
}

export default Page;
