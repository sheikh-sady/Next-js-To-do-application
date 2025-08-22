import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const currentUser = await getCurrentUser();
  console.log(currentUser);
  const updates = {
    online:true,
    last_seen : new Date().toISOString()
  }
  const { error: err } = await supabase
    .from("profiles")
    .update(updates)
    .eq('id',currentUser.id)
    .select()
    .single();

  if (err) 
    console.log("Couldnot update profile after login");
  else 
    console.log("profile updated after login");

  const res = NextResponse.json({ message: "Logged in!", user: currentUser });
  return res;
}
