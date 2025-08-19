"use client";
import ButtonComponent from "@/app/components/ButtonComponent";
import CalenderIcon from "@/app/components/CalenderIcon";
import EditIcon from "@/app/components/EditIcon";
import InputField from "@/app/components/InputField";
import MessageIcon from "@/app/components/MessageIcon";
import ProfileIcon from "@/app/components/ProfileIcon";
import { convertDate } from "@/app/components/Todo";

const ProfilePage = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-violet-50 to-cyan-50 p-4 flex flex-col gap-2 font-sans">
      <div className="p-2 flex justify-between text-black">
        <div className=" flex flex-col gap-3">
          <p className="text-3xl font-bold">Profile</p>
          <p className="text-md text-gray-500">
            Manage your account information
          </p>
        </div>
        <ButtonComponent
          icon={<EditIcon width="20px" height="20px"/>}
          label="Edit Profile"
          onClick={() => alert("Profile Edit")}
          properties="bg-gradient-to-r from-violet-600 to-cyan-600"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="p-6 flex flex-col gap-3 h-80 items-center rounded-md shadow-xl">
          <div className="mt-5 flex justify-center items-center w-20 h-20 bg-gray-300 rounded-full">
            <img src="/assets/profile.png" alt="Profile Image" />
          </div>
          <p className="font-bold text-lg text-gray-800">
            {user.user_metadata.name ? user.user_metadata.name : "Name"}
          </p>
          <p className="text-gray-500">{user.email}</p>
          <div className="w-full px-2 py-1 rounded-xl bg-gray-100 text-xs font-medium">
            Active user
          </div>
          <div className="w-full flex gap-2">
            <div>
              <CalenderIcon />
            </div>
            <p className="text-xs text-gray-500">
              Joined : {convertDate(user.created_at)}
            </p>
          </div>
          <div className="w-full flex gap-2">
            <div>
              <ProfileIcon />
            </div>
            <p className="text-xs text-gray-500">user id : {user.id}</p>
          </div>
        </div>
        <div className="flex flex-col w-full gap-5">
          <div className=" p-8 flex flex-col gap-5 rounded-md shadow-xl">
            <div className="font-semibold text-gray-800 text-xl">
              Personal Information
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex flex-1 flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Full Name</p>
                <InputField
                  icon={<ProfileIcon />}
                  value={
                    user.user_metadata.name ? user.user_metadata.name : "Name"
                  }
                  type="text"
                  disabled="disabled"
                  onChange={(e) => {}}
                  // onBlur={() => setNewTodo("")}
                  className="h-12 font-medium text-xs bg-gray-100"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">
                  Email Address
                </p>
                <InputField
                  icon={<MessageIcon />}
                  value={user.email}
                  type="text"
                  disabled="disabled"
                  onChange={(e) => {}}
                  // onBlur={() => setNewTodo("")}
                  className="h-12 font-medium text-xs bg-gray-100"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-800">
                Account Created
              </p>
              <InputField
                icon={<CalenderIcon />}
                value={convertDate(user.created_at)}
                type="text"
                disabled="disabled"
                onChange={(e) => {}}
                // onBlur={() => setNewTodo("")}
                className="h-12 font-medium text-xs bg-gray-100"
              />
            </div>
          </div>
          <div className="w-full flex flex-col rounded-md shadow-xl">
            <div className=" p-8 flex flex-col gap-5 rounded-md shadow-xl">
              <div className="font-semibold text-gray-800 text-xl">
                Preferences
              </div>
              <div className="flex justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-gray-500 text-sm">
                    Choose your preferred theme
                  </p>
                </div>
                <div>
                  <p className="px-2 py-0.5 text-xs border-1 border-gray-300 rounded-2xl font-bold">
                    light
                  </p>
                </div>
              </div>

              <div className="flex justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-gray-500 text-sm">
                    Recieve task reminders
                  </p>
                </div>
                <div>
                  <p className="px-2 py-0.5 text-xs border-1 border-gray-300 rounded-2xl font-bold text-white bg-black">
                    Enabled
                  </p>
                </div>
              </div>

              <div className="flex justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Default Category</p>
                  <p className="text-gray-500 text-sm">
                    Default catgegory for new tasks
                  </p>
                </div>
                <div>
                  <p className="px-2 py-0.5 text-xs border-1 border-gray-300 rounded-2xl font-bold">
                    Personal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
