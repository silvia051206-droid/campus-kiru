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
  Users, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Compass, 
  GraduationCap 
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
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans flex flex-col justify-between selection:bg-slate-200">
      
      {/* 1. Header con Navegación Unificada */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-serif font-bold text-sm shadow-sm">
            K
          </div>
          <div>
            <span className="font-serif text-lg text-slate-900 font-bold block leading-none">Método Kiru</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Acompañamiento a Domicilio</span>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <a href="#metodologia" className="hover:text-slate-900 transition">Metodología</a>
          <a href="#tarifas" className="hover:text-slate-900 transition">Tarifas</a>
          <Link href="/equipo" className="hover:text-slate-900 transition">Nuestro Equipo</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/equipo"
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm"
          >
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Equipo</span>
          </Link>

          <a
            href={`https://wa.me/34600000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <a
            href="#campus"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
          >
            Plataforma Kiru
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Mentoría Pedagógica y Técnicas de Estudio a Domicilio</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-slate-900 max-w-3xl mx-auto leading-tight">
          Autonomía, hábitos y excelencia escolar.
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Acompañamiento individualizado en el hogar para estudiantes de Primaria, ESO y Bachillerato. Desarrollamos autogestión, estructura de trabajo y seguimiento continuado con las familias.
        </p>

        {/* Zonas de Cobertura */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-700">
          <span className="flex items-center gap-1 font-bold text-slate-500 uppercase tracking-wider text-[11px] mr-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-800" /> Cobertura:
          </span>
          {["Pozuelo de Alarcón", "Aravaca", "Valdemarín", "Chamberí"].map((zona) => (
            <span key={zona} className="px-3 py-1 bg-white border border-slate-200 rounded-xl shadow-xs">
              {zona}
            </span>
          ))}
        </div>
      </section>

      {/* 3. Metodología / Pilares */}
      <section id="metodologia" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200/60">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif text-slate-900">¿Cómo trabajamos?</h2>
          <p className="text-xs sm:text-sm text-slate-500">Un enfoque integral que va más allá de las clases particulares convencionales.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-slate-900">1. Autonomía & Planificación</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enseñamos al alumno a estructurar su semana, gestionar los tiempos de estudio y prepararse con antelación a las evaluaciones.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-slate-900">2. Técnicas de Estudio</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Active Recall, Flashcards temáticas, resúmenes estratégicos y comprensión lectora adaptada a cada materia.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-slate-900">3. Coordinación Familiar</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Informes de progreso, seguimiento de SkillCoins y comunicación fluida entre el mentor pedagógico y los padres.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Sección Tarifas */}
      <section id="tarifas" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200/60">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Planes Formativos</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-slate-900">Tarifas Transparentes</h2>
          <p className="text-xs sm:text-sm text-slate-500">Sesiones presenciales a domicilio diseñadas a la medida del alumno.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          
          {/* Plan Básico */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Apoyo Específico</span>
              <h3 className="font-serif text-xl text-slate-900">Plan Foco</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Para resolución de dudas puntuales y preparación de exámenes clave.</p>
              <div className="pt-2">
                <span className="text-3xl font-serif font-bold text-slate-900">30€</span>
                <span className="text-xs text-slate-400"> / hora</span>
              </div>
              <ul className="space-y-2 pt-3 text-xs text-slate-600 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Sesiones presenciales a domicilio
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Refuerzo en materias seleccionadas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Acceso básico al campus virtual
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/34600000000?text=${encodeURIComponent("Hola, me interesa información sobre el Plan Foco de Método Kiru")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 text-xs font-semibold text-center transition"
            >
              Consultar Plan
            </a>
          </div>

          {/* Plan Recomendado */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-900 shadow-md flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Más Solicitado
            </div>
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 font-semibold">Mentoría Integral</span>
              <h3 className="font-serif text-xl text-slate-900">Plan Hábito & Autonomía</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Acompañamiento continuado (2 o 3 sesiones por semana) para asentar rutinas.</p>
              <div className="pt-2">
                <span className="text-3xl font-serif font-bold text-slate-900">27€</span>
                <span className="text-xs text-slate-400"> / hora</span>
              </div>
              <ul className="space-y-2 pt-3 text-xs text-slate-600 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Todo lo incluido en el Plan Foco
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Técnicas de estudio activas y Flashcards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Reportes semanales para la familia
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Sistema de motivación SkillCoins
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/34600000000?text=${encodeURIComponent("Hola, me interesa información sobre el Plan Hábito & Autonomía de Método Kiru")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold text-center transition shadow-sm"
            >
              Solicitar Mentoría
            </a>
          </div>

          {/* Plan Avanzado / Dificultades */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">TDAH / AACC</span>
              <h3 className="font-serif text-xl text-slate-900">Plan Pedagógico Especial</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Especializado en dificultades de atención, altas capacidades y motivación.</p>
              <div className="pt-2">
                <span className="text-3xl font-serif font-bold text-slate-900">35€</span>
                <span className="text-xs text-slate-400"> / hora</span>
              </div>
              <ul className="space-y-2 pt-3 text-xs text-slate-600 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Mentoría psicopedagógica personalizada
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Adaptación curricular y de técnicas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Coordinación directa con tutores del colegio
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/34600000000?text=${encodeURIComponent("Hola, me interesa información sobre el Plan Pedagógico Especial de Método Kiru")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 text-xs font-semibold text-center transition"
            >
              Consultar Plan
            </a>
          </div>

        </div>
      </section>

      {/* 5. Acceso al Campus Virtual */}
      <section id="campus" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200/60">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Área Privada</span>
            <h2 className="text-2xl font-serif text-slate-900">Plataforma Kiru</h2>
            <p className="text-xs text-slate-500">Inicia sesión como Alumno, Padre, Mentor o Administrador</p>
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
              <span>Entrar a la Plataforma</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400 space-y-1">
        <p>© 2026 Método Kiru. Acompañamiento escolar y técnicas de estudio a domicilio.</p>
        <p className="text-[11px]">Pozuelo de Alarcón · Aravaca · Valdemarín · Chamberí</p>
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