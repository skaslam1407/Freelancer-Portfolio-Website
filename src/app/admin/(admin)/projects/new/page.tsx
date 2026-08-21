import { Metadata } from "next";
import NewProjectForm from "./NewProjectForm";

export const metadata: Metadata = {
  title: "New Project - Admin",
  description: "Create a new portfolio project.",
};

export default function NewProjectPage() {
  return <NewProjectForm />;
}