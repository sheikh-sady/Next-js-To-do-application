import { supabase } from "@/app/supabaseClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }); // oldest first

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(todos);
}

export async function POST(request) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { todo, description, category, priority, dueDate } =
    await request.json();

  if (!todo || typeof todo !== "string") {
    return NextResponse.json({ error: "Invalid todo" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("todos")
    .insert({
      task: todo,
      description: description,
      user_id: user.id,
      category: category,
      priority: priority,
      due_date: dueDate,
    })
    .select()
    .single(); // ✅ return the inserted row

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ todo: data }, { status: 201 }); // ✅ success!
}
export async function DELETE() {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" });

  const { data: deleted_tasks, error } = await supabase
    .from("todos")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ message: "Error deleting tasks" });
  } else {
    return NextResponse.json({ message: "Tasks deleted succesfully..." });
  }
}
