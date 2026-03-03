import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = ({ onUserSelect }) => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { logout, onlineUser } = useContext(AuthContext);

  const [input, setInput] = useState("");

  const filteredUsers = React.useMemo(() => {
    if (!Array.isArray(users)) {
      return [];
    }

    if (!input || input.trim() === "") {
      return users;
    }

    try {
      return users.filter((user) => {
        if (!user || !user.fullName) {
          return false;
        }
        return user.fullName.toLowerCase().includes(input.toLowerCase());
      });
    } catch (error) {
      console.error("Error filtering users:", error);
      return users;
    }
  }, [users, input]);

  useEffect(() => {
    getUsers();
  }, [onlineUser]);

  return (
    <div className="bg-[#0a0a0a] text-white h-full w-full md:w-72 lg:w-80 xl:w-96 flex flex-col border-r border-[#1a1a1a]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1a1a]">
        <h1 className="text-xl font-light tracking-wider">
          <span className="text-[#d4af37]">CHAT</span>
        </h1>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1a1a1a] transition-colors"
          >
            <svg
              className="w-5 h-5 text-[#a3a3a3]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="6" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="18" r="2" />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute right-0 top-12 bg-[#141414] border border-[#1a1a1a] rounded-lg shadow-2xl flex flex-col w-44 py-2 z-50">
              <button
                onClick={() => {
                  navigate("/profile");
                  setShowMenu(false);
                }}
                className="text-left px-4 py-3 text-sm text-[#e5e5e5] hover:bg-[#1a1a1a] hover:text-[#d4af37] transition-colors"
              >
                Edit Profile
              </button>
              <div className="mx-4 border-t border-[#1a1a1a]"></div>
              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="text-left px-4 py-3 text-sm text-[#e5e5e5] hover:bg-[#1a1a1a] hover:text-[#d4af37] transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 bg-[#141414] border border-[#1a1a1a] rounded-lg px-4 py-3">
          <svg
            className="w-4 h-4 text-[#a3a3a3]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search conversations..."
            className="outline-none bg-transparent w-full text-sm text-white placeholder-[#a3a3a3]"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto px-2">
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => {
            if (!user || !user._id || !user.fullName) {
              return null;
            }

            const isSelected = selectedUser?._id === user._id;
            const isOnline =
              Array.isArray(onlineUser) && onlineUser.includes(user._id);
            const hasUnread = unseenMessages && unseenMessages[user._id] > 0;

            return (
              <div
                onClick={() => {
                  setSelectedUser(user);
                  setUnseenMessages((prev) => ({
                    ...prev,
                    [user._id]: 0,
                  }));
                  if (onUserSelect) {
                    onUserSelect();
                  }
                }}
                key={user._id || index}
                className={`flex items-center gap-4 px-4 py-4 mx-2 rounded-lg cursor-pointer transition-all duration-200 mb-1 ${
                  isSelected
                    ? "bg-[#1a1a1a] border-l-2 border-[#d4af37]"
                    : "hover:bg-[#141414] border-l-2 border-transparent"
                }`}
              >
                <div className="relative">
                  <img
                    src={user?.profilePic || assets.avatar_icon}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border border-[#1a1a1a]"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#d4af37] rounded-full border-2 border-[#0a0a0a]"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium text-sm truncate ${isSelected ? "text-[#d4af37]" : "text-white"}`}
                  >
                    {user.fullName}
                  </p>
                  <p className="text-xs text-[#a3a3a3] mt-0.5">
                    {isOnline ? "Active now" : "Offline"}
                  </p>
                </div>
                {hasUnread && (
                  <span className="min-w-[20px] h-5 flex items-center justify-center bg-[#d4af37] text-black text-xs font-medium rounded-full px-1.5">
                    {unseenMessages[user._id]}
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-[#a3a3a3]">
            <svg
              className="w-12 h-12 mb-3 text-[#1a1a1a]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-sm">{input ? "No users found" : "Loading..."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
