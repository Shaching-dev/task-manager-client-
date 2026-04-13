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
import { NavLink, Outlet } from "react-router";

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

  return (
    <div className="flex h-screen bg-base-100 overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`flex flex-col bg-base-200 border-r border-base-300
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}>
        {/* LOGO */}
        <div className="flex items-center justify-between px-4 py-4">
          {!collapsed && <h2 className="text-2xl font-bold">Taskify</h2>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="btn btn-ghost btn-sm">
            ☰
          </button>
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
            className={`flex items-center gap-3 ${collapsed && "justify-center"}`}>
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            )}
          </div>

          <button
            className={`mt-4 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-base-300 transition w-full
            ${collapsed && "justify-center"}`}>
            <IoIosLogOut size={20} />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAVBAR */}
        <div className="flex items-center justify-between px-6 py-3 border-b bg-base-100 sticky top-0 z-10">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-64"
          />

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <MdOutlineNightlight size={20} />
            <CiSettings size={20} />
            <IoIosNotificationsOutline size={20} />

            <div className="avatar">
              <div className="w-9 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
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
