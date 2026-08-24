import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AdminProjectsContent from "./AdminProjectsContent";

export const metadata: Metadata = {
  title: "Projects - Admin",
  description: "Manage portfolio projects.",
};

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let projects: any[] = [];
  
  if (user) {
    const { data } = await supabase
      .from("projects")
      .select("*, project_media(*)")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    
    projects = data || [];
  }

  return <AdminProjectsContent initialProjects={projects} />;
}