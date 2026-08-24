import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AdminTestimonialsContent from "./AdminTestimonialsContent";

export const metadata: Metadata = { title: "Testimonials - Admin", description: "Manage testimonials." };

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let testimonials: any[] = [];
  
  if (user) {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    
    testimonials = data || [];
  }

  return <AdminTestimonialsContent initialTestimonials={testimonials} />;
}