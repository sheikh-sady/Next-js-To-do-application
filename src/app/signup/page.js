"use client";

import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const { data: userData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    if (error) {
      console.log(error.message);
    } else {
      console.log("Signed up successfully...");
      const { data: newEntry, error: err } = await supabase
        .from("profiles")
        .insert({
          id: userData.user.id,
          name: userData.user.user_metadata.name,
        })
        .select()
        .single();

        if(err)
          console.log("Couldnot create profile.")
        else
          console.log("new profile created.",newEntry)
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <SignupForm
        name={name}
        email={email}
        password={password}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        onClick={handleSignup}
      />
      {/* <p>{message}</p> */}
    </div>
  );
}
