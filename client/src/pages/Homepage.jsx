import React, { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Chatcontainer from "../components/Chatcontainer";
import { ChatContext } from "../../context/ChatContext";

const Homepage = () => {
  const { selectedUser } = useContext(ChatContext);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

  // Function to handle user selection on mobile
  const handleUserSelect = () => {
    setShowChatOnMobile(true);
  };

  // Function to go back to sidebar on mobile
  const handleBackToSidebar = () => {
    setShowChatOnMobile(false);
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden h-full">
        {showChatOnMobile && selectedUser ? (
          <Chatcontainer onBackToSidebar={handleBackToSidebar} />
        ) : (
          <Sidebar onUserSelect={handleUserSelect} />
        )}
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:flex h-full">
        <Sidebar onUserSelect={handleUserSelect} />
        <Chatcontainer onBackToSidebar={handleBackToSidebar} />
      </div>
    </div>
  );
};

export default Homepage;
