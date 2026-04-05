import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <h3>Welcome to Task Manager</h3>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
