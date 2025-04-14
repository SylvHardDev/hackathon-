// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Liste des chemins à protéger (exemple : tout sauf /login et /public)
  const protectedPaths = ['/', '/dashboard'];
  const { pathname } = request.nextUrl;

  // Si la route n'est pas dans les routes protégées, on laisse passer
  if (!protectedPaths.some((path) => pathname.startsWith(path))) return NextResponse.next();

  // Vérifier la présence d'un token de session Supabase dans les cookies
  const token = request.cookies.get('sb:token'); // Le nom du cookie peut différer selon la configuration Supabase
  if (!token) {
    // Redirige vers /login si pas de session
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/'], // adapter selon les chemins à protéger
};
