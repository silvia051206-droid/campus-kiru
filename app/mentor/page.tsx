"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Sparkles, 
  ChevronRight, 
  Link2, 
  CheckCircle2, 
  UserCheck, 
  Clock 
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  level: string;
  lastAccess: string;
  skillCoins: number;
  parentLinked: string;
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: "carmen",
    name: "Carmen Fernández",
    level: "Explorador",
    lastAccess: "Hoy 11:50",
    skillCoins: 19,
    parentLinked: "Familia Fernández (familia)"
  },
  {
    id: "mateo",
    name: "Mateo Gómez",
    level: "Explorador",
    lastAccess: "Ayer 18:30",
    skillCoins: 12,
    parentLinked: "Sin vincular"
  },
  {
    id: "lucia",
    name: "Lucía Navarro",
    level: "Explorador",
    lastAccess: "28 Agosto 16:15",
    skillCoins: 24,
    parentLinked: "Sin vincular"
  }
];

const AVAILABLE_PARENTS = [
  { id: "familia", name: "Familia Fernández (usuario: familia)" },
  { id: "familia_gomez", name: "Familia Gómez (usuario: fam_gomez)" },
  { id: "familia_navarro", name: "Familia Navarro (usuario: fam_navarro)" }
];

export default function MentorDashboardPage() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedParent, setSelectedParent] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Cargar vinculaciones previas si existen en localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kiru_students_links");
    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleOpenLinkModal = (student: Student, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedStudent(student);
    setSelectedParent(student.parentLinked.includes("Sin vincular") ? AVAILABLE_PARENTS[0].name : student.parentLinked);
  };

  const handleSaveLink = () => {
    if (!selectedStudent) return;
    const updated = students.map((s) =>
      s.id === selectedStudent.id ? { ...s, parentLinked: selectedParent } : s
    );
    setStudents(updated);
    localStorage.setItem("kiru_students_links", JSON.stringify(updated));
    setSuccessMsg(`Vinculación actualizada: ${selectedStudent.name} ↔ ${selectedParent}`);
    setSelectedStudent(null);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="min-h-screen bg-kiru-bg pb-16">
      {/* Barra de cabecera */}
      <header className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div>
          <h1 className="font-serif text-2xl text-kiru-text">Panel del Mentor</h1>
          <p className="text-xs text-kiru-muted">Gestión de alumnos y acompañamiento educativo</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-kiru-forest-light text-kiru-forest text-xs font-semibold">
            <UserCheck className="w-3.5 h-3.5" /> Mentor Activo
          </span>
          <Link href="/" className="text-xs font-semibold text-red-500 hover:underline">
            Cerrar sesión
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Banner de bienvenida y vinculación */}
        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl text-kiru-text">Tus alumnos asignados</h2>
            <p className="text-xs text-kiru-muted mt-0.5">
              Haz clic en la tarjeta de un alumno para ver su expediente o en «Vincular Familia» para asignarle un padre/madre.
            </p>
          </div>
          <div className="px-4 py-2 bg-[#F7F6F3] border border-kiru-border rounded-2xl text-xs text-kiru-muted flex items-center gap-2">
            <Users className="w-4 h-4 text-kiru-forest" />
            <span><strong>{students.length}</strong> alumnos activos</span>
          </div>
        </div>

        {/* Notificación de éxito */}
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Listado de tarjetas de alumnos (Requisito Sprint 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => (
            <Link
              key={student.id}
              href={`/mentor/${student.id}`}
              className="bg-kiru-card p-6 rounded-3xl border border-kiru-border hover:border-kiru-forest transition-all shadow-xs hover:shadow-md group flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                {/* Avatar a la izquierda con tamaño visible */}
                <div className="w-16 h-16 rounded-2xl bg-kiru-forest-light border border-kiru-forest/20 flex items-center justify-center font-serif text-2xl text-kiru-forest font-bold shrink-0">
                  {student.name.charAt(0)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-kiru-text font-bold group-hover:text-kiru-forest transition-colors">
                      {student.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-kiru-muted group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-kiru-muted">
                    <span className="font-semibold text-kiru-text">Nivel:</span>
                    <span className="px-2 py-0.5 rounded-md bg-kiru-forest-light text-kiru-forest font-semibold text-[11px]">
                      {student.level}
                    </span>
                  </div>

                  <p className="text-[11px] text-kiru-muted flex items-center gap-1 pt-1">
                    <Clock className="w-3 h-3 text-kiru-muted" /> Último acceso: {student.lastAccess}
                  </p>
                </div>
              </div>

              {/* Pie de tarjeta con vinculación de familia */}
              <div className="pt-3 border-t border-kiru-border/60 flex items-center justify-between text-xs">
                <span className="text-kiru-muted truncate max-w-[200px]">
                  Familia: <strong className="text-kiru-text">{student.parentLinked}</strong>
                </span>
                <button
                  onClick={(e) => handleOpenLinkModal(student, e)}
                  className="px-3 py-1.5 rounded-xl border border-kiru-border bg-[#F7F6F3] hover:bg-kiru-forest hover:text-white hover:border-kiru-forest text-kiru-text font-semibold text-[11px] transition-all flex items-center gap-1.5"
                >
                  <Link2 className="w-3 h-3" /> Vincular Familia
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Modal de Vinculación Mentor ↔ Familia */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 border border-kiru-border max-w-md w-full shadow-2xl space-y-5">
            <div className="space-y-1 text-center">
              <div className="w-10 h-10 rounded-2xl bg-kiru-forest-light text-kiru-forest flex items-center justify-center mx-auto mb-2">
                <Link2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-kiru-text">Vincular Padre/Madre</h3>
              <p className="text-xs text-kiru-muted">
                Asigna el usuario familiar responsable del seguimiento de <strong>{selectedStudent.name}</strong>.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider">
                Seleccionar Familia / Tutor Legal
              </label>
              <select
                value={selectedParent}
                onChange={(e) => setSelectedParent(e.target.value)}
                className="w-full p-3 rounded-2xl border border-kiru-border bg-[#F7F6F3] text-xs font-semibold text-kiru-text focus:outline-none focus:border-kiru-forest"
              >
                {AVAILABLE_PARENTS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="flex-1 py-2.5 rounded-xl border border-kiru-border text-xs font-semibold text-kiru-muted hover:bg-[#F7F6F3] transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveLink}
                className="flex-1 py-2.5 rounded-xl bg-kiru-forest text-white text-xs font-semibold hover:bg-kiru-forest-hover transition-colors shadow-xs"
              >
                Guardar vinculación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}