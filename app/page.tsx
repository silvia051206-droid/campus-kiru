"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, ArrowRight, X } from "lucide-react";

interface UserAccount {
  name: string;
  username: string;
  password?: string;
  role: "alumno" | "mentor" | "padre" | "admin";
}

const DEFAULT_USERS: UserAccount[] = [
  { name: "Carmen Fernández", username: "carmen", password: "carmen123", role: "alumno" },
  { name: "Tutor Principal", username: "mentor", password: "mentor123", role: "mentor" },
  { name: "Familia Fernández", username: "familia", password: "familia123", role: "padre" },
  { name: "Administrador General", username: "admin", password: "admin123", role: "admin" },
];

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [isRecoverOpen, setIsRecoverOpen] = useState(false);
  const [recoverFullName, setRecoverFullName] = useState("");
  const [recoveredPass, setRecoveredPass] = useState<string | null>(null);
  const [recoverError, setRecoverError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let allUsers = DEFAULT_USERS;
    const customUsers = localStorage.getItem("kiru_custom_users");
    if (customUsers) {
      try {
        allUsers = JSON.parse(customUsers);
      } catch (err) {
        console.error(err);
      }
    }

    const cleanUser = username.trim().toLowerCase();
    const found = allUsers.find(
      (u) => u.username.toLowerCase() === cleanUser && u.password === password.trim()
    );

    if (found) {
      localStorage.setItem("kiru_current_user", JSON.stringify(found));
      if (found.role === "alumno") router.push("/alumno");
      else if (found.role === "mentor") router.push("/mentor");
      else if (found.role === "padre") router.push("/padre");
      else if (found.role === "admin") router.push("/admin");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverError("");
    setRecoveredPass(null);

    let allUsers = DEFAULT_USERS;
    const customUsers = localStorage.getItem("kiru_custom_users");
    if (customUsers) {
      try {
        allUsers = JSON.parse(customUsers);
      } catch (err) {
        console.error(err);
      }
    }

    const cleanName = recoverFullName.trim().toLowerCase();
    const matched = allUsers.find((u) => u.name.toLowerCase() === cleanName);

    if (matched && matched.password) {
      setRecoveredPass(`Tu contraseña es: ${matched.password} (Usuario: ${matched.username})`);
    } else {
      setRecoverError("No se encontró ningún usuario con ese nombre completo.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F4EFEA] flex items-center justify-center text-slate-800 font-serif font-bold text-xl">
            K
          </div>
          <h1 className="text-2xl font-serif text-slate-900">Campus Método Kiru</h1>
          <p className="text-xs text-slate-500">Accede a tu panel educativo</p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: carmen, mentor, familia..."
              className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 pr-10 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setIsRecoverOpen(true);
                setRecoveredPass(null);
                setRecoverError("");
              }}
              className="text-xs text-slate-500 hover:text-slate-900 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            <span>Iniciar Sesión</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Modal Recuperación */}
      {isRecoverOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-800" />
                <h3 className="font-serif text-base text-slate-900">Recuperar contraseña</h3>
              </div>
              <button onClick={() => setIsRecoverOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Escribe tu nombre y apellidos tal como fueron registrados.
            </p>

            <form onSubmit={handleRecover} className="space-y-3">
              <input
                type="text"
                placeholder="Ej: Carmen Fernández"
                value={recoverFullName}
                onChange={(e) => setRecoverFullName(e.target.value)}
                className="w-full p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                required
              />

              {recoveredPass && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium">
                  {recoveredPass}
                </div>
              )}

              {recoverError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {recoverError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
              >
                Consultar Contraseña
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}