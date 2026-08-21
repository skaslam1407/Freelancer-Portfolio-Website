import { Metadata } from "next";
import AdminServicesContent from "./AdminServicesContent";

export const metadata: Metadata = {
  title: "Services - Admin",
  description: "Manage services.",
};

export default function AdminServicesPage() {
  return <AdminServicesContent />;
}