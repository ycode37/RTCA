import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Loginpage() {
  const [currState, setCurrState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isDataSubmitted, isSetDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onsumbithandler = (event) => {
    event.preventDefault();
    if (currState === "Sign Up" && !isDataSubmitted) {
      isSetDataSubmitted(true);
    }
    login(currState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
    });
  };

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
        <h2 className="text-2xl font-semibold">{currState}</h2>
        <p className="text-slate-300 mt-1">Get Started to your account</p>
        <form className="mt-8" onSubmit={onsumbithandler}>
          {currState === "Sign Up" && !isDataSubmitted && (
            <div>
              <label>Full Name</label>
              <input
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Full Name"
                value={fullName}
                required
              />
            </div>
          )}
          {!isDataSubmitted && (
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-slate-300"
              >
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
              />
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-slate-300"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 mb-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          <div className="text-right">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full mt-10 px-4 py-2.5 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {currState === "Sign Up" ? "Get Started" : "Login"}
          </button>
          <div>
            {currState === "Sign Up" ? (
              <p>
                Already Have an account{" "}
                <span
                  onClick={() => {
                    setCurrState("Login");
                    isSetDataSubmitted(false);
                  }}
                >
                  Login Here
                </span>
              </p>
            ) : (
              <p>
                Create an Account{" "}
                <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
