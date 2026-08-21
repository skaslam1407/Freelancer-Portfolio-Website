import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </div>
    </ToastProvider>
  );
}