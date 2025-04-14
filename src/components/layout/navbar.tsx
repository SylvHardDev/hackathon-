"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  if (!user) return null;

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="font-bold">
            MPA WorkBoard
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Tableau de bord
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith("/projects")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Projets
            </Link>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith("/admin")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Administration
              </Link>
            )}
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {user.nom} ({user.role})
          </span>
          <Button variant="outline" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </div>
    </nav>
  );
}
