import { Metadata } from "next";
import NewExperienceForm from "./NewExperienceForm";

export const metadata: Metadata = {
  title: "New Experience - Admin",
  description: "Add a new work experience.",
};

export default function NewExperiencePage() {
  return <NewExperienceForm />;
}