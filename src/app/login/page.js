"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { handleLogin } from "../services/AuthService";
import AuthPage from "../pages/AuthPage";

export default function LoginPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const router = useRouter();

  //   const handleLogin = async () => {
  //   const res = await fetch('/api/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, password }),
  //   })

  //   if (!res.ok) {
  //     const { error } = await res.json()
  //   } else {
  //     router.push("/")
  //     router.refresh()
  //   }
  // }

  return (
    // <div className="h-screen w-screen flex justify-center items-center">
    //   <LoginForm
    //     email={email}
    //     password={password}
    //     setEmail={setEmail}
    //     setPassword={setPassword}
    //     onClick={() => {
    //       handleLogin(email, password, router);
    //     }}
    //   />
    // </div>
    <>
      <AuthPage />
    </>
  );
}
