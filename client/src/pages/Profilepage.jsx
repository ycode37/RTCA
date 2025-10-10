import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const Profilepage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile({ fullName: name });
      navigate("/");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name });
      navigate("/");
    };
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-8 space-y-6"
        >
          <h3 className="text-2xl font-light text-gray-900 text-center">
            Profile Details
          </h3>

          <div className="flex flex-col items-center space-y-3">
            <label htmlFor="avatar" className="cursor-pointer group">
              <input
                onChange={(e) => setSelectedImage(e.target.files[0])}
                type="file"
                accept=".png .jpg .jpeg"
                id="avatar"
                hidden
              />
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : authUser?.profilePic || assets.avatar_icon
                }
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 group-hover:border-gray-400 transition"
                alt=""
              />
              {/* <img
                src={authUser?.profilePic}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 group-hover:border-gray-400 transition"
              /> */}
            </label>
            <label
              htmlFor="avatar"
              className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Upload Image
            </label>
          </div>

          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition"
          />

          <button
            type="submit"
            className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-light"
          >
            Save
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <img src={assets.logo_icon} alt="" className="h-8 opacity-40" />
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
