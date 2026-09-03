'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AlumnoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabecera con botón de apagado en negro (Opción A) */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif text-[#0F172A]">Campus Método Kiru</h1>
            <span className="text-xs text-slate-500 font-medium">Panel del Alumno</span>
          </div>
          <button
            onClick={() => router.push('/')}
            title="Cerrar sesión"
            className="p-2 sm:p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-900">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
          </button>
        </div>

        {/* Navegación por rutas */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-8 p-2 flex flex-wrap gap-2">
          <Link href="/alumno" className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white shadow-sm transition">
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
          <Link href="/alumno/calculalo" className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
            Calcúlalo
          </Link>
        </div>

        {/* Contenido Inicio */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#0F172A]">Carmen</h2>
          <div className="mt-2">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-full font-medium">
              Nivel: Explorador
            </span>
          </div>

          <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto my-6 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center bg-slate-50">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              AVATAR
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mt-6">
            <div className="p-4 bg-[#FDFBF7] rounded-xl border border-slate-100">
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">19</span>
              <span className="text-xs text-slate-500 font-medium">SkillCoins</span>
            </div>
            <div className="p-4 bg-[#FDFBF7] rounded-xl border border-slate-100">
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 block">3</span>
              <span className="text-xs text-slate-500 font-medium">Tareas pendientes</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}