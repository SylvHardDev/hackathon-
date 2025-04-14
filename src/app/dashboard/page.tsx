// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // Si l'utilisateur n'est pas connecté, rediriger vers /login
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard {user.role === "admin" ? "Administrateur" : ""}
      </h1>

      {/* Menu commun (exemple simple) */}
      <nav className="mb-6">
        <ul className="flex gap-4">
          <li>
            <Link href="/dashboard">
              <a className="text-blue-600 hover:underline">Accueil</a>
            </Link>
          </li>
          {/* Affichage du lien uniquement pour l'admin */}
          {user.role === "admin" && (
            <li>
              <Link href="/dashboard/admin/users">
                <a className="text-blue-600 hover:underline">
                  Gestion des utilisateurs
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div>
        {/* Contenu principal du dashboard */}
        <p>
          Bienvenue {user.nom} ! Vous êtes connecté en tant que {user.role}.
        </p>
        {/* Ici, on pourra ajouter d'autres composants du dashboard */}
      </div>
    </div>
  );
}
