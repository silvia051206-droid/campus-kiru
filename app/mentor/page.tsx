'use client';

import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  level: string;
  lastAccess: string;
  skillCoins: number;
  avatarText: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Carmen Fernández',
    level: 'Explorador',
    lastAccess: 'Hoy 11:50',
    skillCoins: 19,
    avatarText: 'CF'
  }
];

export default function MentorPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<
    'inicio' | 'estadisticas' | 'asignar' | 'calculalo' | 'memiro' | 'informe'
  >('inicio');

  if (!selectedStudent) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-serif text-[#0F172A]">
              Panel del Mentor
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Selecciona un alumno para revisar su historial y gestionar sus actividades.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-600 shrink-0">
                  {student.avatarText}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-serif text-slate-900">
                    {student.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-block px-2.5 py-0.5 text-xs rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                      Nivel: {student.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Último acceso: <span className="text-slate-600 font-medium">{student.lastAccess}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedStudent(null)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 bg-white px-3 py-1.5 rounded-lg transition"
          >
            ← Volver a lista de alumnos
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">Alumno:</span>
            <span className="text-lg font-serif text-slate-900">
              {selectedStudent.name}
            </span>
          </div>
        </div>

        {/* NAVEGACIÓN SUPERIOR HORIZONTAL */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6 p-2">
          <nav className="flex flex-wrap gap-2">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'estadisticas', label: 'Estadísticas' },
              { id: 'asignar', label: 'Asignar tarea' },
              { id: 'calculalo', label: 'Calcúlalo' },
              { id: 'memiro', label: 'MeMiro' },
              { id: 'informe', label: 'Asignar informe' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* CONTENIDO SEGÚN PESTAÑA */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          {activeTab === 'inicio' && (
            <div>
              <h2 className="text-2xl font-serif text-slate-900 mb-2">
                Historial de Actividad
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Registro cronológico de la interacción del alumno con el campus.
              </p>

              <div className="space-y-4 border-l-2 border-slate-100 ml-3 pl-5">
                <div className="relative">
                  <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white" />
                  <p className="text-xs font-bold text-slate-400">Hoy 11:58</p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">
                    Ha terminado la actividad <span className="font-semibold text-slate-900">“Vocabulary — Unit 1”</span> con una puntuación de 8/10.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white" />
                  <p className="text-xs font-bold text-slate-400">Hoy 11:52</p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">
                    Ha realizado la actividad <span className="font-semibold text-slate-900">“Vocabulary — Unit 1”</span>.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white" />
                  <p className="text-xs font-bold text-slate-400">Hoy 11:50</p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">
                    El alumno ha accedido al campus.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'estadisticas' && (
            <div>
              <h2 className="text-2xl font-serif text-slate-900 mb-2">
                Estadísticas del Alumno
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Estructura de progreso, resultados y evolución para análisis pedagógico.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#FDFBF7] border border-slate-100">
                  <span className="text-xs text-slate-400 block mb-1">SkillCoins Totales</span>
                  <span className="text-2xl font-bold text-slate-900">{selectedStudent.skillCoins} SC</span>
                </div>
                <div className="p-4 rounded-xl bg-[#FDFBF7] border border-slate-100">
                  <span className="text-xs text-slate-400 block mb-1">Actividades Realizadas</span>
                  <span className="text-2xl font-bold text-slate-900">1</span>
                </div>
                <div className="p-4 rounded-xl bg-[#FDFBF7] border border-slate-100">
                  <span className="text-xs text-slate-400 block mb-1">Promedio de Acierto</span>
                  <span className="text-2xl font-bold text-slate-900">80%</span>
                </div>
              </div>

              <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50">
                <p className="text-xs font-medium text-slate-400">
                  Estructura preparada para conexión de métricas de evolución y gráficas detalladas.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'asignar' && (
            <div>
              <h2 className="text-2xl font-serif text-slate-900 mb-2">
                Asignar Tarea
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Configuración del sistema de actividades de Método Kiru.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Asignatura
                  </label>
                  <select className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-white text-slate-800">
                    <option>Inglés</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Área temática
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {['Vocabulary', 'Grammar', 'Reading', 'Listening', 'Writing'].map((item, idx) => (
                      <button
                        key={item}
                        type="button"
                        className={`p-2.5 rounded-xl border text-xs font-semibold ${
                          idx === 0
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Nivel / Unit
                    </label>
                    <select className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-white text-slate-800">
                      <option>A1 · Unit 1</option>
                      <option>A1 · Unit 2</option>
                      <option>A2 · Unit 1</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Dificultad
                    </label>
                    <select className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-white text-slate-800">
                      <option>Baja</option>
                      <option>Media</option>
                      <option>Alta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Nº Ejercicios
                    </label>
                    <select className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-white text-slate-800">
                      <option>5 ejercicios</option>
                      <option>10 ejercicios</option>
                      <option>15 ejercicios</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50"
                  >
                    Previsualizar
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                  >
                    Asignar actividad
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'calculalo' && (
            <div>
              <h2 className="text-2xl font-serif text-slate-900 mb-2">
                Calcúlalo (Acceso Mentor)
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Plataforma de cálculo y agilidad matemática.
              </p>

              <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-slate-100 mb-6">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Instrucciones de acceso para profesores:</h3>
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600">
                  <li>Pulsa en el botón inferior «Acceder a Calcúlalo».</li>
                  <li>Selecciona la opción <strong>«Acceder como profesor»</strong>.</li>
                  <li>Introduce tus credenciales de mentor asignadas.</li>
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

          {activeTab === 'memiro' && (
            <div>
              <h2 className="text-2xl font-serif text-slate-900 mb-2">
                MeMiro
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Herramienta metodológica y de evaluación pedagógica.
              </p>

              <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-slate-100 mb-6">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Instrucciones de acceso a la plataforma:</h3>
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600">
                  <li>Haz clic en el enlace oficial de MeMiro.</li>
                  <li>Inicia sesión con tu cuenta de tutor/mentor.</li>
                  <li>Consulta y actualiza la fase metodológica del alumno.</li>
                </ol>
              </div>

              <a
                href="https://memiro.metodokiru.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Acceder a MeMiro
              </a>
            </div>
          )}

          {activeTab === 'informe' && (
            <div>
              <h2 className="text-2xl font-serif text-slate-900 mb-2">
                Asignar Informe
              </h2>
              <p className="text-xs text-slate-400 mb-8">
                Módulo reservado para la generación y envío de informes periódicos a las familias.
              </p>

              <div className="border border-dashed border-slate-200 rounded-xl p-12 text-center bg-slate-50/30">
                <p className="text-xs font-medium text-slate-400">
                  Sección preparada para el desarrollo de informes en los siguientes sprints.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}