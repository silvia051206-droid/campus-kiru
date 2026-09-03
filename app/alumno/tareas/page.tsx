'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TareasPage() {
  const router = useRouter();
  const [inActivity, setInActivity] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const resetTask = () => {
    setInActivity(false);
    setSelectedAnswer(null);
    setIsFinished(false);
  };

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
          <Link href="/alumno" className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
            Inicio
          </Link>
          <Link href="/alumno/tareas" className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white shadow-sm transition">
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

        {/* Pantalla de tareas y actividad interactiva */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          {!inActivity ? (
            <div>
              <h2 className="text-2xl font-serif text-[#0F172A] mb-6">Tareas Asignadas</h2>
              <div className="p-6 border border-slate-100 rounded-2xl bg-[#FDFBF7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    INGLÉS
                  </span>
                  <h3 className="text-xl font-serif text-slate-900 mt-1">
                    Unit 1 · Vocabulary
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    10 ejercicios · Dificultad: Media
                  </p>
                </div>
                <button
                  onClick={() => setInActivity(true)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
                >
                  Comenzar
                </button>
              </div>
            </div>
          ) : !isFinished ? (
            <div>
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Vocabulary · Unit 1
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  Pregunta 1/10
                </span>
              </div>

              <h3 className="text-lg font-serif text-slate-900 mb-6">
                Choose the correct answer:
              </h3>

              <div className="space-y-3 mb-6">
                {['Answer A', 'Answer B', 'Answer C', 'Answer D'].map((ans) => (
                  <button
                    key={ans}
                    onClick={() => setSelectedAnswer(ans)}
                    className={`w-full p-4 rounded-xl border text-sm text-left transition ${
                      selectedAnswer === ans
                        ? 'border-slate-900 bg-slate-50 font-bold text-slate-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {ans}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  if (selectedAnswer) setIsFinished(true);
                }}
                disabled={!selectedAnswer}
                className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 transition"
              >
                Siguiente
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <h3 className="text-2xl font-serif text-slate-900 mb-2">
                Resultado de la actividad
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Has completado la actividad correctamente. Puntuación obtenida:{' '}
                <span className="font-bold text-slate-900">8/10</span>
              </p>
              <button
                onClick={resetTask}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
              >
                Volver a Tareas
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}