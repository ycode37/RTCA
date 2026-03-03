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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      {/* Subtle gold accent line at top */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

      <div className="w-full max-w-sm">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#a3a3a3] hover:text-[#d4af37] transition-colors mb-8"
        >
          <svg
            className="w-4 h-4"
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
          <span className="text-sm">Back</span>
        </button>

        {/* Form Card */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8">
          <h2 className="text-xl font-light text-white text-center mb-8">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center">
              <label htmlFor="avatar" className="cursor-pointer group relative">
                <input
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  id="avatar"
                  hidden
                />
                <div className="relative">
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : authUser?.profilePic || assets.avatar_icon
                    }
                    className="w-28 h-28 rounded-full object-cover border-2 border-[#1a1a1a] group-hover:border-[#d4af37] transition-colors"
                    alt="Profile"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-6 h-6 text-[#d4af37]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </label>
              <p className="text-xs text-[#a3a3a3] mt-3">
                Click to change photo
              </p>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs text-[#a3a3a3] mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-[#141414] border border-[#1a1a1a] rounded-lg text-white text-sm placeholder-[#a3a3a3] focus:border-[#d4af37] focus:outline-none transition-colors"
              />
            </div>

            {/* Email Display (read-only) */}
            <div>
              <label className="block text-xs text-[#a3a3a3] mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={authUser?.email || ""}
                readOnly
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-[#a3a3a3] text-sm cursor-not-allowed"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#d4af37] text-black font-medium rounded-lg hover:bg-[#f0d77f] transition-colors text-sm tracking-wide mt-4"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[#a3a3a3] text-xs mt-8 tracking-wider">
          <span className="text-[#d4af37]">CHAT</span> — Connect Seamlessly
        </p>
      </div>
    </div>
  );
};

export default Profilepage;
