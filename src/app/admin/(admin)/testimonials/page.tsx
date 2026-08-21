import { Metadata } from "next";
import AdminTestimonialsContent from "./AdminTestimonialsContent";

export const metadata: Metadata = { title: "Testimonials - Admin", description: "Manage testimonials." };

export default function AdminTestimonialsPage() {
  return <AdminTestimonialsContent />;
}