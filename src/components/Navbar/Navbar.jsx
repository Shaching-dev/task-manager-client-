import React, { useState } from "react";
import { FiHome, FiMessageSquare } from "react-icons/fi";
import {
  IoIosLogOut,
  IoIosNotificationsOutline,
  IoMdBook,
  IoMdPeople,
} from "react-icons/io";
import { MdOutlineNightlight, MdTaskAlt } from "react-icons/md";
import { CiClock2, CiSettings } from "react-icons/ci";
import { GrDocumentPerformance } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { TbFileReport } from "react-icons/tb";
import { BsShieldCheck } from "react-icons/bs";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = [
    { name: "Homepage", icon: <FiHome />, path: "/" },
    { name: "Members", icon: <IoMdPeople />, path: "/members" },
    { name: "Tasks", icon: <MdTaskAlt />, path: "/tasks" },
    { name: "Calendar", icon: <SlCalender />, path: "/calendar" },
    {
      name: "Performance",
      icon: <GrDocumentPerformance />,
      path: "/performance",
    },
    { name: "Messages", icon: <FiMessageSquare />, path: "/messages" },
    { name: "Attendance", icon: <CiClock2 />, path: "/attendance" },
    { name: "Reports", icon: <TbFileReport />, path: "/reports" },
    { name: "Roles", icon: <BsShieldCheck />, path: "/roles" },
    { name: "Settings", icon: <CiSettings />, path: "/settings" },
    { name: "Docs", icon: <IoMdBook />, path: "/docs" },
  ];
  const { user, userSignOut } = useAuth();

  const handleLogOut = async () => {
    try {
      const res = await userSignOut();
      toast.success(`Successfullt sign out`);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-base-100 overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`flex flex-col bg-base-200 border-r border-base-300
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}>
        {/* LOGO */}
        <div className="flex items-center justify-between px-4 z-50 py-4">
          {!collapsed && <h2 className="text-2xl font-bold">Taskify</h2>}
        </div>

        {/* MENU (SCROLLABLE ONLY THIS PART) */}
        <div className="flex-1 overflow-y-auto min-h-0 scroll-smooth px-2">
          <ul className="space-y-1">
            {menuItems.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "hover:bg-base-300"
                    }`
                  }>
                  {/* ICON */}
                  <span
                    className={`text-xl flex justify-center w-6 ${
                      collapsed ? "mx-auto" : ""
                    }`}>
                    {item.icon}
                  </span>

                  {/* TEXT */}
                  {!collapsed && <span className="truncate">{item.name}</span>}

                  {/* TOOLTIP */}
                  {collapsed && (
                    <span className="absolute left-20 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTER */}
        <div className="border-t border-base-300 p-4">
          <div
            className={`flex items-center mt-20 gap-3 ${collapsed && "justify-center"}`}>
            <div className="avatar">
              <div className="w-9 rounded-full object-cover">
                {user ? (
                  <img src={user?.photoURL} alt="user-photo" />
                ) : (
                  <span className="bg-red-500">No User</span>
                )}
              </div>
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">{user?.displayName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            )}
          </div>

          {user ? (
            <button
              onClick={handleLogOut}
              className={`mt-4 flex items-center text-red-600 gap-3 px-4 py-2 rounded-lg hover:bg-base-300 transition w-full
            ${collapsed && "justify-center"}`}>
              <IoIosLogOut size={20} />
              {!collapsed && "Logout"}
            </button>
          ) : (
            <Link
              to={"/auth/login"}
              className={`mt-4 flex text-green-600 items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 transition w-full
            ${collapsed && "justify-center"}`}>
              <IoIosLogOut className="rotate-180" size={20} />
              {!collapsed && "Login"}
            </Link>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAVBAR */}
        <div className="flex items-center justify-between px-6 py-3 border-b bg-base-100 sticky top-0 z-10">
          {/* SEARCH */}
          <div className="flex items-center">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="btn btn-ghost btn-sm">
              ☰
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-64"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <MdOutlineNightlight size={20} />
            <CiSettings size={20} />
            <IoIosNotificationsOutline size={20} />

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {user ? (
                    <img alt="user-photo" src={user?.photoURL} />
                  ) : (
                    <span className="text-red-600">No User</span>
                  )}
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <div>
                  <h2 className="font-semibold">{user?.displayName}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  <div className="border-b border-gray-400 my-2"></div>
                </div>
                <li>
                  <span>
                    <CiSettings size={18} />
                    Settings
                  </span>
                </li>
                <div className="border-b border-gray-400 my-1"></div>
                <li className={user ? "text-red-600" : "text-green-600"}>
                  {user ? (
                    <button onClick={handleLogOut}>
                      <IoIosLogOut size={18} />
                      Logout
                    </button>
                  ) : (
                    <Link to={"/auth/login"}>
                      <IoIosLogOut size={18} />
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
