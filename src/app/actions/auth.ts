"use server";

import { cookies } from "next/headers";
import {
  verifyAdminCredentials,
  updateLastLogin,
  getAdminById,
} from "@/api/services/admin-auth.service";

const SESSION_COOKIE = "admin_session";

/**
 * Authenticate admin user and create session
 * @param username - Admin username
 * @param password - Admin password
 * @returns Success status and error message if applicable
 */
export async function setAdminSession(username: string, password: string) {
  try {
    // Verify credentials against database
    const adminUser = await verifyAdminCredentials(username, password);

    if (!adminUser) {
      return {
        success: false,
        error: "Tên đăng nhập hoặc mật khẩu không đúng",
      };
    }

    // Create session cookie with admin user ID
    (await cookies()).set(SESSION_COOKIE, adminUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
    });

    // Update last login timestamp
    await updateLastLogin(adminUser.id);

    return { success: true };
  } catch (error) {
    console.error("Error setting admin session:", error);
    return { success: false, error: "Có lỗi xảy ra, vui lòng thử lại" };
  }
}

/**
 * Logout admin user and clear session
 */
export async function logoutAdmin() {
  (await cookies()).delete(SESSION_COOKIE);
  return { success: true };
}

/**
 * Check if admin session is valid
 * @returns True if session exists and is valid
 */
export async function checkAdminSession(): Promise<boolean> {
  try {
    const session = (await cookies()).get(SESSION_COOKIE);

    if (!session?.value) {
      return false;
    }

    // Verify that admin user still exists and is active
    const adminUser = await getAdminById(session.value);
    return !!adminUser;
  } catch (error) {
    console.error("Error checking admin session:", error);
    return false;
  }
}

/**
 * Get current admin user from session
 * @returns Admin user object or null
 */
export async function getCurrentAdmin() {
  try {
    const session = (await cookies()).get(SESSION_COOKIE);

    if (!session?.value) {
      return null;
    }

    return await getAdminById(session.value);
  } catch (error) {
    console.error("Error getting current admin:", error);
    return null;
  }
}
