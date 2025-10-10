import React, { useContext, useState } from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <div className="bg-black text-gray-800 h-screen w-80 flex flex-col px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <img src={assets.logo} alt="logo" className="w-16 cursor-pointer" />
        <div className="relative">
          <img
            src={assets.menu_icon}
            alt=""
            className="w-10 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 top-12 bg-white text-gray-800 rounded-lg shadow-xl flex flex-col w-40 p-2 z-10">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer hover:bg-blue-100 px-4 py-3 rounded text-sm"
              >
                edit profile
              </p>
              <hr className="my-1" />
              <p
                onClick={() => logout()}
                className="cursor-pointer hover:bg-blue-100 px-4 py-3 rounded text-sm"
              >
                logout
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm mb-6">
        <img src={assets.search_icon} alt="Search" className="w-5" />
        <input
          type="text"
          placeholder="Search User"
          className="outline-none bg-transparent w-full text-gray-700"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {userDummyData.map((user, index) => (
          <div
            onClick={() => setSelectedUser(user)}
            key={index}
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors mb-2 ${
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
              {index < 3 ? (
                <span className="text-xs text-green-600">Online</span>
              ) : (
                <span className="text-xs text-gray-400">Offline</span>
              )}
            </div>
            {index > 2 && <p>{index}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
