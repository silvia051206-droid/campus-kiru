"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Clock, 
  BarChart3, 
  Layers, 
  Calculator, 
  BookOpen, 
  FileText, 
  ExternalLink, 
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Users,
  Eye,
  Send
} from "lucide-react";

export default function PerfilMentorAlumnoPage() {
  const [activeTab, setActiveTab] = useState<"inicio" | "estadisticas" | "asignar" | "calculalo" | "mehmiro" | "informe">("inicio");

  // Estados del generador de asignación de tareas
  const [subject, setSubject] = useState("Inglés");
  const [area, setArea] = useState("Vocabulary");
  const [level, setLevel] = useState("A1");
  const [unit, setUnit] = useState("Unit 1");
  const [difficulty, setDifficulty] = useState("Alta");
  const [numExercises, setNumExercises] = useState("15");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [assignedSuccess, setAssignedSuccess] = useState<string | null>(null);

  const handleAssign = () => {
    setAssignedSuccess(`Tarea asignada a Carmen: ${subject} → ${level} → ${unit} → ${area} (${difficulty}, ${numExercises} ejercicios)`);
    setPreviewOpen(false);
    setTimeout(() => setAssignedSuccess(null), 5000);
  };

  return (
    <div className="min-h-screen bg-kiru-bg pb-16">
      {/* Cabecera del mentor */}
      <header className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-4">
          <Link
            href="/mentor"
            className="p-2 rounded-xl bg-[#F7F6F3] border border-kiru-border text-kiru-muted hover:text-kiru-text transition-colors flex items-center gap-1 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a Alumnos
          </Link>
          <div>
            <h1 className="font-serif text-2xl text-kiru-text">Carmen</h1>
            <p className="text-xs text-kiru-muted">Expediente de Alumno · Método Kiru</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-kiru-forest-light text-kiru-forest rounded-full text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Nivel: Explorador
          </div>
          <Link href="/" className="text-xs font-semibold text-red-500 hover:underline">
            Cerrar sesión
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Tarjeta de información del alumno */}
        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-kiru-forest-light border border-kiru-forest/20 flex items-center justify-center font-serif text-2xl text-kiru-forest font-bold">
              CF
            </div>
            <div>
              <h2 className="font-serif text-xl text-kiru-text">Carmen</h2>
              <p className="text-xs text-kiru-muted mt-0.5">
                Nivel: <strong className="text-kiru-text">Explorador</strong> · 19 SkillCoins · Último acceso: Hoy 11:50
              </p>
            </div>
          </div>
        </div>

        {assignedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{assignedSuccess}</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Guardado</span>
          </div>
        )}

        {/* NAVEGACIÓN SUPERIOR EXACTA (6 secciones en horizontal, sin barra lateral) */}
        <nav className="flex flex-wrap gap-2 border-b border-kiru-border pb-3">
          <button
            onClick={() => setActiveTab("inicio")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "inicio"
                ? "bg-kiru-forest text-white shadow-sm"
                : "bg-kiru-card border border-kiru-border text-kiru-muted hover:text-kiru-text"
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Inicio
          </button>

          <button
            onClick={() => setActiveTab("estadisticas")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "estadisticas"
                ? "bg-kiru-forest text-white shadow-sm"
                : "bg-kiru-card border border-kiru-border text-kiru-muted hover:text-kiru-text"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Estadísticas
          </button>

          <button
            onClick={() => setActiveTab("asignar")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "asignar"
                ? "bg-kiru-forest text-white shadow-sm"
                : "bg-kiru-card border border-kiru-border text-kiru-muted hover:text-kiru-text"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Asignar tarea
          </button>

          <button
            onClick={() => setActiveTab("calculalo")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "calculalo"
                ? "bg-kiru-forest text-white shadow-sm"
                : "bg-kiru-card border border-kiru-border text-kiru-muted hover:text-kiru-text"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" /> Calcúlalo
          </button>

          <button
            onClick={() => setActiveTab("mehmiro")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "mehmiro"
                ? "bg-kiru-forest text-white shadow-sm"
                : "bg-kiru-card border border-kiru-border text-kiru-muted hover:text-kiru-text"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Mehmiro
          </button>

          <button
            onClick={() => setActiveTab("informe")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "informe"
                ? "bg-kiru-forest text-white shadow-sm"
                : "bg-kiru-card border border-kiru-border text-kiru-muted hover:text-kiru-text"
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Asignar informe
          </button>
        </nav>

        {/* 1. SECCIÓN: INICIO (HISTORIAL / AGENDA CRONOLÓGICA) */}
        {activeTab === "inicio" && (
          <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-lg text-kiru-text">Historial de actividad</h3>
              <p className="text-xs text-kiru-muted mt-0.5">
                Agenda cronológica de lo que ha hecho Carmen y cuándo.
              </p>
            </div>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-kiru-border">
              {/* Evento 1 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-kiru-forest ring-4 ring-kiru-card" />
                <div className="bg-[#F7F6F3] p-4 rounded-2xl border border-kiru-border space-y-1">
                  <span className="text-[11px] font-bold text-kiru-forest">Hoy 11:58</span>
                  <p className="text-xs text-kiru-text font-medium">
                    Ha terminado la actividad con <strong>8/10</strong> (+5 SkillCoins).
                  </p>
                </div>
              </div>

              {/* Evento 2 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-kiru-muted ring-4 ring-kiru-card" />
                <div className="bg-[#F7F6F3] p-4 rounded-2xl border border-kiru-border space-y-1">
                  <span className="text-[11px] font-bold text-kiru-muted">Hoy 11:52</span>
                  <p className="text-xs text-kiru-text font-medium">
                    Ha realizado la actividad <strong>“Vocabulary — Unit 1”</strong>.
                  </p>
                </div>
              </div>

              {/* Evento 3 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-kiru-muted ring-4 ring-kiru-card" />
                <div className="bg-[#F7F6F3] p-4 rounded-2xl border border-kiru-border space-y-1">
                  <span className="text-[11px] font-bold text-kiru-muted">Hoy 11:50</span>
                  <p className="text-xs text-kiru-text font-medium">
                    El alumno ha accedido al campus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SECCIÓN: ESTADÍSTICAS */}
        {activeTab === "estadisticas" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-kiru-card p-5 rounded-3xl border border-kiru-border shadow-sm">
                <p className="text-[11px] font-bold text-kiru-muted uppercase tracking-wider">Progreso global</p>
                <p className="font-serif text-3xl text-kiru-forest font-bold mt-1">74%</p>
                <p className="text-[11px] text-kiru-muted mt-1">Nivel: Explorador</p>
              </div>

              <div className="bg-kiru-card p-5 rounded-3xl border border-kiru-border shadow-sm">
                <p className="text-[11px] font-bold text-kiru-muted uppercase tracking-wider">Actividades realizadas</p>
                <p className="font-serif text-3xl text-kiru-forest font-bold mt-1">14</p>
                <p className="text-[11px] text-kiru-muted mt-1">3 pendientes de completar</p>
              </div>

              <div className="bg-kiru-card p-5 rounded-3xl border border-kiru-border shadow-sm">
                <p className="text-[11px] font-bold text-kiru-muted uppercase tracking-wider">Resultados / Precisión</p>
                <p className="font-serif text-3xl text-kiru-forest font-bold mt-1">8.6 / 10</p>
                <p className="text-[11px] text-kiru-muted mt-1">Tasa de acierto del 86%</p>
              </div>

              <div className="bg-kiru-card p-5 rounded-3xl border border-kiru-border shadow-sm">
                <p className="text-[11px] font-bold text-kiru-muted uppercase tracking-wider">SkillCoins</p>
                <p className="font-serif text-3xl text-kiru-forest font-bold mt-1">19</p>
                <p className="text-[11px] text-kiru-muted mt-1">Saldo acumulado</p>
              </div>
            </div>

            <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-4">
              <h3 className="font-serif text-lg text-kiru-text">Evolución de aprendizaje</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Inglés (Vocabulary & Grammar)</span>
                    <span className="text-kiru-forest">85%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F7F6F3]">
                    <div className="h-full rounded-full bg-kiru-forest" style={{ width: "85%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Calcúlalo (Cálculo mental y agilidad)</span>
                    <span className="text-kiru-forest">90%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F7F6F3]">
                    <div className="h-full rounded-full bg-kiru-forest" style={{ width: "90%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Mehmiro (Comprensión y velocidad lectora)</span>
                    <span className="text-kiru-forest">70%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F7F6F3]">
                    <div className="h-full rounded-full bg-kiru-forest" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SECCIÓN: ASIGNAR TAREA (MOTOR PREPARADO: NIVEL, UNIT, DIFICULTAD, NÚMERO DE EJERCICIOS, PREVISUALIZAR) */}
        {activeTab === "asignar" && (
          <div className="space-y-6">
            <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-5">
              <div>
                <h3 className="font-serif text-lg text-kiru-text">Configurador de tareas de Método Kiru</h3>
                <p className="text-xs text-kiru-muted mt-0.5">
                  Estructura preparada para la generación, previsualización y asignación de ejercicios a Carmen.
                </p>
              </div>

              {/* 1. Asignatura */}
              <div>
                <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-2">Asignatura</label>
                <div className="flex gap-2">
                  {["Inglés"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setSubject(item)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        subject === item
                          ? "bg-kiru-forest text-white border-kiru-forest"
                          : "bg-[#F7F6F3] border-kiru-border text-kiru-muted"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Áreas de Inglés */}
              <div>
                <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-2">Área de trabajo</label>
                <div className="flex flex-wrap gap-2">
                  {["Vocabulary", "Grammar", "Reading", "Listening", "Writing"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setArea(item)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        area === item
                          ? "bg-kiru-forest text-white border-kiru-forest"
                          : "bg-[#F7F6F3] border-kiru-border text-kiru-muted hover:text-kiru-text"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Nivel, Unit, Dificultad y Número de ejercicios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1.5">Nivel</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-kiru-border bg-[#F7F6F3] text-xs font-semibold text-kiru-text focus:outline-none focus:border-kiru-forest"
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1.5">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-kiru-border bg-[#F7F6F3] text-xs font-semibold text-kiru-text focus:outline-none focus:border-kiru-forest"
                  >
                    <option value="Unit 1">Unit 1</option>
                    <option value="Unit 2">Unit 2</option>
                    <option value="Unit 3">Unit 3</option>
                    <option value="Unit 4">Unit 4</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1.5">Dificultad</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-kiru-border bg-[#F7F6F3] text-xs font-semibold text-kiru-text focus:outline-none focus:border-kiru-forest"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1.5">Nº Ejercicios</label>
                  <select
                    value={numExercises}
                    onChange={(e) => setNumExercises(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-kiru-border bg-[#F7F6F3] text-xs font-semibold text-kiru-text focus:outline-none focus:border-kiru-forest"
                  >
                    <option value="5">5 ejercicios</option>
                    <option value="10">10 ejercicios</option>
                    <option value="15">15 ejercicios</option>
                    <option value="20">20 ejercicios</option>
                  </select>
                </div>
              </div>

              {/* Botones de Previsualizar y Asignar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-kiru-border">
                <span className="text-xs text-kiru-muted">
                  Configuración actual: <strong>{subject} → {level} → {unit} → {area} → Dificultad {difficulty.toLowerCase()} → {numExercises} ejercicios</strong>
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewOpen(!previewOpen)}
                    className="px-4 py-2 rounded-xl border border-kiru-border bg-[#F7F6F3] text-kiru-text text-xs font-semibold hover:bg-kiru-border/40 transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> {previewOpen ? "Ocultar previsualización" : "Previsualizar"}
                  </button>

                  <button
                    onClick={handleAssign}
                    className="px-5 py-2 rounded-xl bg-kiru-forest text-white text-xs font-semibold hover:bg-kiru-forest-hover transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" /> Asignar
                  </button>
                </div>
              </div>
            </div>

            {/* Modal/Caja de Previsualización */}
            {previewOpen && (
              <div className="bg-kiru-card rounded-3xl p-6 border-2 border-kiru-forest shadow-md space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-kiru-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-kiru-forest-light text-kiru-forest font-bold text-[10px] uppercase">
                      Previsualización de Actividad
                    </span>
                    <h4 className="font-serif text-base text-kiru-text font-bold">
                      {subject} · {level} · {unit} ({area})
                    </h4>
                  </div>
                  <span className="text-xs text-kiru-muted font-medium">
                    {numExercises} ejercicios · Dificultad {difficulty}
                  </span>
                </div>

                <div className="bg-[#F7F6F3] p-5 rounded-2xl border border-kiru-border space-y-3">
                  <p className="text-xs text-kiru-muted font-semibold">Ejemplo — Pregunta 1/{numExercises}:</p>
                  <p className="text-sm font-bold text-kiru-text">Choose the correct word: «She _______ to school every morning.»</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-white rounded-xl border border-kiru-border text-kiru-text">A) walk</div>
                    <div className="p-2.5 bg-white rounded-xl border border-kiru-border text-kiru-text">B) walks</div>
                    <div className="p-2.5 bg-white rounded-xl border border-kiru-border text-kiru-text">C) walking</div>
                    <div className="p-2.5 bg-white rounded-xl border border-kiru-border text-kiru-text">D) walked</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. SECCIÓN: CALCÚLALO (PASOS + LINK DE ACCESO COMO PROFESOR) */}
        {activeTab === "calculalo" && (
          <div className="bg-kiru-card rounded-3xl p-8 border border-kiru-border shadow-sm max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <p className="text-xs font-bold tracking-widest text-[#4A69E2] uppercase">CALCULALO</p>
              <h2 className="font-serif text-2xl text-kiru-text">Calcúlalo</h2>
              <p className="text-xs text-kiru-muted">Plataforma de cálculo mental</p>
            </div>

            <div className="bg-[#F7F6F3] p-5 rounded-2xl border border-kiru-border space-y-2">
              <h4 className="font-serif text-base text-kiru-text">Cómo acceder</h4>
              <ol className="list-decimal list-inside text-xs text-kiru-muted space-y-1.5 leading-relaxed">
                <li>Pulsa en «Acceder a Calcúlalo».</li>
                <li>Accede mediante la opción correspondiente a: <strong>«Docente» (profesor)</strong>.</li>
                <li>Gestiona tu aula y supervisa las marcas de tus alumnos.</li>
              </ol>
            </div>

            <div className="text-center pt-2">
              <a
                href="https://calculalo.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-[#4A69E2] text-white text-sm font-semibold hover:bg-[#3B5BDB] transition-colors shadow-sm"
              >
                Acceder a Calcúlalo <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* 5. SECCIÓN: MEHMIRO (PASOS + LINK DE ACCESO) */}
        {activeTab === "mehmiro" && (
          <div className="bg-kiru-card rounded-3xl p-8 border border-kiru-border shadow-sm max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <p className="text-xs font-bold tracking-widest text-kiru-forest uppercase">MEHMIRO</p>
              <h2 className="font-serif text-2xl text-kiru-text">MeMiro</h2>
              <p className="text-xs text-kiru-muted">Lectura comprensiva y velocidad lectora</p>
            </div>

            <div className="bg-[#F7F6F3] p-5 rounded-2xl border border-kiru-border space-y-2">
              <h4 className="font-serif text-base text-kiru-text">Cómo acceder</h4>
              <ol className="list-decimal list-inside text-xs text-kiru-muted space-y-1.5 leading-relaxed">
                <li>Pulsa en «Acceder a MeMiro».</li>
                <li>Inicia sesión con tus credenciales de mentor.</li>
                <li>Revisa los textos y ejercicios de comprensión asignados.</li>
              </ol>
            </div>

            <div className="text-center pt-2">
              <a
                href="https://memiro.es"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-kiru-forest text-white text-sm font-semibold hover:bg-kiru-forest-hover transition-colors shadow-sm"
              >
                Acceder a MeMiro <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* 6. SECCIÓN: ASIGNAR INFORME (DEJADO EN BLANCO SEGÚN DOCUMENTO) */}
        {activeTab === "informe" && (
          <div className="bg-kiru-card rounded-3xl p-12 border border-kiru-border shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F6F3] border border-kiru-border flex items-center justify-center text-kiru-muted mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-kiru-text">Asignar informe</h3>
            <p className="text-xs text-kiru-muted max-w-sm mt-1">
              Sección preparada para el desarrollo del sistema de informes en los próximos sprints.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}