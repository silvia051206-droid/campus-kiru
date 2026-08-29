"use client";

import Link from "next/link";
import { ArrowLeft, GraduationCap, Users, BookOpen, ExternalLink, X } from "lucide-react";

export default function CalculaloAlumnoPage() {
  return (
    <div className="min-h-screen bg-kiru-bg pb-12">
      <header className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/alumno"
            className="p-2 rounded-xl bg-[#F7F6F3] border border-kiru-border text-kiru-muted hover:text-kiru-text transition-colors flex items-center gap-1 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al campus
          </Link>
          <h1 className="font-serif text-2xl text-kiru-text">Calcúlalo</h1>
        </div>
        <Link href="/" className="text-xs font-semibold text-red-500 hover:underline">
          Cerrar sesión
        </Link>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-6">
        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm">
          <h2 className="font-serif text-lg text-kiru-text mb-2">Cómo acceder</h2>
          <ol className="list-decimal list-inside text-xs text-kiru-muted space-y-1.5 leading-relaxed">
            <li>Pulsa en la opción <strong>«Estudiante»</strong>.</li>
            <li>Accede como alumno.</li>
            <li>Usa tu código de clase y tu PIN.</li>
          </ol>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-kiru-border shadow-sm relative space-y-5">
          <div className="text-center space-y-1">
            <p className="text-xs font-bold tracking-widest text-[#4A69E2] uppercase">CALCULALO</p>
            <h2 className="font-serif text-2xl text-kiru-text">Iniciar sesión en Calcúlalo</h2>
            <p className="text-xs text-kiru-muted">Elige cómo quieres acceder</p>
          </div>

          <div className="space-y-3">
            <a
              href="https://calculalo.app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl border border-kiru-border hover:border-kiru-forest transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F6F3] flex items-center justify-center text-[#7C3AED]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-kiru-text">Docente</h3>
                  <p className="text-xs text-kiru-muted">Accede a tu aula y gestiona tus alumnos</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-kiru-muted group-hover:text-kiru-text transition-colors" />
            </a>

            <a
              href="https://calculalo.app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl border border-kiru-border hover:border-kiru-forest transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F7F6F3] flex items-center justify-center text-[#2563EB]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-kiru-text">Padre / Madre</h3>
                  <p className="text-xs text-kiru-muted">Supervisa el progreso de tus hijos</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-kiru-muted group-hover:text-kiru-text transition-colors" />
            </a>

            <a
              href="https://calculalo.app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl border-2 border-[#10B981] bg-[#10B981]/5 hover:bg-[#10B981]/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-kiru-border flex items-center justify-center text-[#10B981]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-kiru-text">Estudiante</h3>
                  <p className="text-xs text-kiru-muted">Entra a tu clase con tu código o QR</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#10B981] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}