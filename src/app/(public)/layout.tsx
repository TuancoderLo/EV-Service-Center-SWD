import Navbar from "@/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* ✅ Navbar overlay trên hero section */}
      <Navbar />
      <main>{children}</main>
      {/* TODO: Add Footer component */}
    </div>
  );
}
