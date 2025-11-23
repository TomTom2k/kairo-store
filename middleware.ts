import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Validate admin session by checking if admin user exists and is active
 */
async function validateAdminSession(adminId: string): Promise<boolean> {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return false;
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", adminId)
      .eq("is_active", true)
      .single();

    return !error && !!data;
  } catch (error) {
    console.error("Error validating admin session:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login, forgot-password, and verify-otp pages
    const publicAdminRoutes = [
      "/admin/login",
      "/admin/forgot-password",
      "/admin/verify-otp",
    ];

    if (publicAdminRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    // Check for admin session cookie
    const adminSession = request.cookies.get("admin_session");

    if (!adminSession?.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Validate that the admin user actually exists and is active
    const isValidSession = await validateAdminSession(adminSession.value);

    if (!isValidSession) {
      // Clear invalid session cookie
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete("admin_session");
      return response;
    }
  }

  const response = NextResponse.next();

  // Disable caching for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
