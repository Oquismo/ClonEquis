import React from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthButton } from './auth-button-client';

// Función para obtener datos del servidor
async function fetchSession() {
  const response = await fetch('/api/auth');
  const session = await response.json();
  return session;
}

// Componente AuthButtonServer que se ejecuta en el servidor
export async function AuthButtonServer() {
  // Obtener datos del servidor
  const session = await fetchSession();

  // Crea una instancia del cliente de Supabase para el servidor
  const supabase = createServerComponentClient({ cookies });

  return (
    <div>
      {/* Renderizar el botón de autenticación con la sesión obtenida */}
      <AuthButton session={session} />
    </div>
  );
}