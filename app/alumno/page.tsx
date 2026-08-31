'use client';

import React, { useState } from 'react';

export default function AlumnoPage() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'tareas' | 'progreso' | 'perfil' | 'calculalo'>('inicio');
  const [inActivity, setInActivity] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [activityFinished, setActivityFinished] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* NAVEGACIÓN SUPERIOR DEL ALUMNO */}
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
                setInActivity(false);
                setActivityFinished(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === tab.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. INICIO */}
        {activeTab === 'inicio' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm text-center">
            <h1 className="text-3xl font-serif text-slate-900">Carmen</h1>
            <span className="inline-block mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-full font-medium">
              Nivel: Explorador
            </span>

            {/* Recuadro preparado para Avatar */}
            <div className="w-32 h-32 mx-auto my-6 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center bg-slate-50">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">AVATAR</span>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mt-6">
              <div className="p-4 bg-[#FDFBF7] rounded-xl border border-slate-100">
                <span className="text-2xl font-bold text-slate-900 block">19</span>
                <span className="text-xs text-slate-500">SkillCoins</span>
              </div>
              <div className="p-4 bg-[#FDFBF7] rounded-xl border border-slate-100">
                <span className="text-2xl font-bold text-slate-900 block">3</span>
                <span className="text-xs text-slate-500">Tareas pendientes</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. TAREAS (Actividad interactiva: ejercicio -> respuesta -> resultado) */}
        {activeTab === 'tareas' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            {!inActivity ? (
              <div>
                <h2 className="text-2xl font-serif text-slate-900 mb-6">Tareas Asignadas</h2>
                <div className="p-6 border border-slate-100 rounded-2xl bg-[#FDFBF7] flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">INGLÉS</span>
                    <h3 className="text-xl font-serif text-slate-900 mt-1">Unit 1 · Vocabulary</h3>
                    <p className="text-xs text-slate-500 mt-1">10 ejercicios · Dificultad: Media</p>
                  </div>
                  <button
                    onClick={() => setInActivity(true)}
                    className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
                  >
                    Comenzar
                  </button>
                </div>
              </div>
            ) : !activityFinished ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Vocabulary · Unit 1</span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">Pregunta 1/10</span>
                </div>

                <h3 className="text-xl font-serif text-slate-900 mb-6">
                  Choose the correct answer: "She _____ to the library every Monday."
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {['go', 'goes', 'going', 'gone'].map((option, idx) => (
                    <button
                      key={option}
                      onClick={() => setSelectedAnswer(idx)}
                      className={`p-4 rounded-xl border text-sm font-medium text-left transition ${
                        selectedAnswer === idx ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold' : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      Answer {String.fromCharCode(65 + idx)}: {option}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setActivityFinished(true)}
                  disabled={selectedAnswer === null}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold disabled:opacity-40"
                >
                  Siguiente
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <h3 className="text-2xl font-serif text-slate-900 mb-2">¡Actividad completada!</h3>
                <p className="text-sm text-slate-600 mb-4">Puntuación obtenida: <span className="font-bold text-slate-900">8/10</span></p>
                <button
                  onClick={() => { setInActivity(false); setActivityFinished(false); setSelectedAnswer(null); }}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
                >
                  Volver a Tareas
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. PROGRESO */}
        {activeTab === 'progreso' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Progreso</h2>
            <p className="text-xs text-slate-500 mb-6">Resumen del avance pedagógico y competencias conseguidas.</p>
            <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50">
              <span className="text-xs text-slate-400">Progreso general acumulado: Nivel Explorador (Etapa 1).</span>
            </div>
          </div>
        )}

        {/* 4. PERFIL */}
        {activeTab === 'perfil' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Perfil del Alumno</h2>
            <div className="space-y-3 text-xs text-slate-600">
              <p><strong className="text-slate-900">Nombre:</strong> Carmen Fernández</p>
              <p><strong className="text-slate-900">Nivel:</strong> Explorador</p>
              <p><strong className="text-slate-900">Rol:</strong> Alumno</p>
            </div>
          </div>
        )}

        {/* 5. CALCÚLALO */}
        {activeTab === 'calculalo' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">Calcúlalo</h2>
            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-slate-100 mb-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Cómo acceder</h3>
              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600">
                <li>Pulsa «Accede».</li>
                <li>Accede como alumno.</li>
                <li>Usa tu código de clase y tu PIN.</li>
              </ol>
            </div>
            <a
              href="https://calculalo.metodokiru.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
            >
              Acceder a Calcúlalo
            </a>
          </div>
        )}

      </div>
    </div>
  );
}