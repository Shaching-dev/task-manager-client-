import { createBrowserRouter } from "react-router";
import MainLayout from "../../layout/MainLayout/MainLayout";
import Home from "../../components/Home/Home";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import Login from "../../auth/Login/Login";
import Register from "../../auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "register",
            Component: Register,
          },
        ],
      },
    ],
  },
]);
