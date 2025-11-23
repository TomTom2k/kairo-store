import { supabaseAdmin } from "@/lib/supabase/server";
import bcrypt from "bcryptjs";
import { sendPasswordResetOTP } from "./email.service";

/**
 * Generate a random 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Create a password reset token in the database
 */
export async function createResetToken(
  adminUserId: string,
  otp: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Set expiration to 15 minutes from now
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const { error } = await supabaseAdmin.from("password_reset_tokens").insert({
      admin_user_id: adminUserId,
      token: otp,
      expires_at: expiresAt.toISOString(),
      used: false,
    });

    if (error) {
      console.error("Error creating reset token:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating reset token:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Request password reset - generates OTP and sends email
 */
export async function requestPasswordReset(
  email: string
): Promise<{ success: boolean; error?: string; username?: string }> {
  try {
    console.log("[Password Reset] Requesting reset for email:", email);

    // Find admin user by email
    const { data: adminUser, error: userError } = await supabaseAdmin
      .from("admin_users")
      .select("id, email, username")
      .eq("email", email.toLowerCase())
      .eq("is_active", true)
      .single();

    console.log("[Password Reset] Query result:", { adminUser, userError });

    if (userError || !adminUser) {
      console.error("[Password Reset] User not found:", userError);
      return { success: false, error: "Email không tồn tại trong hệ thống" };
    }

    console.log("[Password Reset] Found user:", adminUser.username);

    // Generate OTP
    const otp = generateOTP();
    console.log("[Password Reset] Generated OTP:", otp);

    // Create reset token in database
    const tokenResult = await createResetToken(adminUser.id, otp);
    if (!tokenResult.success) {
      console.error(
        "[Password Reset] Token creation failed:",
        tokenResult.error
      );
      return tokenResult;
    }

    console.log("[Password Reset] Token created successfully");

    // Send OTP email
    const emailResult = await sendPasswordResetOTP({
      to: adminUser.email!,
      username: adminUser.username,
      otp,
    });

    console.log("[Password Reset] Email send result:", emailResult);

    if (!emailResult.success) {
      return {
        success: false,
        error: "Không thể gửi email. Vui lòng thử lại sau.",
      };
    }

    console.log("[Password Reset] Success! Username:", adminUser.username);
    return { success: true, username: adminUser.username };
  } catch (error) {
    console.error("[Password Reset] Unexpected error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra. Vui lòng thử lại sau.",
    };
  }
}

/**
 * Verify OTP code
 */
export async function verifyOTP(
  username: string,
  otp: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Find admin user
    const { data: adminUser, error: userError } = await supabaseAdmin
      .from("admin_users")
      .select("id")
      .eq("username", username)
      .eq("is_active", true)
      .single();

    if (userError || !adminUser) {
      return { success: false, error: "Tên đăng nhập không tồn tại" };
    }

    // Find valid token
    const { data: token, error: tokenError } = await supabaseAdmin
      .from("password_reset_tokens")
      .select("*")
      .eq("admin_user_id", adminUser.id)
      .eq("token", otp)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (tokenError || !token) {
      return { success: false, error: "Mã OTP không hợp lệ hoặc đã hết hạn" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, error: "Có lỗi xảy ra. Vui lòng thử lại sau." };
  }
}

/**
 * Reset password with OTP verification
 */
export async function resetPassword(
  username: string,
  otp: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Verify OTP first
    const verifyResult = await verifyOTP(username, otp);
    if (!verifyResult.success) {
      return verifyResult;
    }

    // Find admin user
    const { data: adminUser, error: userError } = await supabaseAdmin
      .from("admin_users")
      .select("id")
      .eq("username", username)
      .eq("is_active", true)
      .single();

    if (userError || !adminUser) {
      return { success: false, error: "Tên đăng nhập không tồn tại" };
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update password
    const { error: updateError } = await supabaseAdmin
      .from("admin_users")
      .update({ password_hash: passwordHash })
      .eq("id", adminUser.id);

    if (updateError) {
      console.error("Error updating password:", updateError);
      return { success: false, error: "Không thể cập nhật mật khẩu" };
    }

    // Mark token as used
    await supabaseAdmin
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("admin_user_id", adminUser.id)
      .eq("token", otp);

    return { success: true };
  } catch (error) {
    console.error("Error resetting password:", error);
    return { success: false, error: "Có lỗi xảy ra. Vui lòng thử lại sau." };
  }
}

/**
 * Cleanup expired and used tokens
 */
export async function cleanupExpiredTokens(): Promise<void> {
  try {
    await supabaseAdmin
      .from("password_reset_tokens")
      .delete()
      .or(`expires_at.lt.${new Date().toISOString()},used.eq.true`);
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error);
  }
}
