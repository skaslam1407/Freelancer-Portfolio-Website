import { Metadata } from "next";
import NewSkillForm from "./NewSkillForm";

export const metadata: Metadata = {
  title: "New Skill - Admin",
  description: "Create a new skill.",
};

export default function NewSkillPage() {
  return <NewSkillForm />;
}