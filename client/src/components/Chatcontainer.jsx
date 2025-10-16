import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { formatmessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Chatcontainer = ({ onBackToSidebar }) => {
  const { selectedUser, setSelectedUser, messages, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUser } = useContext(AuthContext);
  const scrollEnd = useRef();

  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an Image File");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return selectedUser ? (
    <div className="flex-1 flex flex-col bg-[#495057] h-full">
      {/* Add bg-black to header */}
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-4 bg-[#212529] border-b border-gray-700">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Back button for mobile */}
          <button
            onClick={() => {
              setSelectedUser(null);
              if (onBackToSidebar) {
                onBackToSidebar();
              }
            }}
            className="md:hidden p-2 text-white hover:bg-gray-700 rounded-lg mr-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          {/* Change text colors for dark theme */}
          <p className="font-medium text-white text-sm sm:text-base">
            {selectedUser?.fullName} {onlineUser.includes(selectedUser._id)}{" "}
            <span className="text-xs text-green-400 ml-2">Online</span>
          </p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            onClick={() => setSelectedUser(null)}
            src={assets.arrow_icon}
            alt=""
            className="hidden md:block w-5 sm:w-6 cursor-pointer"
          />
          <img
            src={assets.help_icon}
            alt=""
            className="w-5 sm:w-6 cursor-pointer"
          />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-[#495057]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-2 mb-3 sm:mb-4 items-end ${
              msg.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
          >
            {msg.senderId !== authUser._id && (
              <img
                src={selectedUser?.profilePic}
                alt=""
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
              />
            )}

            {msg.senderId === authUser._id && (
              <img
                src={authUser?.profilePic || assets.avatar_icon}
                alt=""
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
              />
            )}

            <div
              className={`flex flex-col ${
                msg.senderId === authUser._id ? "items-end" : "items-start"
              }`}
            >
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className="max-w-[180px] sm:max-w-[200px] md:max-w-xs rounded-lg"
                />
              ) : (
                <p
                  className={`px-3 sm:px-4 py-2 rounded-lg max-w-[180px] sm:max-w-[200px] md:max-w-xs break-words text-sm sm:text-base ${
                    msg.senderId === authUser._id
                      ? "bg-violet-800 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.text}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-1">
                {formatmessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input area */}
      <div className="bg-[#212529] border-t border-gray-700 p-3 md:p-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Enter Your Message"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#495057] text-white text-sm sm:text-base border border-gray-700 focus:outline-none focus:border-gray-500"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image" className="cursor-pointer">
            <img src={assets.gallery_icon} alt="" className="w-5 sm:w-6" />
          </label>
          <img
            onClick={handleSendMessage}
            src={assets.send_button}
            alt=""
            className="w-5 sm:w-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#495057] px-4">
      <img
        src={assets.logo_icon}
        alt=""
        className="w-48 sm:w-60 md:w-70 mb-4"
      />
      <p className="text-lg sm:text-xl text-white font-light text-center">
        Chat Anytime anywhere
      </p>
    </div>
  );
};

export default Chatcontainer;
