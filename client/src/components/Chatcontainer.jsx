// import React, { useEffect, useRef } from "react";
// import assets, { messagesDummyData } from "../assets/assets";
// import { formatmessageTime } from "../lib/utils";

// const Chatcontainer = ({ selectedUser, setSelectedUser }) => {
//   const scrollEnd = useRef();

//   useEffect(() => {
//     if (scrollEnd.current) {
//       scrollEnd.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, []);
//   return selectedUser ? (
//     <div className="flex-1 flex flex-col bg-black">
//       <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100">
//         <div className="flex items-center gap-3">
//           <img
//             src={selectedUser?.profilePic || assets.avatar_icon}
//             alt=""
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <p className="font-medium text-gray-800">
//             {selectedUser?.fullName}{" "}
//             <span className="text-xs text-green-600 ml-2">Online</span>
//           </p>
//         </div>
//         <div className="flex items-center gap-4">
//           <img
//             onClick={() => setSelectedUser(null)}
//             src={assets.arrow_icon}
//             alt=""
//             className="w-6 cursor-pointer"
//           />
//           <img src={assets.help_icon} alt="" className="w-6 cursor-pointer" />
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto p-6">
//         {messagesDummyData.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex gap-2 mb-4 items-end ${
//               msg.senderId === "680f50e4f10f3cd28382ecf9"
//                 ? "justify-end"
//                 : "justify-start"
//             }`}
//           >
//             {msg.senderId === "680f50e4f10f3cd28382ecf9" && (
//               <img
//                 src={assets.avatar_icon}
//                 alt=""
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//             )}
//             <div
//               className={`flex flex-col ${
//                 msg.senderId === "680f50e4f10f3cd28382ecf9"
//                   ? "items-end"
//                   : "items-start"
//               }`}
//             >
//               {msg.image ? (
//                 <img src={msg.image} alt="" className="max-w-xs rounded-lg" />
//               ) : (
//                 <p
//                   className={`px-4 py-2 rounded-lg max-w-xs break-words ${
//                     msg.senderId !== "680f50e4f10f3cd28382ecf9"
//                       ? "bg-white text-gray-800"
//                       : "bg-blue-500 text-white"
//                   }`}
//                 >
//                   {msg.text}
//                 </p>
//               )}

//               <p className="text-xs text-gray-500 mt-1">
//                 {formatmessageTime(msg.createdAt)}
//               </p>
//             </div>

//             {msg.senderId !== "680f50e4f10f3cd28382ecf9" && (
//               <img
//                 src={selectedUser?.profilePic}
//                 alt=""
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//             )}
//           </div>
//         ))}
//         <div ref={scrollEnd}></div>
//       </div>
//       <div>
//         <div>
//           <input type="text" placeholder="Enter an Text" />
//           <input type="file" id="image" accept="image/png, image/jpeg" hidden />
//           <label htmlFor="image">
//             <img src={assets.gallery_icon} alt="" />
//           </label>
//         </div>
//         <img src={assets.send_button} alt="" />
//       </div>
//     </div>
//   ) : (
//     <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
//       <img src={assets.logo_icon} alt="" className="w-24 mb-4" />
//       <p className="text-xl text-gray-600 font-light">Chat Anytime anywhere</p>
//     </div>
//   );
// };

// export default Chatcontainer;

import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatmessageTime } from "../lib/utils";

const Chatcontainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return selectedUser ? (
    <div className="flex-1 flex flex-col bg-black">
      {/* Add bg-black to header */}
      <div className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          {/* Change text colors for dark theme */}
          <p className="font-medium text-white">
            {selectedUser?.fullName}{" "}
            <span className="text-xs text-green-400 ml-2">Online</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <img
            onClick={() => setSelectedUser(null)}
            src={assets.arrow_icon}
            alt=""
            className="w-6 cursor-pointer"
          />
          <img src={assets.help_icon} alt="" className="w-6 cursor-pointer" />
        </div>
      </div>

      {/* Messages area already inherits bg-black */}
      <div className="flex-1 overflow-y-auto p-6">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-2 mb-4 items-end ${
              msg.senderId === "680f50e4f10f3cd28382ecf9"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {msg.senderId === "680f50e4f10f3cd28382ecf9" && (
              <img
                src={assets.avatar_icon}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div
              className={`flex flex-col ${
                msg.senderId === "680f50e4f10f3cd28382ecf9"
                  ? "items-end"
                  : "items-start"
              }`}
            >
              {msg.image ? (
                <img src={msg.image} alt="" className="max-w-xs rounded-lg" />
              ) : (
                <p
                  className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                    msg.senderId !== "680f50e4f10f3cd28382ecf9"
                      ? "bg-gray-700 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {msg.text}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-1">
                {formatmessageTime(msg.createdAt)}
              </p>
            </div>

            {msg.senderId !== "680f50e4f10f3cd28382ecf9" && (
              <img
                src={selectedUser?.profilePic}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Add bg-black to input area */}
      <div className="bg-black border-t border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Enter a Text"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image" className="cursor-pointer">
            <img src={assets.gallery_icon} alt="" className="w-6" />
          </label>
          <img src={assets.send_button} alt="" className="w-6 cursor-pointer" />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <img src={assets.logo_icon} alt="" className="w-24 mb-4" />
      <p className="text-xl text-gray-600 font-light">Chat Anytime anywhere</p>
    </div>
  );
};

export default Chatcontainer;
