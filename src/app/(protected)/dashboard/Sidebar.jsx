"use client";
import { useRouter, usePathname } from "next/navigation";
import ButtonComponent from "@/app/components/ButtonComponent";
import ListIcon from "@/app/components/ListIcon";
import ProfileIcon from "@/app/components/ProfileIcon";
import SettingsIcon from "@/app/components/SettingsIcon";
import HamburgerMenuIcon from "@/app/components/HamburgerMenuIcon";
import { useEffect, useState } from "react";
import CategoryIcon from "@/app/components/CategoryIcon";
import CheckCircleIcon from "@/app/components/CheckCircleIcon";
import ExitIcon from "@/app/components/ExitIcon";
import { handleLogout } from "@/app/services/AuthService";
import { useTodos } from "@/app/context/todosContext";
import { useCategory } from "@/app/context/categoryContext";

const Sidebar = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { todos } = useTodos();
  const { categories } = useCategory();
  console.log("Sidebar user:", user);
  const menuItems = [
    { label: "My Tasks", icon: <ListIcon />, path: "/dashboard" },
    {
      label: "Categories",
      icon: <CategoryIcon />,
      path: "/dashboard/category",
    },
    { label: "Profile", icon: <ProfileIcon />, path: "/dashboard/profile" },
    { label: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
  ];

  const handleClick = (path) => {
    router.push(path);
    setIsOpen(false);
  };
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  return (
    <div>
      {user && (
        <div>
          {/* Hamburger for mobile */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 p-1 bg-white rounded-lg shadow-md lg:hidden hover:cursor-pointer"
          >
            <HamburgerMenuIcon />
          </button>

          {/* Backdrop */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed left-0 top-0 p-4 h-full z-50 w-64 shadow-2xl transform duration-200 bg-white flex flex-col justify-between font-sans
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
          >
            <div className="flex flex-col gap-5 p-2">
              <div className="flex gap-3 text-xl font-bold">
                <div className="bg-gradient-to-r from-violet-600 to-cyan-600 p-1 rounded-xl font-medium w-9 h-9 ">
                  <CheckCircleIcon className=" text-white w-7 h-7" />
                </div>
                TaskFlow
              </div>
              <div className="flex gap-3 items-center">
                <div>
                  <img width="40px" height="40px" src="/assets/profile.png" />
                </div>
                <div className="flex flex-col text-sm text-gray-600 ">
                  <p>
                    {user.user_metadata.name
                      ? user.user_metadata.name
                      : "No name"}
                  </p>
                  <p className="text-xs text-gray-400 ">{user.email}</p>
                </div>
              </div>
              <hr className="opacity-10" />
            </div>

            {/* Menu items */}
            <div className="p-2 flex flex-1 flex-col mt-5 gap-2 text-sm">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleClick(item.path)}
                  className={`hover:cursor-pointer grid grid-cols-3 justify-items-center px-3 py-2 rounded-md font-medium transition-colors
                ${
                  pathname === item.path
                    ? "bg-gradient-to-r from-violet-500 to-cyan-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                  </span>
                  {item.label}

                  {item.label === "My Tasks" ? (
                    <span className="px-1 py-0.5 bg-white w-8 h-6 text-black rounded-2xl">
                      <p>{todos.length}</p>
                    </span>
                  ) : item.label === "Categories" ? (
                    <span className="px-1 py-0.5 bg-white w-8 h-6 text-black rounded-2xl">
                      <p>{categories.length - 1}</p>
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              ))}
            </div>

            <div
              onClick={() => {
                handleLogout();
                router.push("/login");
              }}
              className="p-2 flex gap-5 text-red-400 hover:cursor-pointer"
            >
              <div className="p-1">
                <ExitIcon color="red" />
              </div>
              <p>Sign out</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
