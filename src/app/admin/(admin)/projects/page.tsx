import { Metadata } from "next";
import AdminProjectsContent from "./AdminProjectsContent";

export const metadata: Metadata = {
  title: "Projects - Admin",
  description: "Manage portfolio projects.",
};

export default function AdminProjectsPage() {
  return <AdminProjectsContent />;
}