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

  const isOnline =
    Array.isArray(onlineUser) && onlineUser.includes(selectedUser?._id);

  return selectedUser ? (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="flex items-center gap-4">
          {/* Back button for mobile */}
          <button
            onClick={() => {
              setSelectedUser(null);
              if (onBackToSidebar) {
                onBackToSidebar();
              }
            }}
            className="md:hidden p-2 text-[#a3a3a3] hover:text-[#d4af37] hover:bg-[#1a1a1a] rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="relative">
            <img
              src={selectedUser?.profilePic || assets.avatar_icon}
              alt=""
              className="w-11 h-11 rounded-full object-cover border border-[#1a1a1a]"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#d4af37] rounded-full border-2 border-[#0a0a0a]"></span>
            )}
          </div>
          <div>
            <p className="font-medium text-white text-sm">
              {selectedUser?.fullName}
            </p>
            <p className="text-xs text-[#a3a3a3]">
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedUser(null)}
            className="hidden md:flex p-2 text-[#a3a3a3] hover:text-[#d4af37] hover:bg-[#1a1a1a] rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#0a0a0a]">
        {messages.map((msg, index) => {
          const isSent = msg.senderId === authUser._id;
          return (
            <div
              key={index}
              className={`flex gap-3 mb-6 items-end ${
                isSent ? "justify-end" : "justify-start"
              }`}
            >
              {!isSent && (
                <img
                  src={selectedUser?.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-[#1a1a1a]"
                />
              )}

              <div
                className={`flex flex-col max-w-[70%] ${
                  isSent ? "items-end" : "items-start"
                }`}
              >
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt=""
                    className="max-w-[280px] rounded-2xl border border-[#1a1a1a]"
                  />
                ) : (
                  <p
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      isSent
                        ? "bg-[#d4af37] text-black rounded-br-md"
                        : "bg-[#141414] text-white border border-[#1a1a1a] rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </p>
                )}

                <p className="text-[10px] text-[#a3a3a3] mt-1.5 px-1">
                  {formatmessageTime(msg.createdAt)}
                </p>
              </div>

              {isSent && (
                <img
                  src={authUser?.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-[#1a1a1a]"
                />
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input area */}
      <div className="bg-[#0a0a0a] border-t border-[#1a1a1a] p-4">
        <div className="flex items-center gap-3 bg-[#141414] border border-[#1a1a1a] rounded-2xl px-4 py-3">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-white text-sm placeholder-[#a3a3a3] outline-none"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label
            htmlFor="image"
            className="cursor-pointer p-2 text-[#a3a3a3] hover:text-[#d4af37] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>
          <button
            onClick={handleSendMessage}
            className="p-2 bg-[#d4af37] text-black rounded-full hover:bg-[#f0d77f] transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0a0a] px-4">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#141414] border border-[#1a1a1a] flex items-center justify-center">
          <svg
            className="w-10 h-10 text-[#d4af37]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-light text-white mb-2">Welcome</h2>
        <p className="text-sm text-[#a3a3a3]">
          Select a conversation to start messaging
        </p>
      </div>
    </div>
  );
};

console.log('Hello');
console.log('Hello');



export default Chatcontainer;
