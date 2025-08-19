"use client";
import { useEffect, useState } from "react";
import CheckCircleIcon from "../components/CheckCircleIcon";
import InputField from "../components/InputField";
import MessageIcon from "../components/MessageIcon";
import LockIcon from "../components/LockIcon";
import ProfileIcon from "../components/ProfileIcon";
import ButtonComponent from "../components/ButtonComponent";
import { signInuser, signUpUser } from "../services/AuthService";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [signInActive, setSignInActive] = useState(true);
  const [signUpActive, setSignUpActive] = useState(false);
  const router = useRouter();

  const handleSignIn = async (formData) => {
    console.log("In signin");
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await signInuser(email, password);
    if (response.error) {
      alert("Error Logging in...");
    } else {
      router.push("/dashboard");
    }
  };

  const handleSignUp = async (formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const pass1 = formData.get("password");
    const pass2 = formData.get("confirmPassword");
    if (pass1 !== pass2) alert("Passwords  doesnot match...");
    else {
      const res = await signUpUser(name, email, pass1);
      if (res.error) alert("Error signing up...");
      else router.push("/dashboard");
    }
  };

  return (
    <div className="bg-gradient-to-r from-violet-50 to-cyan-50 font-sans flex w-screen justify-center">
      <div className="bg-white p-5 my-2 flex flex-col gap-6 items-center w-110 shadow-xl rounded-xl">
        <div className="p-2 flex flex-col gap-4 items-center">
          <div className="flex bg-gradient-to-r from-violet-600 to-cyan-600 justify-center items-center rounded-xl font-medium w-15 h-15 ">
            <CheckCircleIcon className=" text-white w-9 h-9" />
          </div>
          <p className="text-3xl text-gray-800 font-bold">TaskFlow</p>
          <p className=" text-gray-600">
            Organize your life, one task at a time
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-2xl text-gray-800 font-bold">Welcome</p>
          <p className="text-sm text-gray-600">
            Sign to your account or create a new one
          </p>
        </div>
        <div className="px-0.5 w-full h-10 rounded-md flex justify-between items-center bg-gray-100 text-gray-600 font-medium text-sm">
          <div
            onClick={() => {
              setSignInActive(true);
              setSignUpActive(false);
            }}
            className={`p-2 h-9 rounded-sm hover:cursor-pointer flex flex-1 justify-center ${
              signInActive ? "text-black bg-white" : ""
            }`}
          >
            Sign In
          </div>
          <div
            onClick={() => {
              setSignInActive(false);
              setSignUpActive(true);
            }}
            className={`p-2 h-9 rounded-sm hover:cursor-pointer flex flex-1 justify-center ${
              signUpActive ? "text-black bg-white" : ""
            }`}
          >
            Sign Up
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signInActive
              ? handleSignIn(new FormData(e.target))
              : handleSignUp(new FormData(e.target));
            e.target.reset();
          }}
          className="w-full flex flex-col"
        >
          {signInActive && (
            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Email</p>
                <InputField
                  icon={<MessageIcon />}
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Password</p>
                <InputField
                  icon={<LockIcon />}
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                />
              </div>
              <ButtonComponent
                type="submit"
                label="Sign In"
                properties="bg-gradient-to-r hover:from-violet-400 to-cyan-400 from-violet-600 to-cyan-600  text-sm font-medium"
              />
            </div>
          )}
          {signUpActive && (
            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Full Name</p>
                <InputField
                  icon={<ProfileIcon color="#94a3b8" />}
                  placeholder="Enter your full name"
                  type="text"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">Email</p>
                <InputField
                  icon={<MessageIcon />}
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">
                  Create Password
                </p>
                <InputField
                  icon={<LockIcon />}
                  placeholder="Enter a password"
                  type="password"
                  name="password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-800">
                  Confirm Password
                </p>
                <InputField
                  icon={<LockIcon />}
                  placeholder="Confirm your password"
                  type="password"
                  name="confirmPassword"
                />
              </div>
              <ButtonComponent
                type="submit"
                label="Create Account"
                properties="bg-gradient-to-r hover:from-violet-400 to-cyan-400 from-violet-600 to-cyan-600  text-sm font-medium"
              />
            </div>
          )}
        </form>
        <p className="text-gray-600 text-sm text-center">
          Demo credentials: any email/password combination works for login after
          signup
        </p>
      </div>
    </div>
  );
};
export default AuthPage;
