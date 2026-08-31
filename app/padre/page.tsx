"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Sparkles, Award, Clock, ArrowUpRight } from "lucide-react";

export default function PanelFamiliarPage() {
  const [linkedStudent, setLinkedStudent] = useState({
    name: "Carmen Fernández",
    level: "Explorador",
    skillCoins: 19,
    lastAccess: "Hoy 11:50",
    tasksCompleted: 14,
    accuracy: "92%"
  });

  // Si el mentor cambió la vinculación, se actualiza automáticamente
  useEffect(() => {
    const saved = localStorage.getItem("kiru_students_links");
    if (saved) {
      try {
        const students = JSON.parse(saved);
        const match = students.find((s: any) => s.parentLinked.includes("familia"));
        if (match) {
          setLinkedStudent((prev) => ({
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

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm">
          <h2 className="font-serif text-lg text-kiru-text">Alumno vinculado a tu cuenta</h2>
          <p className="text-xs text-kiru-muted mt-0.5">
            Información sincronizada con el mentor y la actividad en tiempo real del campus.
          </p>
        </div>

        {/* Tarjeta del alumno vinculado (Requisito Sprint 1) */}
        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-kiru-forest-light border border-kiru-forest/20 flex items-center justify-center font-serif text-2xl text-kiru-forest font-bold shrink-0">
                {linkedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif text-xl text-kiru-text font-bold">{linkedStudent.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-kiru-muted font-semibold">Nivel:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-kiru-forest-light text-kiru-forest text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {linkedStudent.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Contador de SkillCoins */}
            <div className="bg-[#F7F6F3] p-4 rounded-2xl border border-kiru-border text-center sm:min-w-[140px]">
              <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">SkillCoins</p>
              <p className="font-serif text-3xl font-bold text-kiru-forest mt-0.5">{linkedStudent.skillCoins}</p>
            </div>
          </div>

          {/* Estadísticas básicas (Requisito Sprint 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-kiru-border">
            <div className="p-3.5 bg-[#F7F6F3] rounded-2xl border border-kiru-border">
              <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">Último acceso</p>
              <p className="text-xs font-bold text-kiru-text mt-1">{linkedStudent.lastAccess}</p>
            </div>

            <div className="p-3.5 bg-[#F7F6F3] rounded-2xl border border-kiru-border">
              <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">Actividades realizadas</p>
              <p className="text-xs font-bold text-kiru-text mt-1">{linkedStudent.tasksCompleted} completadas</p>
            </div>

            <div className="p-3.5 bg-[#F7F6F3] rounded-2xl border border-kiru-border">
              <p className="text-[10px] uppercase font-bold text-kiru-muted tracking-wider">Precisión media</p>
              <p className="text-xs font-bold text-kiru-forest mt-1">{linkedStudent.accuracy} de acierto</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}