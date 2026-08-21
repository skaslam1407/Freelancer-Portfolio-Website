import { Metadata } from "next";
import AdminMediaContent from "./AdminMediaContent";

export const metadata: Metadata = { title: "Media - Admin", description: "Manage media files." };

export default function AdminMediaPage() {
  return <AdminMediaContent />;
}