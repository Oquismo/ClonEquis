import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      await supabase.auth.exchangeCodeForSession(code)
    } catch (error) {
      console.error("Error al intercambiar el code:", error)
      return NextResponse.redirect(requestUrl.origin + '/error')
    }
  }

  return NextResponse.redirect(requestUrl.origin + '/login', {
    headers: {
      'Cache-Control': 'public, max-age=3600', // Cache por 1 hora
    },
  }); // Redirige al usuario a la página de inicio de sesión
}