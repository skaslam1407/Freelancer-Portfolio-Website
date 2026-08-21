import { Metadata } from "next";
import AdminSkillsContent from "./AdminSkillsContent";

export const metadata: Metadata = { title: "Skills - Admin", description: "Manage skills." };

export default function AdminSkillsPage() {
  return <AdminSkillsContent />;
}