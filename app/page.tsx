"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, KeyRound, ArrowRight, X, MessageCircle, Users, MapPin, Sparkles } from "lucide-react";

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

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [isRecoverOpen, setIsRecoverOpen] = useState(false);
  const [recoverFullName, setRecoverFullName] = useState("");
  const [recoveredPass, setRecoveredPass] = useState<string | null>(null);
  const [recoverError, setRecoverError] = useState("");

  const whatsappMessage = encodeURIComponent("Hola, me gustaría más información sobre Método Kiru");

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
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans flex flex-col justify-between">
      {/* Barra de navegación superior limpia */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-serif font-bold text-sm">
            K
          </div>
          <div>
            <span className="font-serif text-lg text-slate-900 font-bold block leading-none">Método Kiru</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Acompañamiento a Domicilio</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/equipo"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Nuestro</span> Equipo
          </Link>

          <a
            href={`https://wa.me/34600000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#acceso-campus"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
          >
            Plataforma Kiru
          </a>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Información de Cobertura y Metodología */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atención Personalizada a Domicilio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 leading-tight">
            Autonomía, hábitos y excelencia escolar.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            Mentorías individualizadas para estudiantes de Primaria, ESO y Bachillerato. Desarrollamos técnicas de estudio personalizadas, enfoque en TDAH / Altas Capacidades y seguimiento semanal coordinado con las familias.
          </p>

          {/* Cobertura de Zonas Noroeste y Chamberí */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2.5 max-w-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <MapPin className="w-4 h-4 text-emerald-800" />
              <span>Zonas de Cobertura Principal</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
              {["Pozuelo de Alarcón", "Aravaca", "Valdemarín", "Chamberí"].map((zone) => (
                <span key={zone} className="px-3 py-1 bg-[#FAF8F5] border border-slate-200 rounded-xl">
                  {zone}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tarjeta de Acceso al Campus */}
        <div id="acceso-campus" className="lg:col-span-5">
          <div className="w-full bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Campus Virtual</span>
              <h2 className="text-2xl font-serif text-slate-900">Iniciar Sesión</h2>
              <p className="text-xs text-slate-500">Accede a tu panel como Alumno, Padre, Mentor o Administrador</p>
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
                  placeholder="carmen, familia, mentor o admin"
                  className="w-full p-3 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800 font-medium"
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
                    className="w-full p-3 pr-10 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800 font-medium"
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
                className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Acceder a la Plataforma</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        <p>© 2026 Método Kiru. Acompañamiento educativo y formativo personalizado.</p>
      </footer>

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
              Escribe tu nombre completo tal como está registrado (ej. Carmen Fernández).
            </p>

            <form onSubmit={handleRecover} className="space-y-3">
              <input
                type="text"
                placeholder="Nombre y Apellidos"
                value={recoverFullName}
                onChange={(e) => setRecoverFullName(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
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
                Consultar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}