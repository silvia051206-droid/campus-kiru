"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Layers, 
  BookOpen, 
  TrendingUp, 
  Plus, 
  Send, 
  ExternalLink, 
  Save, 
  CheckCircle2, 
  X 
} from "lucide-react";

interface UserAccount {
  id: string;
  name: string;
  username: string;
  role: string;
}

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  category: string;
  targetStudents: string[]; // usernames o "todos"
}

export default function MentorPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"mehmiro" | "flashcards" | "asignaturas" | "estadisticas">("mehmiro");

  const [students, setStudents] = useState<UserAccount[]>([
    { id: "1", name: "Carmen Fernández", username: "carmen", role: "alumno" }
  ]);
  const [selectedStudent, setSelectedStudent] = useState<string>("carmen");

  // Notificación
  const [msg, setMsg] = useState<string | null>(null);

  // Estados Flashcards
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [cardTerm, setCardTerm] = useState("");
  const [cardDef, setCardDef] = useState("");
  const [cardCategory, setCardCategory] = useState("Geografía");
  const [selectedTargets, setSelectedTargets] = useState<string[]>(["carmen"]);

  // Estados Asignaturas
  const [subjectId, setSubjectId] = useState("geo");
  const [subjectNote, setSubjectNote] = useState("");
  const [subjectLink, setSubjectLink] = useState("");

  // Cargar datos
  useEffect(() => {
    const customUsers = localStorage.getItem("kiru_custom_users");
    if (customUsers) {
      try {
        const parsed: UserAccount[] = JSON.parse(customUsers);
        const onlyStudents = parsed.filter((u) => u.role === "alumno");
        if (onlyStudents.length > 0) {
          setStudents(onlyStudents);
          setSelectedStudent(onlyStudents[0].username);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const savedCards = localStorage.getItem("kiru_custom_flashcards");
    if (savedCards) {
      try {
        setCards(JSON.parse(savedCards));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Guardar y enviar Flashcard
  const handleCreateFlashcard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardTerm.trim() || !cardDef.trim() || selectedTargets.length === 0) return;

    const newCard: Flashcard = {
      id: Date.now().toString(),
      term: cardTerm.trim(),
      definition: cardDef.trim(),
      category: cardCategory,
      targetStudents: selectedTargets,
    };

    const updated = [newCard, ...cards];
    setCards(updated);
    localStorage.setItem("kiru_custom_flashcards", JSON.stringify(updated));

    setCardTerm("");
    setCardDef("");
    setMsg("Flashcard creada y asignada con éxito.");
    setTimeout(() => setMsg(null), 3000);
  };

  const toggleStudentSelection = (username: string) => {
    if (selectedTargets.includes(username)) {
      setSelectedTargets(selectedTargets.filter((u) => u !== username));
    } else {
      setSelectedTargets([...selectedTargets, username]);
    }
  };

  // Guardar recurso de Asignatura
  const handleSaveSubjectResource = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      subjectId,
      note: subjectNote,
      link: subjectLink,
      updatedAt: new Date().toLocaleDateString("es-ES"),
    };
    localStorage.setItem(`kiru_resource_${subjectId}_${selectedStudent}`, JSON.stringify(payload));
    setSubjectNote("");
    setSubjectLink("");
    setMsg("Recurso asignado correctamente al alumno.");
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pb-16 font-sans">
      {/* Cabecera con botón de desconexión en negro */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-serif font-bold">
            M
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl text-slate-900 font-bold">Panel de Mentor</h1>
            <p className="text-[11px] sm:text-xs text-slate-500">Gestión formativa y seguimiento de alumnos</p>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          title="Cerrar sesión"
          className="p-2 sm:p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 transition shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-slate-900"
          >
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Notificación toast */}
        {msg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between shadow-sm">
            <span>{msg}</span>
            <button onClick={() => setMsg(null)}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Barra superior de pestañas del mentor */}
        <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex flex-wrap gap-2 shadow-sm text-xs font-semibold w-fit">
          <button
            onClick={() => setActiveTab("mehmiro")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === "mehmiro" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Mehmiro</span>
          </button>

          <button
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === "flashcards" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Enviar Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab("asignaturas")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === "asignaturas" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Asignaturas & Enlaces</span>
          </button>

          <button
            onClick={() => setActiveTab("estadisticas")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === "estadisticas" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>SkillCoins Semanales</span>
          </button>
        </div>

        {/* PESTAÑA 1: MEHMIRO */}
        {activeTab === "mehmiro" && (
          <div className="space-y-5">
            {/* Banner de integración oficial con Mehmiro */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Plataforma Externa</span>
                <h3 className="text-lg font-serif text-slate-900">Acceso a Mehmiro</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Gestiona las sesiones, fichas y reportes pedagógicos directamente en la app oficial de Mehmiro.
                </p>
              </div>

              <a
                href="https://app.mehmiro.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition shadow-sm w-fit"
              >
                <span>Abrir app.mehmiro.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div>
              <h2 className="text-xl font-serif text-slate-900">Alumnos Asignados</h2>
              <p className="text-xs text-slate-500">Selecciona un alumno para revisar su estado y herramientas activas.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {students.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setSelectedStudent(st.username)}
                  className={`p-5 rounded-2xl border cursor-pointer transition shadow-sm space-y-3 ${
                    selectedStudent === st.username
                      ? "bg-white border-slate-900 ring-2 ring-slate-900/5"
                      : "bg-white border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-slate-200 flex items-center justify-center font-bold text-slate-700">
                      {st.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-serif text-sm text-slate-900 font-medium">{st.name}</h3>
                      <p className="text-[11px] text-slate-400 font-mono">@{st.username}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-100">
                    <span>Nivel: Explorador (1)</span>
                    <a
                      href="https://app.mehmiro.com/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline font-bold inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Ver en Mehmiro</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PESTAÑA 2: FLASHCARDS (CREAR Y ENVIAR) */}
        {activeTab === "flashcards" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Formulario */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 md:col-span-1 h-fit">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-800" />
                <h3 className="font-serif text-base text-slate-900">Crear Flashcard</h3>
              </div>

              <form onSubmit={handleCreateFlashcard} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Materia / Asignatura
                  </label>
                  <select
                    value={cardCategory}
                    onChange={(e) => setCardCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Geografía">Geografía</option>
                    <option value="Historia">Historia</option>
                    <option value="Física">Física</option>
                    <option value="Lengua">Lengua</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Química">Química</option>
                    <option value="Biología">Biología</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Término / Concepto
                  </label>
                  <input
                    type="text"
                    value={cardTerm}
                    onChange={(e) => setCardTerm(e.target.value)}
                    placeholder="Ej: Afluente"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Definición
                  </label>
                  <textarea
                    rows={3}
                    value={cardDef}
                    onChange={(e) => setCardDef(e.target.value)}
                    placeholder="Definición clara y concisa..."
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Enviar a:
                  </label>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto p-2 bg-[#FAF8F5] rounded-xl border border-slate-200 text-xs">
                    {students.map((st) => (
                      <label key={st.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTargets.includes(st.username)}
                          onChange={() => toggleStudentSelection(st.username)}
                          className="rounded border-slate-300 text-slate-900 focus:ring-0"
                        />
                        <span>{st.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Crear y Enviar
                </button>
              </form>
            </div>

            {/* Listado de tarjetas enviadas */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 md:col-span-2">
              <h3 className="font-serif text-base text-slate-900">Flashcards Creadas ({cards.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cards.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl border border-slate-100 bg-[#FAF8F5] space-y-2 shadow-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                        {c.category}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {c.targetStudents.length} alumno(s)
                      </span>
                    </div>
                    <h4 className="font-serif text-sm text-slate-900 font-bold">{c.term}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{c.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 3: ASIGNATURAS Y ENLACES */}
        {activeTab === "asignaturas" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-xl">
            <div>
              <h3 className="font-serif text-base text-slate-900">Recomendaciones por Asignatura</h3>
              <p className="text-xs text-slate-500">Envía notas pedagógicas y enlaces a vídeos o actividades para el alumno.</p>
            </div>

            <form onSubmit={handleSaveSubjectResource} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Alumno Destinatario
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.username}>
                      {st.name} (@{st.username})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Asignatura
                </label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                >
                  <option value="geo">Geografía</option>
                  <option value="his">Historia</option>
                  <option value="fis">Física</option>
                  <option value="len">Lengua</option>
                  <option value="ing">Inglés</option>
                  <option value="qui">Química</option>
                  <option value="bio">Biología</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Recomendación o Mensaje
                </label>
                <textarea
                  rows={3}
                  value={subjectNote}
                  onChange={(e) => setSubjectNote(e.target.value)}
                  placeholder="Ej: Revisa el vídeo del canal antes de la sesión del jueves."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Enlace opcional (YouTube, documento, etc.)
                </label>
                <input
                  type="url"
                  value={subjectLink}
                  onChange={(e) => setSubjectLink(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" /> Asignar Recurso
              </button>
            </form>
          </div>
        )}

        {/* PESTAÑA 4: SKILLCOINS SEMANALES */}
        {activeTab === "estadisticas" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 max-w-md">
            <div>
              <h3 className="font-serif text-base text-slate-900">SkillCoins Semanales (No acumuladas)</h3>
              <p className="text-xs text-slate-500">
                Registra las SkillCoins logradas por el alumno en la última sesión semanal.
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Alumno
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
              >
                {students.map((st) => (
                  <option key={st.id} value={st.username}>
                    {st.name} (@{st.username})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Ej: 5"
                id="weeklyCoinsInput"
                className="w-28 p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-slate-800"
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById("weeklyCoinsInput") as HTMLInputElement;
                  if (input && input.value) {
                    const val = parseInt(input.value);
                    const today = new Date().toLocaleDateString("es-ES");
                    localStorage.setItem(`kiru_sc_${selectedStudent}`, JSON.stringify({ coins: val, date: today }));
                    setMsg(`Guardado: ${val} SC asignadas el ${today}`);
                    setTimeout(() => setMsg(null), 3000);
                  }
                }}
                className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
              >
                Guardar semana
              </button>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Actualizado automáticamente en la vista de progreso del alumno y la familia.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}