"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  { text: "Choose the correct answer: 'She ___ my best friend.'", options: ["is", "are", "am", "be"], correct: 0 },
  { text: "What is the opposite of 'Difficult'?", options: ["Hard", "Easy", "Fast", "Slow"], correct: 1 }
];

export default function TareasPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="min-h-screen bg-kiru-bg">
      <nav className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex items-center justify-between">
        <div className="flex gap-3 text-sm font-medium">
          <Link href="/alumno" className="text-kiru-muted hover:text-kiru-text px-3.5 py-1.5 rounded-xl">Inicio</Link>
          <Link href="/alumno/tareas" className="text-kiru-forest bg-kiru-forest-light px-3.5 py-1.5 rounded-xl font-semibold">Tareas</Link>
          <Link href="/alumno/calculalo" className="text-kiru-muted hover:text-kiru-text px-3.5 py-1.5 rounded-xl">Calcúlalo</Link>
        </div>
        <Link href="/" className="text-xs font-semibold text-red-500 hover:underline">Cerrar sesión</Link>
      </nav>

      <main className="max-w-xl mx-auto p-6">
        <div className="bg-kiru-card rounded-3xl p-8 border border-kiru-border shadow-sm">
          {!done ? (
            <div>
              <p className="text-xs font-semibold text-kiru-forest uppercase tracking-wider mb-1">Inglés · Unit 1</p>
              <h2 className="font-serif text-2xl mb-6">Pregunta {index + 1} de {questions.length}</h2>
              <p className="text-sm font-medium text-kiru-text mb-4">{questions[index].text}</p>
              
              <div className="space-y-2.5 mb-6">
                {questions[index].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm transition-all ${
                      selected === i 
                        ? "border-kiru-forest bg-kiru-forest-light text-kiru-forest font-semibold" 
                        : "border-kiru-border bg-[#F7F6F3] text-kiru-text hover:bg-[#EFECE6]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <button
                onClick={nextQuestion}
                disabled={selected === null}
                className="w-full py-3.5 bg-kiru-forest text-white rounded-2xl text-sm font-medium disabled:opacity-40 transition-opacity"
              >
                {index + 1 === questions.length ? "Finalizar" : "Siguiente pregunta"}
              </button>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <h2 className="font-serif text-3xl text-kiru-text">¡Completado!</h2>
              <p className="text-sm text-kiru-muted">Has terminado la actividad con 8/10.</p>
              <div>
                <Link href="/alumno" className="inline-block px-6 py-3 bg-kiru-forest text-white rounded-2xl text-sm font-medium">
                  Volver al inicio
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}