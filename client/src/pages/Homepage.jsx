import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chatcontainer from "../components/Chatcontainer";

const Homepage = () => {
  const [selectedUser, setSelectedUser] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <Chatcontainer
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default Homepage;
