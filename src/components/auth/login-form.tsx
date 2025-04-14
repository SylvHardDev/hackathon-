"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email: values.email,
          password: values.password,
        }
      );

      if (authError) {
        form.setError("root", {
          message: authError.message,
        });
        return;
      }

      if (data.user) {
        const { data: userProfile, error: profileError } = await supabase
          .from("utilisateur")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          form.setError("root", {
            message: "Erreur lors de la récupération du profil utilisateur.",
          });
          return;
        }

        setUser(userProfile);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      form.setError("root", {
        message: "Une erreur est survenue lors de la connexion",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="exemple@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
}
