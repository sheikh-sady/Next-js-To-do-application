"use client";
// import { useUser } from "../context/UserContext";

export async function signUpUser(name, email, password) {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  return data;
}

export async function signInuser(email, password) {
  // const {setUser} = useUser()
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const response = await res.json();
  return response;
}

export async function handleLogout(router) {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    if (!res.ok) {
      console.log("something went wrong");
      console.log(response);
    } else {
      console.log("Logged out succesfully");
      router.push("/login"); // ✅ redirect to login page
      router.refresh();
    }
  } catch (error) {
    console.log("Error logging out...");
  }
}
