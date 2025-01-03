"use client";

import React from 'react';
import { type Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';

// Componente AuthButton que recibe una sesión como prop
export function AuthButton({ session }: { session: Session | null }) {

  // Crea una instancia del cliente de Supabase
  const supabase = createClientComponentClient({});
  // Hook de Next.js para la navegación
  const router = useRouter();

  // Función para manejar el inicio de sesión con OAuth
  const handleSignIn = async (provider: 'github' | 'google') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "https://clon-equis.vercel.app/", // URL de redirección después del inicio de sesión en producción
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
        // Si no hay sesión, muestra los botones de iniciar sesión
        !session ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleSignIn('github')}
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded"
            >
              <IconBrandGithub />
              Iniciar sesión con GitHub
            </button>
            <button
              onClick={() => handleSignIn('google')}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded"
            >
              <IconBrandGoogle />
              Iniciar sesión con Google
            </button>
          </div>
        ) : (
          // Si hay sesión, muestra el botón de cerrar sesión
          <button
            onClick={handleSignOut}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        )
      }
    </header>
  );
}
