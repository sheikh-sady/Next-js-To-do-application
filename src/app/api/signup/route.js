// app/api/signup/route.js
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Create Supabase client with cookies (server-side)
    const supabase = createRouteHandlerClient({ cookies });

    // 1️⃣ Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: { data: { name } },
      }
    );

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    // 2️⃣ Immediately sign in the user to create a session cookie
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      return NextResponse.json({ error: signInError.message }, { status: 400 });
    }

    // 3️⃣ Optionally create a profile in "profiles" table
    // const { data: profileData, error: profileError } = await supabase
    //   .from("profiles")
    //   .insert({
    //     id: signInData.user.id,
    //     name: signInData.user.user_metadata.name,
    //   })
    //   .select()
    //   .single();
    //
    // if (profileError) {
    //   return NextResponse.json({ error: profileError.message }, { status: 400 });
    // }

    // 4️⃣ Return the logged-in user
    return NextResponse.json({ user: signInData.user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
