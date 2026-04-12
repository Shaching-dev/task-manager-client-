import React from "react";
import { Outlet } from "react-router";

import authImage from "../../assets/auth.jpg";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-green-400 to-green-700 p-10">
        <div className="text-center space-y-6">
          <img
            src={authImage}
            alt="auth"
            className="w-[350px] mx-auto drop-shadow-2xl rounded-xl"
          />
          <h2 className="text-3xl font-bold text-white">Welcome Back 🚀</h2>
          <p className="text-white/80 max-w-sm mx-auto">
            Manage your account, track your tasks, and stay productive with
            ease.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center min-h-screen animate-none px-5  md:px-0 md:py-0 justify-center bg-linear-to-br from-gray-300 to-gray-400">
        <div className="w-full max-w-md bg-white  rounded-2xl shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
