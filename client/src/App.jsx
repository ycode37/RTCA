import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Profilepage from "./pages/Profilepage";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const App = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#141414",
            color: "#ffffff",
            border: "1px solid #1a1a1a",
            borderRadius: "8px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#d4af37",
              secondary: "#0a0a0a",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#0a0a0a",
            },
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Loginpage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profilepage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
