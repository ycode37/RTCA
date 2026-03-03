import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Loginpage() {
  const [currState, setCurrState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
    }
    login(currState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] px-4">
      {/* Subtle gold accent line at top */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

      <div className="w-full max-w-sm">
        {/* Logo/Brand */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extralight tracking-[0.3em] text-white">
            <span className="text-[#d4af37]">CHAT</span>
          </h1>
          <p className="text-[#a3a3a3] text-xs mt-2 tracking-wider">
            CONNECT SEAMLESSLY
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8">
          <h2 className="text-xl font-light text-white mb-1">
            {currState === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-[#a3a3a3] text-sm mb-8">
            {currState === "Sign Up"
              ? "Start your journey"
              : "Sign in to continue"}
          </p>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {currState === "Sign Up" && !isDataSubmitted && (
              <div>
                <label className="block text-xs text-[#a3a3a3] mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  required
                  className="w-full px-4 py-3 bg-[#141414] border border-[#1a1a1a] rounded-lg text-white text-sm placeholder-[#a3a3a3] focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>
            )}

            {!isDataSubmitted && (
              <>
                <div>
                  <label className="block text-xs text-[#a3a3a3] mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-[#141414] border border-[#1a1a1a] rounded-lg text-white text-sm placeholder-[#a3a3a3] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#a3a3a3] mb-2 uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-[#141414] border border-[#1a1a1a] rounded-lg text-white text-sm placeholder-[#a3a3a3] focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>

                {currState === "Login" && (
                  <div className="text-right">
                    <a
                      href="#"
                      className="text-xs text-[#d4af37] hover:text-[#f0d77f] transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#d4af37] text-black font-medium rounded-lg hover:bg-[#f0d77f] transition-colors text-sm tracking-wide"
            >
              {currState === "Sign Up" ? "Get Started" : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-[#1a1a1a]"></div>
            <span className="text-xs text-[#a3a3a3]">OR</span>
            <div className="flex-1 h-[1px] bg-[#1a1a1a]"></div>
          </div>

          {/* Toggle State */}
          <p className="text-center text-sm text-[#a3a3a3]">
            {currState === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setCurrState("Login");
                    setIsDataSubmitted(false);
                    setFullName("");
                  }}
                  className="text-[#d4af37] hover:text-[#f0d77f] transition-colors"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setCurrState("Sign Up");
                    setIsDataSubmitted(false);
                    setFullName("");
                  }}
                  className="text-[#d4af37] hover:text-[#f0d77f] transition-colors"
                >
                  Create one
                </button>
              </>
            )}
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-[#a3a3a3] text-xs mt-8 tracking-wider">
          © 2026 CHAT. All rights reserved.
        </p>
      </div>
    </div>
  );
}
