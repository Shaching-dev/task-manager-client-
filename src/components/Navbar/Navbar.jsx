import React from "react";
import { BsShieldCheck } from "react-icons/bs";
import { CiClock2, CiSettings } from "react-icons/ci";
import { FiHome, FiMessageSquare } from "react-icons/fi";
import { GrDocumentPerformance } from "react-icons/gr";
import {
  IoIosLogOut,
  IoIosMenu,
  IoIosNotificationsOutline,
  IoMdBook,
  IoMdPeople,
} from "react-icons/io";
import { MdOutlineNightlight, MdTaskAlt } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TbFileReport } from "react-icons/tb";
import { NavLink, Outlet } from "react-router";

const Navbar = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full mx-auto bg-base-300">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost">
                <IoIosMenu size={20} />
              </label>

              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input type="search" className="grow" placeholder="Search" />
                <kbd className="kbd kbd-sm">⌘</kbd>
                <kbd className="kbd kbd-sm">K</kbd>
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <MdOutlineNightlight size={19} />
              <CiSettings size={19} />
              <IoIosNotificationsOutline size={19} />
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>

                <ul
                  tabIndex="-1"
                  className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <div>
                    <h2 className="font-semibold">John Doe</h2>
                    <p className="text-gray-500">john.doe@example.com</p>
                    <div className="border-b border-gray-400 my-2"></div>
                  </div>
                  <li>
                    <span>
                      <CiSettings size={18} />
                      Settings
                    </span>
                  </li>
                  <div className="border-b border-gray-400 my-1"></div>
                  <li>
                    <span>
                      <IoIosLogOut size={18} />
                      Logut
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}

          <div className="flex justify-between w-full px-5 items-center">
            <h3 className="text-3xl font-bold mx-5">Taskify</h3>
            <span className="text-4xl ">*</span>
          </div>

          <div className="divider"></div>

          <ul className="menu w-full grow space-y-3 sticky top-0">
            <h3 className=" px-3 font-semibold my-4">Main Navigation</h3>
            {/* List item */}
            <NavLink to={"/"}>
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage">
                  {/* Home icon */}
                  <FiHome size={24} />

                  <span className="is-drawer-close:hidden">Homepage</span>
                </button>
              </li>
            </NavLink>

            {/* List item */}

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <IoMdPeople size={27} />
                <span className="is-drawer-close:hidden">Members</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <MdTaskAlt size={27} />

                <span className="is-drawer-close:hidden">Tasks</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <SlCalender size={25} />
                <span className="is-drawer-close:hidden">Calender</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <GrDocumentPerformance size={25} />
                <span className="is-drawer-close:hidden">Performance</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <FiMessageSquare size={27} />

                <span className="is-drawer-close:hidden">Messages</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <CiClock2 size={27} />
                <span className="is-drawer-close:hidden">Attendance</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <TbFileReport size={27} />
                <span className="is-drawer-close:hidden">Reports</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <BsShieldCheck size={27} />
                <span className="is-drawer-close:hidden">
                  Role & Permissions
                </span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <CiSettings size={27} />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings">
                {/* Settings icon */}
                <IoMdBook size={27} />

                <span className="is-drawer-close:hidden">Documentation</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
