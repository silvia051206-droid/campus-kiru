"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Sparkles, 
  Clock, 
  BarChart3, 
  BookOpen, 
  FileText, 
  Calendar,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export default function PanelFamiliarPage() {
  // Pestañas equivalentes al mentor sin "Asignar tarea" ni "Calcúlalo"
  const [activeTab, setActiveTab] = useState<"inicio" | "estadisticas" | "mehmiro" | "informe">("inicio");

  const [studentData, setStudentData] = useState({
    name: "Carmen Fernández",
    level: "Explorador",
    skillCoins: 19,
    lastAccess: "Hoy 11:50",
    tasksCompleted: 14,
    accuracy: "92%",
    mentorName: "Tutor Principal"
  });

  // Sincronización en caso de cambio de alumno vinculado
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
      {/* Cabecera del Panel Familiar con botón cerrar sesión en rojo */}
      <header className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div>
          <h1 className="font-serif text-2xl text-kiru-text">Panel Familiar</h1>
          <p className="text-xs text-kiru-muted">Seguimiento educativo · Método Kiru</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-kiru-forest-light text-kiru-forest text-xs font-semibold">
            <Users className="w-3.5 h-3.5" /> Familia Fernández
          </span>
          <Link 
            href="/" 
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 border border-rose-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-rose-50 transition"
          >
            Cerrar sesión
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Tarjeta del alumno idéntica a la vista del Mentor */}
        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
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

          <div className="grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-kiru-border pt-4 md:pt-0 md:pl-6">
            <div className="bg-[#F7F6F3] p-3 rounded-2xl text-center border border-kiru-border">
              <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">SkillCoins</p>
              <p className="text-xl font-bold text-kiru-forest mt-0.5">{studentData.skillCoins}</p>
            </div>
            <div className="bg-[#F7F6F3] p-3 rounded-2xl text-center border border-kiru-border">
              <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">Acierto</p>
              <p className="text-xl font-bold text-kiru-forest mt-0.5">{studentData.accuracy}</p>
            </div>
            <div className="bg-[#F7F6F3] p-3 rounded-2xl text-center border border-kiru-border">
              <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">Completadas</p>
              <p className="text-xl font-bold text-kiru-forest mt-0.5">{studentData.tasksCompleted}</p>
            </div>
          </div>
        </div>

        {/* Navegación horizontal superior */}
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
            <FileText className="w-3.5 h-3.5" /> Informe del Mentor
          </button>
        </nav>

        {/* 1. SECCIÓN: INICIO */}
        {activeTab === "inicio" && (
          <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-lg text-kiru-text">Historial de actividad reciente</h3>
              <p className="text-xs text-kiru-muted mt-0.5">
                Agenda cronológica de los accesos y actividades realizadas por {studentData.name}.
              </p>
            </div>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-kiru-border">
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-kiru-forest ring-4 ring-kiru-card" />
                <div className="bg-[#F7F6F3] p-4 rounded-2xl border border-kiru-border space-y-1">
                  <span className="text-[11px] font-bold text-kiru-forest">Hoy 11:58</span>
                  <p className="text-xs text-kiru-text font-medium">
                    Ha terminado la actividad con <strong>8/10</strong> (+5 SkillCoins).
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-kiru-muted ring-4 ring-kiru-card" />
                <div className="bg-[#F7F6F3] p-4 rounded-2xl border border-kiru-border space-y-1">
                  <span className="text-[11px] font-bold text-kiru-muted">Hoy 11:52</span>
                  <p className="text-xs text-kiru-text font-medium">
                    Ha realizado la actividad <strong>“Vocabulary — Unit 1”</strong>.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-kiru-muted ring-4 ring-kiru-card" />
                <div className="bg-[#F7F6F3] p-4 rounded-2xl border border-kiru-border space-y-1">
                  <span className="text-[11px] font-bold text-kiru-muted">Hoy 11:50</span>
                  <p className="text-xs text-kiru-text font-medium">
                    El alumno ha accedido al campus virtual.
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
                <p className="text-[11px] text-kiru-muted mt-1">Nivel: {studentData.level}</p>
              </div>

              <div className="bg-kiru-card p-5 rounded-3xl border border-kiru-border shadow-sm">
                <p className="text-[11px] font-bold text-kiru-muted uppercase tracking-wider">Actividades realizadas</p>
                <p className="font-serif text-3xl text-kiru-forest font-bold mt-1">{studentData.tasksCompleted}</p>
                <p className="text-[11px] text-kiru-muted mt-1">Completadas con éxito</p>
              </div>

              <div className="bg-kiru-card p-5 rounded-3xl border border-kiru-border shadow-sm">
                <p className="text-[11px] font-bold text-kiru-muted uppercase tracking-wider">Precisión</p>
                <p className="font-serif text-3xl text-kiru-forest font-bold mt-1">{studentData.accuracy}</p>
                <p className="text-[11px] text-kiru-muted mt-1">Media de respuestas acertadas</p>
              </div>

              <div className="bg-kiru-card p-5 rounded-3xl border border-kiru-border shadow-sm">
                <p className="text-[11px] font-bold text-kiru-muted uppercase tracking-wider">SkillCoins</p>
                <p className="font-serif text-3xl text-kiru-forest font-bold mt-1">{studentData.skillCoins}</p>
                <p className="text-[11px] text-kiru-muted mt-1">Saldo acumulado</p>
              </div>
            </div>

            <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-4">
              <h3 className="font-serif text-lg text-kiru-text">Evolución en materias</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Inglés (Gateway)</span>
                    <span className="text-kiru-forest font-bold">85%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F7F6F3]">
                    <div className="h-full rounded-full bg-kiru-forest" style={{ width: "85%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Cálculo y agilidad mental</span>
                    <span className="text-kiru-forest font-bold">90%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F7F6F3]">
                    <div className="h-full rounded-full bg-kiru-forest" style={{ width: "90%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Comprensión lectora</span>
                    <span className="text-kiru-forest font-bold">70%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F7F6F3]">
                    <div className="h-full rounded-full bg-kiru-forest" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SECCIÓN: MEHMIRO */}
        {activeTab === "mehmiro" && (
          <div className="bg-kiru-card rounded-3xl p-8 border border-kiru-border shadow-sm max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <p className="text-xs font-bold tracking-widest text-kiru-forest uppercase">MEHMIRO</p>
              <h2 className="font-serif text-2xl text-kiru-text">MeMiro</h2>
              <p className="text-xs text-kiru-muted">Lectura comprensiva y velocidad lectora</p>
            </div>

            <div className="bg-[#F7F6F3] p-5 rounded-2xl border border-kiru-border space-y-2">
              <h4 className="font-serif text-base text-kiru-text">Seguimiento familiar</h4>
              <p className="text-xs text-kiru-muted leading-relaxed">
                Supervisa los libros, relatos interactivos y avances de fluidez lectora que Carmen realiza semanalmente.
              </p>
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

        {/* 4. SECCIÓN: INFORME DEL MENTOR (DEJADA EN BLANCO SEGÚN REQUERIMIENTOS) */}
        {activeTab === "informe" && (
          <div className="bg-kiru-card rounded-3xl p-8 border border-kiru-border shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-kiru-border pb-4">
              <div>
                <h3 className="font-serif text-xl text-kiru-text">Informe de Acompañamiento</h3>
                <p className="text-xs text-kiru-muted">Alumno: {studentData.name} · Tutor: {studentData.mentorName}</p>
              </div>
              <span className="px-3 py-1 bg-kiru-forest-light text-kiru-forest font-semibold rounded-full text-xs">
                Sprint 1
              </span>
            </div>

            {/* Espacio en blanco reservado para el sistema de informes */}
            <div className="min-h-[160px]" />
          </div>
        )}
      </main>
    </div>
  );
}