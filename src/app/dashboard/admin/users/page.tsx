// app/dashboard/admin/users/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button"; // si tu as un composant Button de shadcn/ui

export default function UserManagementPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // Vérifier que seul un admin accède à cette page
  if (!user || user.role !== "admin") {
    if (typeof window !== "undefined") router.replace("/dashboard");
    return null;
  }

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "employe" | "client">("client");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Création directe dans la table "utilisateur"
    // (Dans une solution complète, il faudra créer également le compte Auth)
    const { data, error: insertError } = await supabase
      .from("utilisateur")
      .insert([{ nom, email, role }])
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
    } else {
      setMessage(`Utilisateur ${data.nom} créé avec succès !`);
      setNom("");
      setEmail("");
      setRole("client");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>
      <form onSubmit={handleCreateUser} className="space-y-4">
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label className="block font-medium mb-1">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Rôle</label>
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "admin" | "employe" | "client")
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="admin">Admin</option>
            <option value="employe">Employé</option>
            <option value="client">Client</option>
          </select>
        </div>
        <Button type="submit">Créer l'utilisateur</Button>
      </form>
    </div>
  );
}
