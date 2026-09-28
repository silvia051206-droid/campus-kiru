"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Eye, 
  EyeOff, 
  KeyRound, 
  ArrowRight, 
  X, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  Award,
  MapPin,
  HelpCircle,
  Users
} from "lucide-react";

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

  const officialPhone = "34651382833";
  const whatsappMessage = encodeURIComponent("Hola, me gustaría más información sobre Método Kiru");
  const whatsappUrl = `https://wa.me/${officialPhone}?text=${whatsappMessage}`;

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
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans flex flex-col justify-between selection:bg-slate-200 text-xs sm:text-sm">
      
      {/* Barra superior con navegación arriba (Inicio, Programas, Tarifas, Nuestro equipo, FAQ) y WhatsApp */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center font-serif font-bold text-xs shadow-xs">
            K
          </div>
          <span className="font-serif text-base text-slate-900 font-bold">Método Kiru</span>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <a href="#" className="hover:text-slate-900 transition">Inicio</a>
          <a href="#programas" className="hover:text-slate-900 transition">Programas</a>
          <a href="#tarifas" className="hover:text-slate-900 transition">Tarifas</a>
          <a href="#equipo" className="hover:text-slate-900 transition">Nuestro equipo</a>
          <a href="#faq" className="hover:text-slate-900 transition">FAQ</a>
        </nav>

        <div className="flex items-center gap-2">
          {/* Enlace directo a WhatsApp en lugar de reservar llamada */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#campus"
            className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-xs"
          >
            Acceso Campus
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* HERO SECTION CON TEXTOS DEFINITIVOS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-serif text-slate-900 font-bold max-w-2xl mx-auto leading-snug">
            Mucho más que clases particulares: <br />Un método para desarrollar las funciones ejecutivas[cite: 2].
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Centrado en conducta, neurodivergencia y desarrollo de habilidades. Individual, a domicilio. Metodología Kiru[cite: 2].
          </p>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 py-1">
            Apoyo Académico · Organización · Planificación · Autonomía · Gestión emocional[cite: 2]
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contactar por WhatsApp</span>[cite: 2]
            </a>
            <a
              href="#programas"
              className="px-5 py-2.5 bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-200 transition shadow-xs"
            >
              Ver Programas[cite: 2]
            </a>
          </div>
        </div>

        {/* PROGRAMAS / CARACTERÍSTICAS */}
        <div id="programas" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <BookOpen className="w-4 h-4 text-blue-700" />
            <h3 className="font-serif text-sm text-slate-900 font-bold">1.1. Asignaturas</h3>
            <p className="text-[11px] text-slate-500">Geografía, Historia, Física y recursos didácticos específicos.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <Layers className="w-4 h-4 text-emerald-800" />
            <h3 className="font-serif text-sm text-slate-900 font-bold">Flashcards</h3>
            <p className="text-[11px] text-slate-500">Práctica contrarreloj y memorización activa por materias.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
            <Award className="w-4 h-4 text-amber-700" />
            <h3 className="font-serif text-sm text-slate-900 font-bold">SkillCoins</h3>
            <p className="text-[11px] text-slate-500">Evaluación de hábitos, organización y bienestar semanal.</p>
          </div>
        </div>

        {/* LO QUE DICEN LAS FAMILIAS (MÁS PEQUEÑO Y MISMO FONDO) */}
        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200/80 text-center space-y-2 max-w-2xl mx-auto shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lo que dicen las familias</span>[cite: 2]
          <p className="text-xs text-slate-700 italic leading-relaxed">
            &ldquo;Gracias a Método Kiru, mi hijo ha recuperado la autonomía estudiando y ha aprendido a organizarse de forma independiente.&rdquo;
          </p>
          <span className="text-[10px] text-slate-500 font-semibold block">— Familia de Pozuelo</span>
        </div>

        {/* TARIFAS (CON WELCOME PACK DE 25€) */}
        <section id="tarifas" className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Planes y Precios</span>
            <h2 className="text-xl font-serif text-slate-900 font-bold">Tarifas Transparentes</h2>
            <p className="text-xs text-slate-500">Sesiones a domicilio con acompañamiento pedagógico individualizado.</p>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center justify-between">
            <span className="font-semibold">📦 Welcome Pack obligatorio (3 libros + material Método Kiru):</span>
            <span className="font-bold text-emerald-950 font-serif">25€</span>[cite: 2]
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-2xl border border-slate-200 bg-[#FAF8F5] space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Plan Foco</span>
              <div className="font-serif text-lg font-bold text-slate-900">30€ <span className="text-xs text-slate-400 font-sans">/ hora</span></div>
              <p className="text-[11px] text-slate-600">Apoyo académico específico y resolución de dudas puntuales.</p>
            </div>

            <div className="p-4 rounded-2xl border-2 border-slate-900 bg-white space-y-2 shadow-2xs">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Plan Hábito & Autonomía</span>
              <div className="font-serif text-lg font-bold text-slate-900">27€ <span className="text-xs text-slate-400 font-sans">/ hora</span></div>
              <p className="text-[11px] text-slate-600">Mentoría integral continuada, hábitos de estudio y reportes.</p>
            </div>
          </div>
        </section>

        {/* ACCESO AL CAMPUS VIRTUAL */}
        <section id="campus" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4 max-w-md mx-auto w-full">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Área Privada</span>
            <h2 className="text-xl font-serif text-slate-900 font-bold">Plataforma Kiru</h2>
            <p className="text-xs text-slate-500">Inicia sesión con tus credenciales</p>
          </div>

          {error && (
            <div className="p-2.5 text-xs bg-rose-50 text-rose-700 border border-rose-200 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ej: carmen, mentor, familia..."
                className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2.5 pr-8 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
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
                className="text-[11px] text-slate-500 hover:text-slate-900 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Acceder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </section>

      </main>

      {/* PIE DE PÁGINA CON LAS ZONAS Y TEXTO EXACTO */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-600">©️2025 Método Kiru[cite: 2].</p>
        <p className="text-[11px]">Pozuelo, Las Rozas, Majadahonda, Aravaca, Boadilla y Centro[cite: 2].</p>
      </footer>

      {/* Modal de recuperación */}
      {isRecoverOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-800" />
                <h3 className="font-serif text-base text-slate-900 font-bold">Recuperar contraseña</h3>
              </div>
              <button onClick={() => setIsRecoverOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecover} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Nombre y Apellidos"
                value={recoverFullName}
                onChange={(e) => setRecoverFullName(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none"
                required
              />

              {recoveredPass && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-medium">
                  {recoveredPass}
                </div>
              )}

              {recoverError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
                  {recoverError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
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