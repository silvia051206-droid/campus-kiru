"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Layers,
  Sparkles,
  Play
} from "lucide-react";

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  category: string;
}

const INITIAL_CARDS: Flashcard[] = [
  { id: "1", category: "Geografía", term: "Meandro", definition: "Curva pronunciada que forma el curso de un río en su recorrido." },
  { id: "2", category: "Geografía", term: "Meseta", definition: "Planicie extensa situada a considerable altura sobre el nivel del mar." },
  { id: "3", category: "Historia", term: "1492", definition: "Llegada de Cristóbal Colón a América y fin de la Reconquista en Granada." },
  { id: "4", category: "Historia", term: "Revolución Francesa", definition: "Conflicto social y político iniciado en 1789 que abolió el Antiguo Régimen." },
  { id: "5", category: "Física", term: "Inercia", definition: "Propiedad de los cuerpos de mantener su estado de reposo o movimiento relativo." },
  { id: "6", category: "Inglés", term: "Achievement", definition: "Logro o éxito conseguido con esfuerzo y habilidad." }
];

const SUBJECTS = [
  {
    id: "geo",
    name: "Geografía",
    desc: "Práctica mapas interactivos y relieve del mundo.",
    links: [
      { title: "GeoGuessr", url: "https://www.geoguessr.com", note: "Explora y adivina ubicaciones reales mediante mapas." },
      { title: "Seterra", url: "https://www.geoguessr.com/seterra/es", note: "Mapas interactivos para aprender capitales, provincias y relieve." }
    ],
    mentorNote: "Esta semana concéntrate en los ríos y accidentes costeros de Europa."
  },
  {
    id: "his",
    name: "Historia",
    desc: "Vídeos resumen cronológicos y conceptos clave.",
    links: [
      { title: "Canal Memorias de Pez", url: "https://youtube.com/@memoriasdepez?si=txpcTpw_C-eKfYj0", note: "Vídeos explicativos animados sobre acontecimientos históricos." }
    ],
    mentorNote: "Mira el vídeo de la Ilustración antes de la sesión del jueves."
  },
  {
    id: "fis",
    name: "Física",
    desc: "Resolución práctica de problemas y fórmulas.",
    links: [
      { title: "Clases Particulares en Ávila", url: "https://youtube.com/@clasesparticularesenavila?si=lXZ73ecH2PbmC1nO", note: "Ejercicios guiados paso a paso para ESO y Bachillerato." }
    ],
    mentorNote: "Repasa los ejercicios de cinemática básica de la lista del canal."
  },
  {
    id: "len",
    name: "Lengua y Literatura",
    desc: "Sintaxis, morfología y comprensión lectora.",
    links: [],
    mentorNote: "Recuerda completar el esquema de oraciones coordinadas."
  },
  {
    id: "ing",
    name: "Inglés",
    desc: "Vocabulario, gramática y preparación curricular.",
    links: [
      { title: "Calcúlalo", url: "https://calculalo.app/", note: "Plataforma de cálculo y agilidad complementaria." }
    ],
    mentorNote: "Revisa las flashcards de la Unidad 1 de vocabulario."
  },
  {
    id: "qui",
    name: "Química",
    desc: "Tabla periódica, formulación inorgánica y enlaces.",
    links: [],
    mentorNote: "Apréndete las valencias de los no metales del grupo 17."
  },
  {
    id: "bio",
    name: "Biología",
    desc: "Célula, genética y anatomía humana.",
    links: [],
    mentorNote: "Repasa el ciclo celular y las fases de la mitosis."
  }
];

export default function AlumnoPage() {
  const router = useRouter();
  const [mainTab, setMainTab] = useState<"inicio" | "flashcards" | "asignaturas" | "calculalo">("inicio");
  
  // Estado de Flashcards
  const [cards] = useState<Flashcard[]>(INITIAL_CARDS);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<"estudia" | "practica">("estudia");

  // Modo Práctica (Juego con tiempo)
  const [gameDuration, setGameDuration] = useState<number>(180); // segundos (3 min default)
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameAnswersCount, setGameAnswersCount] = useState(0);
  const [gameOptions, setGameOptions] = useState<string[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  // Estado de Asignaturas
  const [selectedSubjectId, setSelectedSubjectId] = useState("geo");

  // Temporizador del juego de práctica
  useEffect(() => {
    let timer: any = null;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isGameActive && timeLeft === 0) {
      setIsGameActive(false);
      setGameFinished(true);
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  // Generador de preguntas para el juego
  const setupNewQuestion = () => {
    setIsFlipped(false);
    const randomIdx = Math.floor(Math.random() * cards.length);
    setCardIndex(randomIdx);

    const currentCard = cards[randomIdx];
    const distractors = cards
      .filter((c) => c.id !== currentCard.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map((c) => c.definition);

    const allOptions = [...distractors, currentCard.definition].sort(() => 0.5 - Math.random());
    setGameOptions(allOptions);
  };

  const startPracticeGame = (minutes: number) => {
    const secs = minutes * 60;
    setGameDuration(secs);
    setTimeLeft(secs);
    setGameScore(0);
    setGameAnswersCount(0);
    setGameFinished(false);
    setIsGameActive(true);
    setupNewQuestion();
  };

  const handleSelectOption = (chosenDef: string) => {
    if (!isGameActive) return;
    const currentCard = cards[cardIndex];
    if (chosenDef === currentCard.definition) {
      setGameScore((prev) => prev + 1);
    }
    setGameAnswersCount((prev) => prev + 1);
    setupNewQuestion();
  };

  const activeSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) || SUBJECTS[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans pb-16">
      {/* Cabecera con botón de apagado en negro */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg sm:text-xl text-slate-900 font-bold">Campus Método Kiru</span>
          <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
            Alumno: Carmen
          </span>
        </div>

        <button
          onClick={() => router.push("/")}
          title="Cerrar sesión"
          className="p-2 sm:p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-900">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Barra de navegación superior del alumno */}
        <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex flex-wrap gap-1.5 shadow-sm text-xs font-semibold">
          {[
            { id: "inicio", label: "Mi Panel" },
            { id: "flashcards", label: "Flashcards" },
            { id: "asignaturas", label: "Asignaturas" },
            { id: "calculalo", label: "Calcúlalo" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMainTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl transition ${
                mainTab === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECCIÓN 1: INICIO */}
        {mainTab === "inicio" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bienvenida</span>
              <h2 className="text-2xl font-serif text-slate-900">¡Hola, Carmen!</h2>
              <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
                Tienes disponibles las nuevas herramientas de estudio: el sistema de **Flashcards** para memorizar conceptos y la zona de **Asignaturas** con vídeos y recursos recomendados por tu mentor.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setMainTab("flashcards")}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-400 transition cursor-pointer shadow-sm space-y-2"
              >
                <Layers className="w-5 h-5 text-emerald-800" />
                <h3 className="font-serif text-base text-slate-900">Flashcards de Estudio</h3>
                <p className="text-xs text-slate-500">Repasa conceptos y pon a prueba tu rapidez con el modo juego.</p>
              </div>

              <div
                onClick={() => setMainTab("asignaturas")}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-400 transition cursor-pointer shadow-sm space-y-2"
              >
                <BookOpen className="w-5 h-5 text-blue-700" />
                <h3 className="font-serif text-base text-slate-900">Zona de Asignaturas</h3>
                <p className="text-xs text-slate-500">Accede a Historia, Geografía, Física y los enlaces de tu tutor.</p>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 2: FLASHCARDS */}
        {mainTab === "flashcards" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-slate-900">Sistema de Flashcards</h2>
                <p className="text-xs text-slate-500">Herramienta activa para memorizar términos, fechas y vocabulario.</p>
              </div>

              <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => {
                    setMode("estudia");
                    setIsGameActive(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg transition ${
                    mode === "estudia" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Modo Estudia
                </button>
                <button
                  onClick={() => setMode("practica")}
                  className={`px-3.5 py-1.5 rounded-lg transition ${
                    mode === "practica" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Modo Practica
                </button>
              </div>
            </div>

            {/* SUB-MODO: ESTUDIA */}
            {mode === "estudia" && (
              <div className="space-y-5">
                <div className="bg-[#FAF8F5] border border-slate-200 p-4 rounded-2xl text-xs text-slate-600 leading-relaxed">
                  💡 <strong>Instrucciones:</strong> Haz clic sobre la tarjeta para darle la vuelta y ver su definición. Utiliza las flechas para navegar entre las tarjetas.
                </div>

                {/* Tarjeta 3D interactiva */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 min-h-[260px] flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md relative select-none"
                >
                  <span className="absolute top-4 left-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {cards[cardIndex].category}
                  </span>
                  <span className="absolute top-4 right-5 text-xs text-slate-400">
                    {cardIndex + 1} / {cards.length}
                  </span>

                  {!isFlipped ? (
                    <div className="space-y-3">
                      <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">Término / Concepto</span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 font-medium">
                        {cards[cardIndex].term}
                      </h3>
                    </div>
                  ) : (
                    <div className="space-y-3 max-w-md">
                      <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">Definición</span>
                      <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-sans">
                        {cards[cardIndex].definition}
                      </p>
                    </div>
                  )}

                  <div className="absolute bottom-4 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Toca para voltear</span>
                  </div>
                </div>

                {/* Controles de navegación */}
                <div className="flex justify-between items-center px-2">
                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setCardIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
                    }}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" /> Anterior
                  </button>

                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setCardIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
                    }}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
                  >
                    Siguiente <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* SUB-MODO: PRACTICA (JUEGO CON TIEMPO) */}
            {mode === "practica" && (
              <div className="space-y-5">
                {!isGameActive && !gameFinished ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-4 shadow-sm">
                    <Clock className="w-10 h-10 text-emerald-800 mx-auto" />
                    <h3 className="text-xl font-serif text-slate-900">Juego de Práctica Contrarreloj</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Se mostrará un término y tendrás que seleccionar la definición correcta entre 3 opciones antes de que termine el tiempo.
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Elige la duración:
                      </span>
                      <div className="flex justify-center gap-3">
                        {[1, 3, 5].map((mins) => (
                          <button
                            key={mins}
                            onClick={() => startPracticeGame(mins)}
                            className="px-5 py-2.5 bg-[#FAF8F5] border border-slate-200 hover:bg-slate-900 hover:text-white rounded-xl text-xs font-bold transition shadow-sm"
                          >
                            {mins} Min{mins > 1 ? "s" : ""}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : isGameActive ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
                    {/* Cabecera del juego */}
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <Clock className="w-4 h-4 text-rose-600 animate-pulse" />
                        <span>
                          Tiempo: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-500">
                        Aciertos: <span className="text-emerald-700 font-bold">{gameScore}</span> / {gameAnswersCount}
                      </div>
                    </div>

                    {/* Pregunta activa */}
                    <div className="text-center py-2 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Concepto</span>
                      <h3 className="text-2xl font-serif text-slate-900">{cards[cardIndex].term}</h3>
                    </div>

                    {/* 3 Opciones de respuesta */}
                    <div className="space-y-3">
                      {gameOptions.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(opt)}
                          className="w-full text-left p-4 rounded-2xl border border-slate-200 bg-[#FAF8F5] hover:bg-slate-900 hover:text-white transition text-xs font-medium leading-relaxed shadow-sm"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Resultado final del juego */
                  <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
                    <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                    <h3 className="text-2xl font-serif text-slate-900">¡Tiempo agotado!</h3>
                    <p className="text-xs text-slate-500">Has completado la sesión de práctica.</p>

                    <div className="p-4 bg-[#FAF8F5] rounded-2xl max-w-xs mx-auto border border-slate-200">
                      <span className="text-xs text-slate-400 block mb-1">Nota Final</span>
                      <span className="text-3xl font-bold font-serif text-slate-900">
                        {gameAnswersCount > 0 ? ((gameScore / gameAnswersCount) * 10).toFixed(1) : 0} / 10
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        ({gameScore} aciertos de {gameAnswersCount} preguntas)
                      </span>
                    </div>

                    <button
                      onClick={() => setGameFinished(false)}
                      className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
                    >
                      Volver a jugar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SECCIÓN 3: ASIGNATURAS */}
        {mainTab === "asignaturas" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-slate-900">Zona de Asignaturas</h2>
                <p className="text-xs text-slate-500">Recursos y recomendaciones directas de tu mentor.</p>
              </div>

              {/* Desplegable de selección de asignatura */}
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-800 shadow-sm"
              >
                {SUBJECTS.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Contenido de la asignatura seleccionada */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Asignatura
                </span>
                <h3 className="text-2xl font-serif text-slate-900 mt-2">{activeSubject.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{activeSubject.desc}</p>
              </div>

              {/* Recursos y Enlaces */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Herramientas y Práctica</h4>
                {activeSubject.links.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeSubject.links.map((lnk, idx) => (
                      <a
                        key={idx}
                        href={lnk.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl border border-slate-200 bg-[#FAF8F5] hover:bg-white hover:border-slate-400 transition flex flex-col justify-between space-y-2 group shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-xs text-slate-900 group-hover:text-emerald-800">
                            {lnk.title}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900" />
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{lnk.note}</p>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No hay enlaces externos para esta asignatura por ahora.</p>
                )}
              </div>

              {/* Notas y recomendaciones del Mentor */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Recomendaciones de tu Mentor
                </h4>
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                  💬 “{activeSubject.mentorNote}”
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 4: CALCÚLALO */}
        {mainTab === "calculalo" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-serif text-slate-900">Plataforma Calcúlalo</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accede a la herramienta externa para ejercicios y retos de cálculo matemático.
            </p>
            <a
              href="https://calculalo.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition"
            >
              <span>Abrir Calcúlalo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </main>
    </div>
  );
}