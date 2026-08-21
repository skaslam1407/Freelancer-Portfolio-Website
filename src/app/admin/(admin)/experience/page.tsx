import { Metadata } from "next";
import AdminExperienceContent from "./AdminExperienceContent";

export const metadata: Metadata = { title: "Experience - Admin", description: "Manage experience." };

export default function AdminExperiencePage() {
  return <AdminExperienceContent />;
}