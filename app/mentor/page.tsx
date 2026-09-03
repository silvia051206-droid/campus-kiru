'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Student {
  id: string;
  name: string;
  level: string;
  lastAccess: string;
  skillCoins: number;
  avatarText: string;
  linkedParent?: string;
}

interface UserAccount {
  id: string;
  name: string;
  username: string;
  role: "alumno" | "mentor" | "padre" | "admin";
}

const DEFAULT_USERS: UserAccount[] = [
  { id: "1", name: "Carmen Fernández", username: "carmen", role: "alumno" },
  { id: "2", name: "Tutor Principal", username: "mentor", role: "mentor" },
  { id: "3", name: "Familia Fernández", username: "familia", role: "padre" },
  { id: "4", name: "Administrador General", username: "admin", role: "admin" },
];

const initialStudents: Student[] = [
  {
    id: '1',
    name: 'Carmen Fernández',
    level: 'Explorador',
    lastAccess: 'Hoy 11:50',
    skillCoins: 19,
    avatarText: 'CF',
    linkedParent: 'familia'
  }
];

export default function MentorPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<
    'inicio' | 'estadisticas' | 'asignar' | 'calculalo' | 'memiro' | 'informe'
  >('inicio');

  const [parentUsername, setParentUsername] = useState('');
  const [familyUsers, setFamilyUsers] = useState<UserAccount[]>([]);
  const [linkSuccess, setLinkSuccess] = useState(false);

  // Cargar usuarios con rol padre/madre registrados en el sistema
  useEffect(() => {
    let allUsers = DEFAULT_USERS;
    const savedUsers = localStorage.getItem("kiru_custom_users");
    if (savedUsers) {
      try {
        allUsers = JSON.parse(savedUsers);
      } catch (e) {
        console.error(e);
      }
    }
    const padres = allUsers.filter(u => u.role === "padre");
    setFamilyUsers(padres);
  }, []);

  const handleLinkParent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !parentUsername) return;

    setStudents(prev =>
      prev.map(s =>
        s.id === selectedStudent.id ? { ...s, linkedParent: parentUsername } : s
      )
    );
    setSelectedStudent(prev => prev ? { ...prev, linkedParent: parentUsername } : null);
    setLinkSuccess(true);
    setTimeout(() => setLinkSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Cabecera con botón de apagado en negro (Opción A) */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif text-[#0F172A]">Campus Método Kiru</h1>
            <span className="text-xs text-slate-500 font-medium">Panel del Mentor</span>
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

        {/* LISTA PRINCIPAL DE ALUMNOS */}
        {!selectedStudent ? (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#0F172A]">Alumnos asignados</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Selecciona un alumno para revisar su historial o gestionar actividades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {students.map((student) => (
                <div
                  key={student.id}
                  onClick={() => {
                    setSelectedStudent(student);
                    setParentUsername(student.linkedParent || '');
                  }}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-4 sm:gap-5"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-base sm:text-lg font-bold text-slate-600 shrink-0">
                    {student.avatarText}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-serif text-slate-900">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block px-2.5 py-0.5 text-xs rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                        Nivel: {student.level}
                      </span>
                      {student.linkedParent && (
                        <span className="inline-block px-2.5 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-200">
                          Familia: @{student.linkedParent}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Último acceso: <span className="text-slate-600 font-medium">{student.lastAccess}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* VISTA INDIVIDUAL DEL ALUMNO */
          <div>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 border border-rose-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-rose-50 transition"
              >
                ← Volver a lista de alumnos
              </button>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Alumno:</span>
                <span className="text-base sm:text-lg font-serif text-slate-900">
                  {selectedStudent.name}
                </span>
              </div>
            </div>

            {/* NAVEGACIÓN SUPERIOR */}
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
                    className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition ${
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

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-8">
              {activeTab === 'inicio' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif text-slate-900 mb-2">Historial de Actividad</h2>
                    <p className="text-xs text-slate-400 mb-6">Registro cronológico de la interacción del alumno con el campus.</p>
                    <div className="space-y-4 border-l-2 border-slate-100 ml-3 pl-5">
                      <div className="relative">
                        <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white" />
                        <p className="text-xs font-bold text-slate-400">Hoy 11:58</p>
                        <p className="text-sm font-medium text-slate-800 mt-0.5">
                          Ha terminado la actividad <span className="font-semibold text-slate-900">“Vocabulary — Unit 1”</span> con 8/10.
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

                  {/* VINCULAR FAMILIA CON DESPLEGABLE */}
                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-base font-serif text-slate-900 mb-1">Vincular Familia</h3>
                    <p className="text-xs text-slate-500 mb-3">
                      Selecciona la cuenta de padre o tutor legal registrada para asignarla a {selectedStudent.name}.
                    </p>
                    <form onSubmit={handleLinkParent} className="flex flex-col sm:flex-row gap-3 max-w-md">
                      <select
                        value={parentUsername}
                        onChange={(e) => setParentUsername(e.target.value)}
                        className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-slate-800"
                        required
                      >
                        <option value="">-- Selecciona un padre / tutor --</option>
                        {familyUsers.map((fam) => (
                          <option key={fam.id} value={fam.username}>
                            {fam.name} (@{fam.username})
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        disabled={!parentUsername}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition disabled:opacity-40"
                      >
                        Asignar
                      </button>
                    </form>
                    {linkSuccess && (
                      <p className="text-xs text-emerald-600 font-semibold mt-2">
                        Familia @{parentUsername} vinculada con éxito.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'estadisticas' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-slate-900 mb-2">Estadísticas del Alumno</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-[#FDFBF7] border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-1">SkillCoins Totales</span>
                      <span className="text-xl sm:text-2xl font-bold text-slate-900">{selectedStudent.skillCoins} SC</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FDFBF7] border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-1">Actividades Realizadas</span>
                      <span className="text-xl sm:text-2xl font-bold text-slate-900">1</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FDFBF7] border border-slate-100">
                      <span className="text-xs text-slate-400 block mb-1">Promedio de Acierto</span>
                      <span className="text-xl sm:text-2xl font-bold text-slate-900">80%</span>
                    </div>
                  </div>
                  <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50">
                    <p className="text-xs font-medium text-slate-400">Estructura preparada para conexión de métricas.</p>
                  </div>
                </div>
              )}

              {activeTab === 'asignar' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-slate-900 mb-2">Asignar Tarea</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Asignatura</label>
                      <select className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white">
                        <option>Inglés</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Área</label>
                      <div className="flex flex-wrap gap-2">
                        {['Vocabulary', 'Grammar', 'Reading', 'Listening', 'Writing'].map((it, idx) => (
                          <span key={it} className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${idx === 0 ? 'bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600'}`}>
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'calculalo' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-slate-900 mb-2">Calcúlalo (Acceso Mentor)</h2>
                  <div className="bg-[#FDFBF7] p-5 sm:p-6 rounded-2xl border border-slate-100 mb-6">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Instrucciones de acceso:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600">
                      <li>Pulsa en el botón «Acceder a Calcúlalo».</li>
                      <li>Selecciona la opción <strong>«Docente»</strong>.</li>
                      <li>Introduce tus claves de tutor.</li>
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

              {activeTab === 'memiro' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-slate-900 mb-2">MeMiro</h2>
                  <div className="bg-[#FDFBF7] p-5 sm:p-6 rounded-2xl border border-slate-100 mb-6">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Instrucciones:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600">
                      <li>Haz clic en «Acceder a MeMiro».</li>
                      <li>Inicia sesión con tu cuenta de tutor/mentor.</li>
                    </ol>
                  </div>
                  <a
                    href="https://memiro.metodokiru.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
                  >
                    Acceder a MeMiro
                  </a>
                </div>
              )}

              {activeTab === 'informe' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-slate-900 mb-2">Asignar Informe</h2>
                  <div className="min-h-[220px]" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}