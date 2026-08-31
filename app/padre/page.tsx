"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Sparkles, 
  Clock, 
  BarChart3, 
  Award, 
  CheckCircle2, 
  Calendar,
  Compass,
  TrendingUp,
  FileText
} from "lucide-react";

export default function PanelFamiliarPage() {
  const [activeTab, setActiveTab] = useState<"resumen" | "actividad" | "estadisticas" | "objetivos">("resumen");

  const [studentData, setStudentData] = useState({
    name: "Carmen Fernández",
    level: "Explorador",
    skillCoins: 19,
    lastAccess: "Hoy 11:50",
    tasksCompleted: 14,
    accuracy: "92%",
    mentorName: "Tutor Principal"
  });

  // Sincronización de vinculación en caso de cambios
  useEffect(() => {
    const saved = localStorage.getItem("kiru_students_links");
    if (saved) {
      try {
        const students = JSON.parse(saved);
        const match = students.find((s: any) => s.parentLinked?.includes("familia") || s.id === "carmen");
        if (match) {
          setStudentData((prev) => ({
            ...prev,
            name: match.name,
            level: match.level,
            skillCoins: match.skillCoins,
            lastAccess: match.lastAccess
          }));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-kiru-bg pb-16">
      {/* Cabecera del Panel Familiar */}
      <header className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div>
          <h1 className="font-serif text-2xl text-kiru-text">Panel Familiar</h1>
          <p className="text-xs text-kiru-muted">Seguimiento educativo · Método Kiru</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-kiru-forest-light text-kiru-forest text-xs font-semibold">
            <Users className="w-3.5 h-3.5" /> Familia Fernández
          </span>
          <Link href="/" className="text-xs font-semibold text-red-500 hover:underline">
            Cerrar sesión
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Tarjeta Principal del Alumno Vinculado (Igual a las tarjetas del mentor) */}
        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Avatar visible a la izquierda */}
            <div className="w-16 h-16 rounded-2xl bg-kiru-forest-light border border-kiru-forest/20 flex items-center justify-center font-serif text-2xl text-kiru-forest font-bold shrink-0">
              {studentData.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl text-kiru-text">{studentData.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Activo
                </span>
              </div>
              <p className="text-xs text-kiru-muted mt-0.5">
                Nivel: <strong className="text-kiru-text">{studentData.level}</strong> · Mentor: {studentData.mentorName}
              </p>
            </div>
          </div>

          {/* Marcador destacado de SkillCoins */}
          <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-kiru-border pt-4 md:pt-0 md:pl-6">
            <div className="bg-[#F7F6F3] p-4 rounded-2xl text-center border border-kiru-border min-w-[130px]">
              <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">SkillCoins</p>
              <p className="font-serif text-3xl font-bold text-kiru-forest mt-0.5">{studentData.skillCoins}</p>
            </div>
          </div>
        </div>

        {/* Navegación Superior del Panel Familiar */}
        <nav className="flex flex-wrap gap-2 border-b border-kiru-border pb-3">
          <button
            onClick={() => setActiveTab("resumen")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "resumen"
                ? "bg-kiru-forest text-white shadow-sm"
                : "bg-kiru-card border border-kiru-border text-kiru-muted hover:text-kiru-text"
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Resumen General
          </button>

          <button
            onClick={() => setActiveTab("actividad")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "actividad"
                ? "bg-kiru-forest text-white shadow-sm"
                : "bg-kiru-card border border-kiru-border text-kiru-muted hover:text-kiru-text"
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Historial de Actividad
          </button>

          <button
            onClick={() => setActiveTab("estadisticas")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "estadisticas"
                ? "bg-kiru-forest text-white shadow-sm"
                : "bg-kiru-card border border-kiru-border text-kiru-muted hover:text-kiru-text"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Estadísticas Básicas
          </button>

          <button
            onClick={() => setActiveTab("objetivos")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "objetivos"
                ? "bg-kiru-forest text-white shadow-sm"
                : "bg-kiru-card border border-kiru-border text-kiru-muted hover:text-kiru-text"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Fortalezas y Objetivos
          </button>
        </nav>

        {/* 1. SECCIÓN: RESUMEN GENERAL */}
        {activeTab === "resumen" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-kiru-card p-5 rounded-3xl border border-kiru-border shadow-sm">
                <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">Última conexión</p>
                <p className="font-serif text-xl text-kiru-text font-bold mt-1">{studentData.lastAccess}</p>
                <p className="text-[11px] text-kiru-muted mt-0.5">Acceso registrado en el campus</p>
              </div>

              <div className="bg-kiru-card p-5 rounded-3xl border border-kiru-border shadow-sm">
                <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">Tareas completadas</p>
                <p className="font-serif text-xl text-kiru-text font-bold mt-1">{studentData.tasksCompleted}</p>
                <p className="text-[11px] text-kiru-muted mt-0.5">Módulos finalizados con éxito</p>
              </div>

              <div className="bg-kiru-card p-5 rounded-3xl border border-kiru-border shadow-sm">
                <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">Precisión media</p>
                <p className="font-serif text-xl text-kiru-forest font-bold mt-1">{studentData.accuracy}</p>
                <p className="text-[11px] text-kiru-muted mt-0.5">Porcentaje de respuestas correctas</p>
              </div>
            </div>

            <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-3">
              <h3 className="font-serif text-lg text-kiru-text">Nota del Mentor</h3>
              <p className="text-xs text-kiru-muted leading-relaxed">
                Carmen mantiene un ritmo constante y motivado. Ha superado con éxito las actividades de vocabulario y tiempos verbales asignadas esta semana, sumando nuevas SkillCoins para su progreso de nivel.
              </p>
            </div>
          </div>
        )}

        {/* 2. SECCIÓN: HISTORIAL DE ACTIVIDAD */}
        {activeTab === "actividad" && (
          <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-5">
            <div>
              <h3 className="font-serif text-lg text-kiru-text">Actividad reciente de Carmen</h3>
              <p className="text-xs text-kiru-muted mt-0.5">Registro cronológico de ejercicios y retos completados.</p>
            </div>

            <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-kiru-border">
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-kiru-forest ring-4 ring-kiru-card" />
                <div className="bg-[#F7F6F3] p-4 rounded-2xl border border-kiru-border">
                  <span className="text-[11px] font-bold text-kiru-forest">Hoy 11:58</span>
                  <p className="text-xs text-kiru-text font-medium mt-0.5">
                    Ha completado la actividad <strong>“Vocabulary — Unit 1”</strong> con un resultado de <strong>8/10</strong> (+5 SkillCoins).
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-kiru-muted ring-4 ring-kiru-card" />
                <div className="bg-[#F7F6F3] p-4 rounded-2xl border border-kiru-border">
                  <span className="text-[11px] font-bold text-kiru-muted">Hoy 11:50</span>
                  <p className="text-xs text-kiru-text font-medium mt-0.5">
                    Carmen ha iniciado sesión en el Campus Virtual.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SECCIÓN: ESTADÍSTICAS BÁSICAS */}
        {activeTab === "estadisticas" && (
          <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-5">
            <div>
              <h3 className="font-serif text-lg text-kiru-text">Evolución y Áreas de Trabajo</h3>
              <p className="text-xs text-kiru-muted mt-0.5">Progreso en las principales materias de acompañamiento.</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Inglés (Gateway A1/A2)</span>
                  <span className="text-kiru-forest font-bold">85%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F7F6F3]">
                  <div className="h-full rounded-full bg-kiru-forest" style={{ width: "85%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Cálculo mental (Calcúlalo)</span>
                  <span className="text-kiru-forest font-bold">90%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F7F6F3]">
                  <div className="h-full rounded-full bg-kiru-forest" style={{ width: "90%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Comprensión lectora (Mehmiro)</span>
                  <span className="text-kiru-forest font-bold">70%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F7F6F3]">
                  <div className="h-full rounded-full bg-kiru-forest" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. SECCIÓN: FORTALEZAS Y OBJETIVOS (Base para la telaraña de objetivos futuros) */}
        {activeTab === "objetivos" && (
          <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-4">
            <div>
              <h3 className="font-serif text-lg text-kiru-text">Fortalezas y Objetivos</h3>
              <p className="text-xs text-kiru-muted mt-0.5">
                Estructura preparada para la matriz de fortalezas y debilidades (hábitos, matemáticas y lengua).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-kiru-border space-y-1">
                <p className="text-[11px] font-bold text-kiru-forest uppercase tracking-wider">Hábitos y Organización</p>
                <p className="text-xs text-kiru-text font-semibold">Excelente constancia</p>
                <p className="text-[11px] text-kiru-muted">Realiza las actividades en los tiempos previstos.</p>
              </div>

              <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-kiru-border space-y-1">
                <p className="text-[11px] font-bold text-kiru-forest uppercase tracking-wider">Matemáticas y Cálculo</p>
                <p className="text-xs text-kiru-text font-semibold">Alta velocidad de cálculo</p>
                <p className="text-[11px] text-kiru-muted">Destaca en rapidez y precisión mental.</p>
              </div>

              <div className="p-4 bg-[#F7F6F3] rounded-2xl border border-kiru-border space-y-1">
                <p className="text-[11px] font-bold text-kiru-forest uppercase tracking-wider">Lengua e Idiomas</p>
                <p className="text-xs text-kiru-text font-semibold">En progreso</p>
                <p className="text-[11px] text-kiru-muted">Reforzando lectura crítica y vocabulario.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}