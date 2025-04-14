"use client";

import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-6">{children}</main>
    </div>
  );
}
