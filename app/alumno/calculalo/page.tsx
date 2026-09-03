'use client';

import React from 'react';
import Link from 'next/link';

export default function CalculaloAlumnoPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* NAVEGACIÓN DEL ALUMNO */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-8 p-2 flex flex-wrap gap-2">
          <Link href="/alumno" className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
            Inicio
          </Link>
          <Link href="/alumno/tareas" className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
            Tareas
          </Link>
          <Link href="/alumno" className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
            Progreso
          </Link>
          <Link href="/alumno" className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
            Perfil
          </Link>
          <Link href="/alumno/calculalo" className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white transition">
            Calcúlalo
          </Link>
        </div>

        {/* INSTRUCCIONES DEL SPRINT 1 */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-serif text-slate-900 mb-2">Cómo acceder</h2>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600">
            <li>Pulsa «Accede».</li>
            <li>Accede como alumno (opción «Estudiante»).</li>
            <li>Usa tu código de clase y tu PIN.</li>
          </ol>
        </div>

        {/* TARJETA VISUAL EXACTA A CALCULALO.APP */}
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
          
          <div className="text-center mb-8">
            <span className="text-sm font-bold tracking-widest text-[#4F46E5] uppercase">
              CALCULALO
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-3">
              Iniciar sesión en Calcúlalo
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Elige cómo quieres acceder
            </p>
          </div>

          <div className="space-y-4">
            {/* Opción Docente */}
            <a
              href="https://calculalo.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-[#FBFBFF] hover:border-indigo-300 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-base">
                  🎓
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">Docente</p>
                  <p className="text-xs text-slate-400">Accede a tu aula y gestiona tus alumnos</p>
                </div>
              </div>
              <span className="text-slate-300 font-bold text-sm">›</span>
            </a>

            {/* Opción Padre / Madre */}
            <a
              href="https://calculalo.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-[#FBFBFF] hover:border-indigo-300 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base">
                  👥
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">Padre / Madre</p>
                  <p className="text-xs text-slate-400">Supervisa el progreso de tus hijos</p>
                </div>
              </div>
              <span className="text-slate-300 font-bold text-sm">›</span>
            </a>

            {/* Opción Estudiante */}
            <a
              href="https://calculalo.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/20 hover:bg-emerald-50/40 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base">
                  🎒
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">Estudiante</p>
                  <p className="text-xs text-slate-500">Entra a tu clase con tu código o QR</p>
                </div>
              </div>
              <span className="text-emerald-600 font-bold text-sm">›</span>
            </a>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://calculalo.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block py-3 px-4 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
            >
              Acceder a Calcúlalo
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}