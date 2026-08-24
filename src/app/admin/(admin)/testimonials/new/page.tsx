import { Metadata } from "next";
import NewTestimonialForm from "./NewTestimonialForm";

export const metadata: Metadata = {
  title: "New Testimonial - Admin",
  description: "Add a new client testimonial.",
};

export default function NewTestimonialPage() {
  return <NewTestimonialForm />;
}