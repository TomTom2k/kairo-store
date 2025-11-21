"use server";

import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SESSION_COOKIE = "admin_session";

export async function setAdminSession(password: string) {
  if (password === ADMIN_PASSWORD) {
    (await cookies()).set(SESSION_COOKIE, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }
  return { success: false };
}

import { revalidatePath } from "next/cache";

export async function logoutAdmin() {
  (await cookies()).delete(SESSION_COOKIE);
  revalidatePath("/", "layout");
  return { success: true };
}

export async function checkAdminSession() {
  const session = (await cookies()).get(SESSION_COOKIE);
  return !!session?.value;
}
