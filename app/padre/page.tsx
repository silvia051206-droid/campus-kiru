"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Clock, 
  BarChart3, 
  BookOpen, 
  FileText, 
  ExternalLink
} from "lucide-react";

export default function PanelFamiliarPage() {
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pb-16 font-sans">
      {/* Cabecera con botón de apagado en negro (Opción A) */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div>
          <h1 className="font-serif text-xl sm:text-2xl text-slate-900">Panel Familiar</h1>
          <p className="text-[11px] sm:text-xs text-slate-500">Seguimiento educativo · Método Kiru</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" /> Familia Fernández
          </span>
          <Link 
            href="/" 
            title="Cerrar sesión"
            className="p-2 sm:p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-900">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Tarjeta del alumno */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-serif text-2xl text-slate-700 font-bold shrink-0">
              {studentData.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl text-slate-900">{studentData.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Activo
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Nivel: <strong className="text-slate-800">{studentData.level}</strong> · Mentor: {studentData.mentorName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
            <div className="bg-[#FDFBF7] p-3 rounded-2xl text-center border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">SkillCoins</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">{studentData.skillCoins}</p>
            </div>
            <div className="bg-[#FDFBF7] p-3 rounded-2xl text-center border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Acierto</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">{studentData.accuracy}</p>
            </div>
            <div className="bg-[#FDFBF7] p-3 rounded-2xl text-center border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Completadas</p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">{studentData.tasksCompleted}</p>
            </div>
          </div>
        </div>

        {/* Navegación horizontal adaptada a móvil */}
        <nav className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("inicio")}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "inicio"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Inicio
          </button>

          <button
            onClick={() => setActiveTab("estadisticas")}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "estadisticas"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Estadísticas
          </button>

          <button
            onClick={() => setActiveTab("mehmiro")}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "mehmiro"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Mehmiro
          </button>

          <button
            onClick={() => setActiveTab("informe")}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "informe"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Informe del Mentor
          </button>
        </nav>

        {/* 1. SECCIÓN: INICIO */}
        {activeTab === "inicio" && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-lg text-slate-900">Historial de actividad reciente</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Agenda cronológica de los accesos y actividades realizadas por {studentData.name}.
              </p>
            </div>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-slate-900 ring-4 ring-white" />
                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-900">Hoy 11:58</span>
                  <p className="text-xs text-slate-700 font-medium">
                    Ha terminado la actividad con <strong>8/10</strong> (+5 SkillCoins).
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">Hoy 11:52</span>
                  <p className="text-xs text-slate-700 font-medium">
                    Ha realizado la actividad <strong>“Vocabulary — Unit 1”</strong>.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500">Hoy 11:50</span>
                  <p className="text-xs text-slate-700 font-medium">
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
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Progreso global</p>
                <p className="font-serif text-3xl text-slate-900 font-bold mt-1">74%</p>
                <p className="text-[11px] text-slate-500 mt-1">Nivel: {studentData.level}</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actividades realizadas</p>
                <p className="font-serif text-3xl text-slate-900 font-bold mt-1">{studentData.tasksCompleted}</p>
                <p className="text-[11px] text-slate-500 mt-1">Completadas con éxito</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Precisión</p>
                <p className="font-serif text-3xl text-slate-900 font-bold mt-1">{studentData.accuracy}</p>
                <p className="text-[11px] text-slate-500 mt-1">Media de respuestas acertadas</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">SkillCoins</p>
                <p className="font-serif text-3xl text-slate-900 font-bold mt-1">{studentData.skillCoins}</p>
                <p className="text-[11px] text-slate-500 mt-1">Saldo acumulado</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-serif text-lg text-slate-900">Evolución en materias</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Inglés (Gateway)</span>
                    <span className="text-slate-900 font-bold">85%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#FDFBF7]">
                    <div className="h-full rounded-full bg-slate-900" style={{ width: "85%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Cálculo y agilidad mental</span>
                    <span className="text-slate-900 font-bold">90%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#FDFBF7]">
                    <div className="h-full rounded-full bg-slate-900" style={{ width: "90%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Comprensión lectora</span>
                    <span className="text-slate-900 font-bold">70%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#FDFBF7]">
                    <div className="h-full rounded-full bg-slate-900" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SECCIÓN: MEHMIRO */}
        {activeTab === "mehmiro" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">MEHMIRO</p>
              <h2 className="font-serif text-2xl text-slate-900">MeMiro</h2>
              <p className="text-xs text-slate-500">Lectura comprensiva y velocidad lectora</p>
            </div>

            <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-slate-100 space-y-2">
              <h4 className="font-serif text-base text-slate-900">Seguimiento familiar</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supervisa los libros, relatos interactivos y avances de fluidez lectora que Carmen realiza semanalmente.
              </p>
            </div>

            <div className="text-center pt-2">
              <a
                href="https://memiro.es"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm"
              >
                Acceder a MeMiro <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* 4. SECCIÓN: INFORME DEL MENTOR EN BLANCO */}
        {activeTab === "informe" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-serif text-xl text-slate-900">Informe de Acompañamiento</h3>
              <p className="text-xs text-slate-400 mt-0.5">Alumno: {studentData.name} · Tutor: {studentData.mentorName}</p>
            </div>

            <div className="min-h-[160px]" />
          </div>
        )}
      </main>
    </div>
  );
}