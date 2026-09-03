'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AlumnoPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'inicio' | 'tareas' | 'progreso' | 'perfil' | 'calculalo'>('inicio');

  // Flujo interactivo de la tarea
  const [inActivity, setInActivity] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleLogout = () => {
    router.push('/');
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setShowResult(true);
    }
  };

  const resetTask = () => {
    setInActivity(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans p-6 md:p-10">
      <div className="max-w-3xl mx-auto">

        {/* BARRA SUPERIOR CON CIERRE DE SESIÓN */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-serif text-[#0F172A]">Campus Método Kiru</h1>
            <span className="text-xs text-slate-500 font-medium">Panel del Alumno</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 bg-white px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 transition"
          >
            Cerrar sesión
          </button>
        </div>

        {/* NAVEGACIÓN PRINCIPAL: Inicio | Tareas | Progreso | Perfil | Calcúlalo */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-8 p-2 flex flex-wrap gap-2">
          {[
            { id: 'inicio', label: 'Inicio' },
            { id: 'tareas', label: 'Tareas' },
            { id: 'progreso', label: 'Progreso' },
            { id: 'perfil', label: 'Perfil' },
            { id: 'calculalo', label: 'Calcúlalo' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                resetTask();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. PERFIL / PANEL DEL ALUMNO - INICIO */}
        {activeTab === 'inicio' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
            <h2 className="text-3xl font-serif text-[#0F172A]">Carmen</h2>
            <div className="mt-2">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-full font-medium">
                Nivel: Explorador
              </span>
            </div>

            {/* Espacio preparado para Avatar */}
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
        )}

        {/* 4. SECCIÓN CALCÚLALO */}
        {activeTab === 'calculalo' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="text-2xl font-serif text-[#0F172A] mb-4">Calcúlalo</h2>

            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-slate-100 mb-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Cómo acceder</h3>
              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600">
                <li>Pulsa «Accede».</li>
                <li>Accede como alumno.</li>
                <li>Usa tu código de clase y tu PIN.</li>
              </ol>
            </div>

            <a
              href="https://calculalo.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
            >
              Acceder a Calcúlalo
            </a>
          </div>
        )}

        {/* 5. TAREAS DEL ALUMNO (Tarea -> Ejercicio -> Respuesta -> Resultado) */}
        {activeTab === 'tareas' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            {!inActivity ? (
              <div>
                <h2 className="text-2xl font-serif text-[#0F172A] mb-6">Tareas</h2>
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
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition self-start sm:self-auto"
                  >
                    Comenzar
                  </button>
                </div>
              </div>
            ) : !showResult ? (
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
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 transition"
                >
                  Siguiente
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <h3 className="text-2xl font-serif text-slate-900 mb-2">Resultado de la actividad</h3>
                <p className="text-sm text-slate-600 mb-6">
                  Has completado la actividad con éxito. Puntuación: <span className="font-bold text-slate-900">8/10</span>
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
        )}

        {/* PROGRESO */}
        {activeTab === 'progreso' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="text-2xl font-serif text-[#0F172A] mb-4">Progreso</h2>
            <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50">
              <span className="text-xs text-slate-400">Progreso general: Nivel Explorador activo.</span>
            </div>
          </div>
        )}

        {/* PERFIL */}
        {activeTab === 'perfil' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="text-2xl font-serif text-[#0F172A] mb-4">Perfil</h2>
            <div className="space-y-2 text-xs text-slate-600">
              <p><strong className="text-slate-900">Nombre:</strong> Carmen</p>
              <p><strong className="text-slate-900">Nivel:</strong> Explorador</p>
              <p><strong className="text-slate-900">SkillCoins:</strong> 19</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}