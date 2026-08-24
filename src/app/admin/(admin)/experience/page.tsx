import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AdminExperienceContent from "./AdminExperienceContent";

export const metadata: Metadata = { title: "Experience - Admin", description: "Manage experience." };

export default async function AdminExperiencePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let experiences: any[] = [];
  
  if (user) {
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("start_date", { ascending: false });
    
    experiences = data || [];
  }

  return <AdminExperienceContent initialExperiences={experiences} />;
}