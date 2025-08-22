import { getCurrentUser } from "@/app/auth";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });

  const user = await getCurrentUser();

  const { error } = await supabase.auth.signOut();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const updates = {
      online: false,
      last_seen: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();
    if (error) console.log( error.message);
    else console.log("updated profile");

    return NextResponse.json({ message: "Logged out succuesfully" },{ status: 200 });
  }
}
