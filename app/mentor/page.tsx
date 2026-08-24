"use client";

import Link from "next/link";

export default function MentorStudentList() {
  const students = [
    {
      id: "carmen",
      name: "Carmen",
      level: "Explorador",
      lastAccess: "Hoy a las 11:50",
      avatarLetter: "C",
    },
  ];

  return (
    <div className="min-h-screen bg-kiru-bg">
      <header className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex justify-between items-center">
        <h1 className="font-serif text-2xl text-kiru-text">Panel del Mentor</h1>
        <Link href="/" className="text-xs font-semibold text-red-500 hover:underline">
          Cerrar sesión
        </Link>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h2 className="font-serif text-3xl text-kiru-text mb-1">Mis Alumnos</h2>
          <p className="text-xs text-kiru-muted">Selecciona un alumno para revisar su historial o asignar tareas curriculares.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => (
            <Link
              key={student.id}
              href={`/mentor/${student.id}`}
              className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm flex items-center gap-5 hover:border-kiru-forest transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-kiru-forest-light text-kiru-forest font-serif text-2xl flex items-center justify-center font-bold">
                {student.avatarLetter}
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl text-kiru-text">{student.name}</h3>
                <span className="inline-block my-1 text-[10px] bg-kiru-forest-light text-kiru-forest font-semibold px-2.5 py-0.5 rounded-full uppercase">
                  Nivel: {student.level}
                </span>
                <p className="text-xs text-kiru-muted mt-1">Último acceso: {student.lastAccess}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}