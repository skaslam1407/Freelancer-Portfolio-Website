import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for project inquiries, collaborations, or just to say hello.",
};

export default function ContactPage() {
  return <ContactForm />;
}