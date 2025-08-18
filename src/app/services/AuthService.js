"use client";
// import { useUser } from "../context/UserContext";
export async function handleLogin(email, password,router) {
  // const {setUser} = useUser()
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const response = await res.json()
  if (!res.ok) {
    console.log("Error logging in...");
  } else {
    router.push("/");
    router.refresh()
    console.log("success");
    
  }
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

