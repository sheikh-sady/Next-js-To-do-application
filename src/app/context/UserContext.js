"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const UserContext = createContext(null);

export function useUser() {
  const context= useContext(UserContext);
  if(!context)return Error('Must be inside user provider context');
  return context;
}

export default function UserProvider({ children}) {

  const [user, setUser] = useState(null);
  // useEffect(()=>{
  //   supabase.auth.getUser().then(({data})=>{
  //     setUser(data.user)
  //   })
  // },[])
  console.log("User from context : ",user)
  return (
    
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  );
}