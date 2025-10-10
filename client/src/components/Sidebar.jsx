import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
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
    // Ensure users is an array and input is a string
    if (!Array.isArray(users)) {
      console.log("Users is not an array:", users);
      return [];
    }

    if (!input || input.trim() === "") {
      return users;
    }

    try {
      return users.filter((user) => {
        // Check if user and user.fullName exist
        if (!user || !user.fullName) {
          console.log("Invalid user object:", user);
          return false;
        }
        return user.fullName.toLowerCase().includes(input.toLowerCase());
      });
    } catch (error) {
      console.error("Error filtering users:", error);
      return users; // Return original users if filtering fails
    }
  }, [users, input]);

  useEffect(() => {
    getUsers();
  }, [onlineUser]);

  return (
    <div className="bg-[#adb5bd] text-gray-800 h-screen w-80 flex flex-col px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <img src={assets.logo} alt="logo" className="w-30 cursor-pointer" />
        <div className="relative">
          <img
            src={assets.menu_icon}
            alt=""
            className="w-5 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 top-12 bg-[#495057] text-gray-300 rounded-lg shadow-xl flex flex-col w-40 p-2 z-10">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer hover:bg-gray-700 px-4 py-3 rounded text-sm"
              >
                edit profile
              </p>
              <hr className="my-1" />
              <p
                onClick={() => logout()}
                className="cursor-pointer hover:bg-gray-700 px-4 py-3 rounded text-sm"
              >
                logout
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 bg-[#495057] text-gray-300 rounded-lg px-4 py-3 shadow-sm mb-6">
        <img src={assets.search_icon} alt="Search" className="w-5" />
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Search User"
          className="outline-none bg-transparent w-full text-gray-300"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => {
            // Skip rendering if user is invalid
            if (!user || !user._id || !user.fullName) {
              console.warn("Skipping invalid user:", user);
              return null;
            }

            return (
              <div
                onClick={() => {
                  setSelectedUser(user);
                  setUnseenMessages((prev) => ({
                    ...prev,
                    [user._id]: 0,
                  }));
                }}
                key={user._id || index} // Use user._id as key instead of index
                className={`border-b-1 flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors mb-2 ${
                  selectedUser?._id === user._id && "bg-violet-800"
                }`}
              >
                <img
                  src={user?.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{user.fullName}</p>
                  {Array.isArray(onlineUser) &&
                  onlineUser.includes(user._id) ? (
                    <span className="text-xs text-green-600">Online</span>
                  ) : (
                    <span className="text-xs text-gray-400">Offline</span>
                  )}
                </div>
                {unseenMessages && unseenMessages[user._id] > 0 && (
                  <p>{unseenMessages[user._id]}</p>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-8">
            {input ? "No users found" : "Loading users..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
