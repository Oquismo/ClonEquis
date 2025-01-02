"use client";

import React from 'react';
import { type Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// Componente AuthButton que recibe una sesión como prop
export function AuthButton({ session }: { session: Session | null }) {

  // Crea una instancia del cliente de Supabase
  const supabase = createClientComponentClient({});
  // Hook de Next.js para la navegación
  const router = useRouter();

  // Función para manejar el inicio de sesión con OAuth (GitHub)
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
          redirectTo: "https://clon-equis.vercel.app/auth/callback", // URL de redirección después del inicio de sesión en producción
          // redirectTo: "http://localhost:3000", // URL de redirección después del inicio de sesión en producción
      },
    });
  };

  // Función para manejar el cierre de sesión
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirecciona al home después de cerrar sesión
  };

  // Renderiza el componente
  return (
    <header className="flex flex-col items-center">
      {
        // Si no hay sesión, muestra el botón de iniciar sesión
        session === null ? (
          <button onClick={handleSignIn}
            type="button"
            className="mt-11 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
          > Iniciar sesión con GitHub
          </button>
        )
        // Si hay sesión, muestra el botón de cerrar sesión
        : <button onClick={handleSignOut} className="mt-18 text-center">Cerrar Sesión</button>
      }
    </header>
  );
}
