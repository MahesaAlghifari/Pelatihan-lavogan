import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../hooks";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),

  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const user = await login(values);

      if (rememberMe) {
        try {
          localStorage.setItem("lavogan_remember_email", values.email);
        } catch {
          // ignore storage errors
        }
      }

      toast.success(`Selamat datang, ${user.fullName}!`);

      navigate(
        user.role === "participant"
          ? "/participant/dashboard"
          : "/admin/dashboard"
      );
    } catch {
      toast.error("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-slate-200/80 shadow-xl bg-white rounded-2xl">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Masuk ke Akun
          </h1>
          <p className="text-sm text-slate-500">
            Masukkan email dan password Anda untuk mengakses Portal Pelatihan Resmi MagangHub.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-sm font-semibold text-slate-800">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="nama@maganghub.id"
                aria-invalid={Boolean(errors.email)}
                className="pl-10 bg-white border-slate-200"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs font-medium text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-sm font-semibold text-slate-800">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Masukkan password"
                aria-invalid={Boolean(errors.password)}
                className="pl-10 pr-10 bg-white border-slate-200"
                {...register("password")}
              />
              <button
                type="button"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/40"
              />
              Ingat saya
            </label>

            <button
              type="button"
              onClick={() =>
                toast.info(
                  "Silakan hubungi admin MagangHub untuk bantuan reset password."
                )
              }
              className="text-xs font-semibold text-primary hover:underline"
            >
              Lupa password?
            </button>
          </div>

          <Button
            className="w-full h-11 rounded-xl font-bold text-sm gap-2 mt-2"
            type="submit"
            disabled={loading}
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Memproses..." : "Masuk"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
