import React from 'react';
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import { AuthButton } from './auth-button-client';
import { Session } from '@supabase/auth-js';

// Define el tipo de la sesión utilizando el tipo de @supabase/auth-js
let sessionCache: Session | null = null;

// Función para obtener datos del servidor
async function fetchSession(): Promise<Session> {
  if (sessionCache) {
    return sessionCache;
  }

  const response = await fetch('/api/auth');
  const session: Session = await response.json();
  sessionCache = session;
  return session;
}

// Componente AuthButtonServer que se ejecuta en el servidor
export async function AuthButtonServer() {
  // Obtener datos del servidor
  const session = await fetchSession();

  return (
    <div>
      {/* Renderizar el botón de autenticación con la sesión obtenida */}
      <AuthButton session={session} />
    </div>
  );
}