'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AlumnoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabecera con cierre de sesión */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-serif text-[#0F172A]">Campus Método Kiru</h1>
            <span className="text-xs text-slate-500 font-medium">Panel del Alumno</span>
          </div>
          <button
            onClick={() => router.push('/')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 bg-white px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 transition"
          >
            Cerrar sesión
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
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
          <h2 className="text-3xl font-serif text-[#0F172A]">Carmen</h2>
          <div className="mt-2">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-full font-medium">
              Nivel: Explorador
            </span>
          </div>

          <div className="w-36 h-36 mx-auto my-6 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center bg-slate-50">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              AVATAR
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mt-6">
            <div className="p-4 bg-[#FDFBF7] rounded-xl border border-slate-100">
              <span className="text-3xl font-bold text-slate-900 block">19</span>
              <span className="text-xs text-slate-500 font-medium">SkillCoins</span>
            </div>
            <div className="p-4 bg-[#FDFBF7] rounded-xl border border-slate-100">
              <span className="text-3xl font-bold text-slate-900 block">3</span>
              <span className="text-xs text-slate-500 font-medium">Tareas pendientes</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}