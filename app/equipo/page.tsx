"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, Sparkles, MapPin, Clock, ArrowLeft, MessageCircle } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  category: "mentor" | "desarrollo";
  role: string;
  experience: string[];
  availability?: string;
  location?: string;
  bio: string;
  avatarText: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  // Categoría: Mentores
  {
    id: "1",
    name: "Sofía Muñoz",
    category: "mentor",
    role: "Mentora Pedagógica",
    experience: ["TDAH / AACC", "Técnicas de estudio", "Matemáticas", "Inglés"],
    availability: "Lunes a Jueves (Tardes)",
    location: "Pozuelo, Aravaca y Valdemarín",
    bio: "Graduada en Psicología con especialización educativa. Acompaño a alumnos en el desarrollo de su autonomía y metodologías de estudio personalizadas.",
    avatarText: "SM"
  },
  {
    id: "2",
    name: "Alejandro Ruiz",
    category: "mentor",
    role: "Mentor Académico",
    experience: ["ESO / Bachillerato", "Física y Química", "Organización"],
    availability: "Tardes y mañanas de fin de semana",
    location: "Chamberí y Madrid Noroeste",
    bio: "Estudiante de Ingeniería y mentor educativo con más de 3 años de experiencia en apoyo escolar a domicilio y refuerzo motivacional.",
    avatarText: "AR"
  },
  // Categoría: Desarrollo Método Kiru
  {
    id: "3",
    name: "M. Sofía Muñoz",
    category: "desarrollo",
    role: "Fundadora & Dirección",
    experience: ["Pedagogía activa", "Dirección de programas", "Atención a familias"],
    bio: "Fundadora de Método Kiru. Diseño y superviso los planes educativos y el acompañamiento estratégico de cada familia.",
    avatarText: "KM"
  },
  {
    id: "4",
    name: "Silvia",
    category: "desarrollo",
    role: "Proveedora Tecnológica",
    experience: ["Desarrollo web", "Campus Virtual", "Next.js & Arquitectura"],
    bio: "Responsable técnica de la infraestructura digital, diseño del campus educativo y herramientas de aprendizaje interactivo.",
    avatarText: "ST"
  }
];

export default function EquipoPage() {
  const [filter, setFilter] = useState<"todos" | "mentor" | "desarrollo">("todos");

  const mentores = TEAM_MEMBERS.filter((m) => m.category === "mentor");
  const desarrollo = TEAM_MEMBERS.filter((m) => m.category === "desarrollo");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans pb-16">
      {/* Barra de navegación superior limpia */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
            title="Volver"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-lg sm:text-xl text-slate-900 font-bold">Método Kiru</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Nuestro Equipo</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/34600000000?text=Hola,%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20M%C3%A9todo%20Kiru"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-[#F7F6F3] text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-300 transition shadow-sm"
          >
            Plataforma Kiru
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Cabecera descriptiva */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-200">
            Acompañamiento a domicilio
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-slate-900">Equipo y Mentores</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Profesionales comprometidos con el desarrollo de la autonomía, técnicas de estudio y apoyo académico personalizado en Pozuelo, Aravaca, Valdemarín y Chamberí.
          </p>
        </div>

        {/* Selector de categoría */}
        <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex gap-1 text-xs font-semibold">
            {[
              { id: "todos", label: "Todo el Equipo" },
              { id: "mentor", label: "Mentores Educativos" },
              { id: "desarrollo", label: "Desarrollo Método Kiru" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl transition ${
                  filter === tab.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECCIÓN 1: MENTORES */}
        {(filter === "todos" || filter === "mentor") && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Users className="w-4 h-4 text-emerald-800" />
              <h3 className="font-serif text-lg text-slate-900">Mentores</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mentores.map((m) => (
                <div
                  key={m.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#F7F6F3] border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-lg shrink-0">
                        {m.avatarText}
                      </div>
                      <div>
                        <h4 className="font-serif text-lg text-slate-900">{m.name}</h4>
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block">
                          {m.role}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {m.bio}
                    </p>

                    <div className="space-y-1.5 pt-1 text-[11px] text-slate-500">
                      {m.availability && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span><strong>Disponibilidad:</strong> {m.availability}</span>
                        </div>
                      )}
                      {m.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span><strong>Zonas:</strong> {m.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Áreas de experiencia:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.experience.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-[#FAF8F5] border border-slate-200 text-slate-700 text-[10px] font-medium rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECCIÓN 2: DESARROLLO MÉTODO KIRU */}
        {(filter === "todos" || filter === "desarrollo") && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Sparkles className="w-4 h-4 text-slate-700" />
              <h3 className="font-serif text-lg text-slate-900">Desarrollo Método Kiru</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {desarrollo.map((m) => (
                <div
                  key={m.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-serif text-lg font-bold shrink-0">
                        {m.avatarText}
                      </div>
                      <div>
                        <h4 className="font-serif text-lg text-slate-900">{m.name}</h4>
                        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 inline-block">
                          {m.role}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {m.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {m.experience.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-[#FAF8F5] border border-slate-200 text-slate-700 text-[10px] font-medium rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}