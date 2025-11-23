import { supabaseAdmin } from "@/lib/supabase/server";
import bcrypt from "bcryptjs";

export interface AdminUser {
  id: string;
  username: string;
  email: string | null;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AdminUserRow {
  id: string;
  username: string;
  password_hash: string;
  email: string | null;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Verify admin credentials against database
 * @param username - Admin username
 * @param password - Plain text password
 * @returns Admin user object if credentials are valid, null otherwise
 */
export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<AdminUser | null> {
  try {
    // Fetch admin user by username
    const { data, error } = await supabaseAdmin
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .eq("is_active", true)
      .single<AdminUserRow>();

    if (error || !data) {
      console.error("Admin user not found:", error);
      return null;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, data.password_hash);

    if (!isPasswordValid) {
      console.error("Invalid password for admin:", username);
      return null;
    }

    // Return admin user without password hash
    const { password_hash, ...adminUser } = data;
    return adminUser;
  } catch (error) {
    console.error("Error verifying admin credentials:", error);
    return null;
  }
}

/**
 * Get admin user by ID
 * @param id - Admin user ID
 * @returns Admin user object or null
 */
export async function getAdminById(id: string): Promise<AdminUser | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("admin_users")
      .select(
        "id, username, email, is_active, last_login_at, created_at, updated_at"
      )
      .eq("id", id)
      .eq("is_active", true)
      .single<AdminUser>();

    if (error || !data) {
      console.error("Admin user not found:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching admin user:", error);
    return null;
  }
}

/**
 * Update last login timestamp for admin user
 * @param id - Admin user ID
 */
export async function updateLastLogin(id: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from("admin_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("Error updating last login:", error);
    }
  } catch (error) {
    console.error("Error updating last login:", error);
  }
}

/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}
