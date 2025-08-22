import { createSupabaseServerClient } from "./supabaseServerClient";

export async function getCurrentUser() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}