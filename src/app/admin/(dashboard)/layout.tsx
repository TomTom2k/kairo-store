import { redirect } from "next/navigation";
import { AdminSidebar } from "../components/AdminSidebar";
import { checkAdminSession } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Double-check authentication at the layout level
  const isAuthenticated = await checkAdminSession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
