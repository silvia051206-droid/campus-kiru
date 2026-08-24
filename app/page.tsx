"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: user, error: dbError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username.trim().toLowerCase())
        .eq("password", password.trim())
        .maybeSingle();

      setLoading(false);

      if (dbError) {
        setError(`Error de base de datos: ${dbError.message}`);
        return;
      }

      if (!user) {
        setError("Usuario o contraseña no encontrados en la base de datos");
        return;
      }

      localStorage.setItem("kiru_user", JSON.stringify(user));

      if (user.role === "alumno") router.push("/alumno");
      else if (user.role === "mentor") router.push("/mentor");
      else if (user.role === "padre") router.push("/padre");
      else if (user.role === "admin") router.push("/admin");
    } catch (err: any) {
      setLoading(false);
      setError(`Error general: ${err.message || "Fallo de conexión"}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-kiru-bg">
      <div className="w-full max-w-md bg-kiru-card rounded-3xl p-8 border border-kiru-border shadow-sm">
        <h1 className="font-serif text-3xl text-center text-kiru-text mb-2">Método Kiru</h1>
        <p className="text-center text-sm text-kiru-muted mb-6">Campus Virtual</p>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-600 text-xs text-center font-medium leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-kiru-muted uppercase mb-1">Usuario</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F7F6F3] border border-kiru-border text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-kiru-muted uppercase mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F7F6F3] border border-kiru-border text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-kiru-forest text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {loading ? "Accediendo..." : "Acceder"}
          </button>
        </form>
      </div>
    </main>
  );
}