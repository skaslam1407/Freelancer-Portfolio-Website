"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components";
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/Toast";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "forgot">("login");

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
          addToast({ title: "Login failed", description: error.message, type: "error" });
        } else {
          addToast({ title: "Welcome back!", type: "success" });
          router.push(redirectTo);
          router.refresh();
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/admin/reset-password`,
        });

        if (error) {
          setError(error.message);
          addToast({ title: "Failed to send reset email", description: error.message, type: "error" });
        } else {
          addToast({ title: "Reset email sent", description: "Check your email for password reset instructions", type: "success" });
          setMode("login");
        }
      }
    } catch {
      setError("An unexpected error occurred");
      addToast({ title: "Error", description: "An unexpected error occurred", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === "login" ? "forgot" : "login");
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card variant="outlined" padding="lg" className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Site
          </Link>
          <CardTitle className="text-2xl">{mode === "login" ? "Admin Login" : "Forgot Password"}</CardTitle>
          <CardDescription>
            {mode === "login" 
              ? "Sign in to access the dashboard" 
              : "Enter your email to receive password reset instructions"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete={mode === "login" ? "email" : "email"}
              leftIcon={<Mail className="h-4 w-4" />}
            />

            {mode === "login" && (
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  leftIcon={<Lock className="h-4 w-4" />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "login" ? "Signing in..." : "Sending..."}
                </>
              ) : (
                mode === "login" ? "Sign In" : "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>{mode === "login" ? "Forgot your password?" : "Remember your password?"}</p>
            <Button variant="link" className="mt-1" onClick={toggleMode}>
              {mode === "login" ? "Reset Password" : "Back to Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}