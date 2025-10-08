import Navbar from "@/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* ✅ CÓ navbar cho public pages */}
      <Navbar />
      <main className="p-4">{children}</main>
      {/* TODO: Add Footer component */}
    </div>
  );
}
