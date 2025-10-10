import React from "react";
import Sidebar from "../components/Sidebar";
import Chatcontainer from "../components/Chatcontainer";

const Homepage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Chatcontainer />
    </div>
  );
};

export default Homepage;
