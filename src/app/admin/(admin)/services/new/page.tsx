import { Metadata } from "next";
import NewServiceForm from "./NewServiceForm";

export const metadata: Metadata = {
  title: "New Service - Admin",
  description: "Create a new service offering.",
};

export default function NewServicePage() {
  return <NewServiceForm />;
}