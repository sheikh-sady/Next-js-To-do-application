import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// ✅ Update a todo (PATCH)
export async function PATCH(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { task, is_complete, description, category, priority, dueDate } = await request.json();

  const updates = {};
  if (typeof task === "string") updates.task = task;
  if (typeof description === "string") updates.description = description;
  if (typeof category === "string") updates.category = category;
  if (typeof priority === "string") updates.priority = priority;
  if (typeof dueDate === "string") updates.due_date = dueDate;
  if (typeof is_complete === 'number') updates.is_complete = is_complete;

  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ todo: data }, { status: 200 });
}

// ✅ Delete a todo (DELETE)
export async function DELETE(_request, { params }) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
}
