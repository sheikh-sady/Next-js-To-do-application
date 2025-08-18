"use client";
import ButtonComponent from "@/app/components/ButtonComponent";
import CalenderIcon from "@/app/components/CalenderIcon";
import DeleteIcon from "@/app/components/DeleteIcon";
import DownloadIcon from "@/app/components/DownloadIcon";
import DropDownComponent from "@/app/components/DropDownComponent";
import DropDownIcon from "@/app/components/DropDownIcon";
import EditIcon from "@/app/components/EditIcon";
import ExitIcon from "@/app/components/ExitIcon";
import InputField from "@/app/components/InputField";
import MessageIcon from "@/app/components/MessageIcon";
import ModalComponent from "@/app/components/ModalComponent";
import MoonIcon from "@/app/components/MoonIcon";
import NotificationIcon from "@/app/components/NotificationIcon";
import ProfileIcon from "@/app/components/ProfileIcon";
import SearchInputField from "@/app/components/SearchInputField";
import ShieldIcon from "@/app/components/ShieldIcon";
import SunIcon from "@/app/components/SunIcon";
import { convertDate } from "@/app/components/Todo";
import TodoForm from "@/app/components/TodoForm";
import UploadIcon from "@/app/components/UploadIcon";
import { useCategory } from "@/app/context/categoryContext";
import { handleLogout } from "@/app/services/AuthService";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SettingsPage = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const themeItems = [
    { label: "Dark", icon: <MoonIcon /> },
    {
      label: "Light",
      icon: <SunIcon />,
    },
  ];
  const [theme, setTheme] = useState("Light");
  const { categories } = useCategory();
  const [defaultCategory, setDefaultCategory] = useState("Personal");
  const [clicked, setClicked] = useState(false);
  return (
    <div className="bg-gradient-to-r from-violet-50 to-cyan-50 p-4 flex flex-col gap-5 font-sans">
      <div className="p-2 flex flex-col gap-3">
        <p className="text-3xl font-bold">Settings</p>
        <p className="text-md text-gray-500">
          Manage your account preferences and data
        </p>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-5">
        <div className="flex-1 p-8 flex flex-col gap-5 rounded-md shadow-xl">
          <div className="flex items-center gap-2 font-semibold text-gray-800 text-2xl">
            <NotificationIcon />
            <p>Preferences</p>
          </div>
          <div className="flex justify-between gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-sm font-medium text-gray-800">Notifications</p>
              <p className="text-sm text-gray-500">
                Receive task reminders and updates
              </p>
            </div>
            <div
              onClick={() => setClicked((prev) => !prev)}
              className={`p-0.5 w-11 h-6 ${
                clicked ? "bg-black" : "bg-gray-300"
              }  rounded-xl hover:cursor-pointer`}
            >
              <div
                className={`w-5 h-5 ${
                  clicked
                    ? "transform translate-x-full duration-200 "
                    : "transform translate-x-0 duration-200"
                }  bg-white rounded-full`}
              ></div>
            </div>
          </div>
          <hr className="border-gray-300" />
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Theme</p>
            <div className="p-2 flex flex-1 flex-col gap-2 text-sm">
              {themeItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setTheme(item.label)}
                  className={`hover:cursor-pointer flex items-center justify-between gap-3 px-3 py-2 rounded-md font-medium transition-colors
                ${
                  theme === item.label
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Default Category</p>
            <DropDownComponent
              title={defaultCategory}
              setFilterCategory={setDefaultCategory}
              icon1={<></>}
              icon2={<DropDownIcon />}
              items={categories}
            />
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col gap-3  items-start rounded-md shadow-xl">
          <div className="mt-5 flex items-center gap-3 font-semibold text-gray-800 text-2xl">
            <ShieldIcon />
            <p>Data Management</p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="text-sm flex flex-col gap-2">
              <p className="font-medium text-gray-800">Export Data</p>
              <p className="text-gray-500">
                Download all your tasks and categories
              </p>
            </div>
            <div className="p-2 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center hover:cursor-pointer hover:bg-gray-100">
              <DownloadIcon />
              <p className="font-medium text-sm">Export Data</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="text-sm flex flex-col gap-2">
              <p className="font-medium text-gray-800">Import Data</p>
              <p className="text-gray-500">Import tasks from a backup file</p>
            </div>
            <div className="p-2 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center ">
              <UploadIcon />
              <p className="font-medium text-sm">Import Data (coming soon)</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="text-sm flex flex-col gap-2">
              <p className="font-medium text-red-400">Clear All Data</p>
              <p className="text-gray-500">Remove all tasks and categories</p>
            </div>
            <div className="p-2 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center hover:cursor-pointer hover:bg-red-100 hover:text-red-400">
              <DeleteIcon width="20px" height="20px" />
              <p className="font-medium text-sm ">Clear All Data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 w-full flex flex-col gap-4 rounded-lg shadow-xl bg-gradient-to-r from-white to-red-50">
        <div className="flex items-center gap-3 font-semibold text-gray-800 text-2xl">
          <ExitIcon color="black" />
          <p>Account Action</p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-1">
            <div className="text-sm flex flex-col gap-2">
              <p className="font-medium text-gray-800">Sign Out</p>
              <p className="text-gray-500">Sign out of your account</p>
            </div>
            <div
              onClick={() => {
                handleLogout();
                router.push("/login");
              }}
              className="p-2 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center hover:cursor-pointer hover:bg-gray-100"
            >
              <ExitIcon color="black" />
              <p className="font-medium text-sm">Sign Out</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="text-sm flex flex-col gap-2">
              <p className="font-medium text-red-400">Delete Account</p>
              <p className="text-gray-500">
                Permanently delete your account and all data
              </p>
            </div>
            <div className="p-2 border-1 border-gray-300 rounded-lg flex gap-3 justify-center items-center hover:cursor-pointer hover:bg-red-100 hover:text-red-400">
              <DeleteIcon width="20px" height="20px" />
              <p className="font-medium text-sm">Delete Account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
