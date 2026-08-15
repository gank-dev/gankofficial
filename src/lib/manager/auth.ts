import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ManagerRole } from "@/lib/manager/navigation";

export type ManagerProfile = {
  id: string;
  full_name: string;
  role: ManagerRole;
  is_active: boolean;
};

export async function getManagerProfile(): Promise<ManagerProfile> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/manager/login");
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("id, full_name, role, is_active")
    .eq("id", user.id)
    .single();

  if (error || !profile || !profile.is_active) {
    await supabase.auth.signOut();
    redirect("/manager/login");
  }

  return profile as ManagerProfile;
}

export async function requireManagerRole(
  allowedRoles: ManagerRole[],
): Promise<ManagerProfile> {
  const profile = await getManagerProfile();

  if (!allowedRoles.includes(profile.role)) {
    redirect("/manager");
  }

  return profile;
}