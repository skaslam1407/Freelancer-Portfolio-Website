import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AdminServicesContent from "./AdminServicesContent";

export const metadata: Metadata = {
  title: "Services - Admin",
  description: "Manage services.",
};

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let services: any[] = [];
  
  if (user) {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    
    services = data || [];
  }

  return <AdminServicesContent initialServices={services} />;
}