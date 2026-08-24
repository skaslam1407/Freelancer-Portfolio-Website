import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AdminSkillsContent from "./AdminSkillsContent";

export const metadata: Metadata = { title: "Skills - Admin", description: "Manage skills." };

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let skills: any[] = [];
  
  if (user) {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    
    skills = data || [];
  }

  return <AdminSkillsContent initialSkills={skills} />;
}