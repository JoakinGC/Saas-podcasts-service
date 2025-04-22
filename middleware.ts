import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { locales, defaultLocale } from './constants';
import { getLocale } from './lib/getLocale';

const publicRoutes = ['/sign-in(.*)', '/sign-up(.*)',"/","/fr","/es","/de","/en"];
const isPublic = createRouteMatcher([
  ...publicRoutes,
  ...locales.flatMap(l => publicRoutes.map(r => `/${l}${r}`))
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  if (/\.(mp3|mp4|webm|png|jpg|svg|jpeg|gif)$/.test(pathname)) {
    return NextResponse.next();
  }

  if (!getLocale(pathname)) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, req.url),
      307
    );
  }
  if (!isPublic(req)) {
    await auth.protect();          
  }


})



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}