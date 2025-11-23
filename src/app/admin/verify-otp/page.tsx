"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/shared/ui";
import { Lock, Loader2, ArrowLeft, KeyRound } from "lucide-react";

export default function VerifyOTPPage() {
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";

  useEffect(() => {
    if (!username) {
      router.push("/admin/forgot-password");
    }
  }, [username, router]);

  const handleResendOTP = async () => {
    setIsResending(true);
    setError("");

    try {
      // First, get the email for this username
      const { supabase } = await import("@/lib/supabase/client");
      const { data: adminUser } = await supabase
        .from("admin_users")
        .select("email")
        .eq("username", username)
        .single();

      if (!adminUser?.email) {
        setError("Không tìm thấy email cho tài khoản này");
        setIsResending(false);
        return;
      }

      const response = await fetch("/api/admin/password-reset/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminUser.email }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || "Không thể gửi lại mã OTP");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/password-reset/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, otp, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to login with success message
        router.push("/admin/login?reset=success");
      } else {
        setError(data.error || "Có lỗi xảy ra");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!username) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md p-8 bg-card rounded-xl border border-border shadow-lg space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Đặt Lại Mật Khẩu</h1>
          <p className="text-muted-foreground">
            Nhập mã OTP đã được gửi đến email của <strong>{username}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-medium">
              Mã OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) =>
                setOTP(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Nhập mã OTP 6 số"
              className="w-full px-4 py-3 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 text-center text-2xl tracking-widest font-mono"
              maxLength={6}
              autoFocus
              required
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending}
                className="text-sm text-primary hover:underline disabled:opacity-50"
              >
                {isResending ? "Đang gửi..." : "Gửi lại mã OTP"}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              Mật khẩu mới
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                className="w-full pl-10 pr-4 py-3 bg-background rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Đang xử lý...
              </>
            ) : (
              "Đặt Lại Mật Khẩu"
            )}
          </Button>

          <div className="text-center">
            <a
              href="/admin/login"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Quay lại đăng nhập
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
