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
  Play,
  Award,
  TrendingUp,
  Filter
} from "lucide-react";

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  category: string;
  targetStudents?: string[];
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
    links: [],
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
  const [mainTab, setMainTab] = useState<"inicio" | "flashcards" | "asignaturas" | "ingles" | "progreso" | "calculalo">("inicio");
  
  // Usuario dinámico
  const [currentStudentName, setCurrentStudentName] = useState("Carmen Fernández");
  const [currentUsername, setCurrentUsername] = useState("carmen");

  // Estado de Flashcards
  const [allCards, setAllCards] = useState<Flashcard[]>(INITIAL_CARDS);
  const [categoryFilter, setCategoryFilter] = useState<string>("todas");
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<"estudia" | "practica">("estudia");

  // Modo Práctica (Juego con tiempo)
  const [gameDuration, setGameDuration] = useState<number>(180);
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameAnswersCount, setGameAnswersCount] = useState(0);
  const [gameOptions, setGameOptions] = useState<string[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  // Estado de Asignaturas
  const [selectedSubjectId, setSelectedSubjectId] = useState("geo");

  // Inglés A1 Motor de ejercicios
  const [englishAnswers, setEnglishAnswers] = useState<Record<number, string>>({});
  const [englishFeedback, setEnglishFeedback] = useState<{ score: number; total: number; checked: boolean }>({ score: 0, total: 3, checked: false });

  // SkillCoins Semanales (4 Categorías automáticas desde Sheet)
  const [scData, setScData] = useState({
    estudios: 8,
    compromiso: 9,
    organizacion: 7,
    bienestar: 9,
    updatedAt: "12/5/26"
  });

  // Carga inicial y datos del usuario
  useEffect(() => {
    // 1. Obtener usuario dinámico
    const rawUser = localStorage.getItem("kiru_current_user");
    let activeUser = "carmen";
    if (rawUser) {
      try {
        const parsed = JSON.parse(rawUser);
        if (parsed.name) setCurrentStudentName(parsed.name);
        if (parsed.username) {
          setCurrentUsername(parsed.username);
          activeUser = parsed.username;
        }
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Cargar flashcards guardadas o asignar por defecto
    const savedCards = localStorage.getItem("kiru_custom_flashcards");
    if (savedCards) {
      try {
        const parsedCards: Flashcard[] = JSON.parse(savedCards);
        // Filtrar aquellas destinadas a este alumno o a todos
        const userCards = parsedCards.filter(
          (c) => !c.targetStudents || c.targetStudents.includes(activeUser) || c.targetStudents.includes("todos")
        );
        if (userCards.length > 0) {
          setAllCards(userCards);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // 3. Lectura automática desde el Google Sheet oficial de SkillCoins
    const fetchSheetData = async () => {
      try {
        const sheetUrl = "https://docs.google.com/spreadsheets/d/1bgZYmXc4uol1GvfyD7QaAIdnK37OG3hLC27jMVg6A1c/gviz/tq?tqx=out:json";
        const res = await fetch(sheetUrl);
        const text = await res.text();
        const jsonText = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
        const data = JSON.parse(jsonText);
        const rows = data?.table?.rows;

        if (rows && rows.length > 0) {
          const lastRow = rows[rows.length - 1].c;
          
          let dateFormatted = "12/5/26";
          if (lastRow[0]?.f) {
            dateFormatted = lastRow[0].f.split(" ")[0];
          } else if (lastRow[0]?.v) {
            dateFormatted = String(lastRow[0].v).split("T")[0];
          }

          const parsedSC = {
            estudios: Number(lastRow[2]?.v) || 8,
            compromiso: Number(lastRow[3]?.v) || 9,
            organizacion: Number(lastRow[4]?.v) || 7,
            bienestar: Number(lastRow[5]?.v) || 9,
            updatedAt: dateFormatted
          };

          setScData(parsedSC);
          localStorage.setItem(`kiru_sc_${activeUser}`, JSON.stringify(parsedSC));
          return;
        }
      } catch (err) {
        console.log("Aviso: Leyendo SkillCoins almacenadas localmente");
      }

      const localSC = localStorage.getItem(`kiru_sc_${activeUser}`);
      if (localSC) {
        try {
          setScData(JSON.parse(localSC));
        } catch (e) {}
      }
    };

    fetchSheetData();
  }, []);

  // Lista filtrada de flashcards
  const filteredCards = categoryFilter === "todas" 
    ? allCards 
    : allCards.filter((c) => c.category.toLowerCase() === categoryFilter.toLowerCase());

  // Reiniciar índice si el filtro deja la lista más corta
  useEffect(() => {
    setCardIndex(0);
    setIsFlipped(false);
  }, [categoryFilter]);

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
    const pool = filteredCards.length >= 3 ? filteredCards : allCards;
    const randomIdx = Math.floor(Math.random() * pool.length);
    setCardIndex(randomIdx);

    const currentCard = pool[randomIdx];
    const distractors = pool
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
    const pool = filteredCards.length >= 3 ? filteredCards : allCards;
    const currentCard = pool[cardIndex] || pool[0];
    if (chosenDef === currentCard.definition) {
      setGameScore((prev) => prev + 1);
    }
    setGameAnswersCount((prev) => prev + 1);
    setupNewQuestion();
  };

  // Corrección real de inglés
  const checkEnglishExercises = (e: React.FormEvent) => {
    e.preventDefault();
    let hits = 0;
    if (englishAnswers[0]?.trim().toLowerCase() === "is") hits++;
    if (englishAnswers[1]?.trim().toLowerCase() === "they") hits++;
    if (englishAnswers[2]?.trim().toLowerCase() === "apple") hits++;
    setEnglishFeedback({ score: hits, total: 3, checked: true });
  };

  const activeSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) || SUBJECTS[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans pb-16">
      {/* Cabecera con nombre dinámico y botón de apagado en negro */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg sm:text-xl text-slate-900 font-bold">Campus Método Kiru</span>
          <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
            Alumno: {currentStudentName}
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
            { id: "ingles", label: "Inglés A1" },
            { id: "progreso", label: "Mi Progreso (SC)" },
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
              <h2 className="text-2xl font-serif text-slate-900">¡Hola, {currentStudentName}!</h2>
              <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
                Tienes disponibles las herramientas de estudio activas: el sistema de <strong>Flashcards</strong> con filtro por asignaturas, la zona de <strong>Asignaturas</strong> con vídeos recomendados, el módulo de <strong>Inglés A1</strong> y tus <strong>SkillCoins semanales</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => setMainTab("flashcards")}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-400 transition cursor-pointer shadow-sm space-y-2"
              >
                <Layers className="w-5 h-5 text-emerald-800" />
                <h3 className="font-serif text-base text-slate-900 font-semibold">Flashcards</h3>
                <p className="text-xs text-slate-500">Repasa conceptos o practica contrarreloj (1, 3 o 5 min).</p>
              </div>

              <div
                onClick={() => setMainTab("asignaturas")}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-400 transition cursor-pointer shadow-sm space-y-2"
              >
                <BookOpen className="w-5 h-5 text-blue-700" />
                <h3 className="font-serif text-base text-slate-900 font-semibold">Asignaturas</h3>
                <p className="text-xs text-slate-500">Accede a Geografía, Historia, Física y los recursos del mentor.</p>
              </div>

              <div
                onClick={() => setMainTab("progreso")}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-400 transition cursor-pointer shadow-sm space-y-2"
              >
                <Award className="w-5 h-5 text-amber-700" />
                <h3 className="font-serif text-base text-slate-900 font-semibold">Mis SkillCoins</h3>
                <p className="text-xs text-slate-500">Consulta tus 4 áreas de puntuación logradas esta semana.</p>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 2: FLASHCARDS (ESTUDIA + PRACTICA + FILTRO ASIGNATURAS) */}
        {mainTab === "flashcards" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif text-slate-900">Sistema de Flashcards</h2>
                <p className="text-xs text-slate-500">Herramienta activa para memorizar términos, fechas y vocabulario.</p>
              </div>

              {/* Controles: Filtro de Asignatura y Modos */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs shadow-sm">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="todas">Todas las asignaturas</option>
                    <option value="geografía">Geografía</option>
                    <option value="historia">Historia</option>
                    <option value="física">Física</option>
                    <option value="inglés">Inglés</option>
                    <option value="lengua">Lengua</option>
                    <option value="química">Química</option>
                    <option value="biología">Biología</option>
                  </select>
                </div>

                <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold shadow-sm">
                  <button
                    onClick={() => {
                      setMode("estudia");
                      setIsGameActive(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      mode === "estudia" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Modo Estudia
                  </button>
                  <button
                    onClick={() => setMode("practica")}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      mode === "practica" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Modo Practica
                  </button>
                </div>
              </div>
            </div>

            {/* SUB-MODO: ESTUDIA */}
            {mode === "estudia" && (
              <div className="space-y-5">
                <div className="bg-[#FAF8F5] border border-slate-200 p-4 rounded-2xl text-xs text-slate-600 leading-relaxed">
                  💡 <strong>Instrucciones:</strong> Haz clic sobre la tarjeta para darle la vuelta y ver su definición. Utiliza las flechas para navegar entre las tarjetas. Puedes ver todas las materias juntas o seleccionar una única asignatura en el desplegable superior.
                </div>

                {filteredCards.length > 0 ? (
                  <>
                    <div
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 min-h-[260px] flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md relative select-none"
                    >
                      <span className="absolute top-4 left-5 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-[#FAF8F5] border border-slate-200 px-2.5 py-1 rounded-full">
                        {filteredCards[cardIndex]?.category || "General"}
                      </span>
                      <span className="absolute top-4 right-5 text-xs text-slate-400">
                        {cardIndex + 1} / {filteredCards.length}
                      </span>

                      {!isFlipped ? (
                        <div className="space-y-3">
                          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">Término / Concepto</span>
                          <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 font-medium">
                            {filteredCards[cardIndex]?.term}
                          </h3>
                        </div>
                      ) : (
                        <div className="space-y-3 max-w-md">
                          <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">Definición</span>
                          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-sans">
                            {filteredCards[cardIndex]?.definition}
                          </p>
                        </div>
                      )}

                      <div className="absolute bottom-4 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Toca para voltear</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center px-2">
                      <button
                        onClick={() => {
                          setIsFlipped(false);
                          setCardIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
                        }}
                        className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
                      >
                        <ChevronLeft className="w-4 h-4" /> Anterior
                      </button>

                      <button
                        onClick={() => {
                          setIsFlipped(false);
                          setCardIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
                        }}
                        className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
                      >
                        Siguiente <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
                    No hay flashcards para esta asignatura. Cambia el filtro a &quot;Todas las asignaturas&quot;.
                  </div>
                )}
              </div>
            )}

            {/* SUB-MODO: PRACTICA (CONTRARRELOJ) */}
            {mode === "practica" && (
              <div className="space-y-5">
                {!isGameActive && !gameFinished ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-4 shadow-sm">
                    <Clock className="w-10 h-10 text-emerald-800 mx-auto" />
                    <h3 className="text-xl font-serif text-slate-900">Juego de Práctica Contrarreloj</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Se mostrará un término y tendrás que seleccionar la definición correcta entre 3 opciones antes de que termine el tiempo. Al finalizar podrás ver tu nota.
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

                    <div className="text-center py-2 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Concepto</span>
                      <h3 className="text-2xl font-serif text-slate-900">
                        {filteredCards[cardIndex]?.term || allCards[cardIndex]?.term}
                      </h3>
                    </div>

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
                      className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
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

            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Asignatura
                </span>
                <h3 className="text-2xl font-serif text-slate-900 mt-2">{activeSubject.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{activeSubject.desc}</p>
              </div>

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

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Recomendaciones de tu Mentor
                </h4>
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                  💬 &ldquo;{activeSubject.mentorNote}&rdquo;
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 4: INGLÉS A1 (MOTOR PEDAGÓGICO PROPIO) */}
        {mainTab === "ingles" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                A1 Beginner
              </span>
              <h2 className="text-2xl font-serif text-slate-900 mt-2">Módulo de Inglés A1</h2>
              <p className="text-xs text-slate-500">Ejercicios autocorregibles de gramática y vocabulario.</p>
            </div>

            <form onSubmit={checkEnglishExercises} className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-slate-200 space-y-2 text-xs">
                <p className="font-semibold text-slate-800">1. Complete with the correct form of to be:</p>
                <p className="text-slate-600 italic">She ___ a very good student. (am / is / are)</p>
                <input
                  type="text"
                  placeholder="Tu respuesta..."
                  value={englishAnswers[0] || ""}
                  onChange={(e) => setEnglishAnswers({ ...englishAnswers, 0: e.target.value })}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl w-full max-w-xs focus:outline-none focus:border-slate-800"
                  required
                />
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-slate-200 space-y-2 text-xs">
                <p className="font-semibold text-slate-800">2. Subject Pronouns:</p>
                <p className="text-slate-600 italic">___ are playing football in the school park. (He / They)</p>
                <input
                  type="text"
                  placeholder="Tu respuesta..."
                  value={englishAnswers[1] || ""}
                  onChange={(e) => setEnglishAnswers({ ...englishAnswers, 1: e.target.value })}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl w-full max-w-xs focus:outline-none focus:border-slate-800"
                  required
                />
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-slate-200 space-y-2 text-xs">
                <p className="font-semibold text-slate-800">3. Vocabulary:</p>
                <p className="text-slate-600 italic">An ___ a day keeps the doctor away. (apple / bread)</p>
                <input
                  type="text"
                  placeholder="Tu respuesta..."
                  value={englishAnswers[2] || ""}
                  onChange={(e) => setEnglishAnswers({ ...englishAnswers, 2: e.target.value })}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl w-full max-w-xs focus:outline-none focus:border-slate-800"
                  required
                />
              </div>

              {englishFeedback.checked && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-sm">
                  <span>Resultado obtenido:</span>
                  <span className="text-base font-bold font-serif">
                    {englishFeedback.score} / {englishFeedback.total} aciertos (Nota: {((englishFeedback.score / englishFeedback.total) * 10).toFixed(1)}/10)
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
              >
                Corregir y calcular nota
              </button>
            </form>
          </div>
        )}

        {/* SECCIÓN 5: MI PROGRESO (SKILLCOINS SEMANALES EN 4 CATEGORÍAS) */}
        {mainTab === "progreso" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <div>
                <h2 className="text-2xl font-serif text-slate-900">SkillCoins Semanales</h2>
                <p className="text-xs text-slate-500">Puntuación semanal no acumulada por categorías (0 a 10 SC).</p>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Actualizado el {scData.updatedAt}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Estudios</span>
                <p className="text-3xl font-serif font-bold text-emerald-950">{scData.estudios} SC</p>
                <span className="text-[10px] text-slate-500 block">Técnicas y asimilación</span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">Compromiso</span>
                <p className="text-3xl font-serif font-bold text-blue-950">{scData.compromiso} SC</p>
                <span className="text-[10px] text-slate-500 block">Actitud y puntualidad</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Organización</span>
                <p className="text-3xl font-serif font-bold text-amber-950">{scData.organizacion} SC</p>
                <span className="text-[10px] text-slate-500 block">Agenda y planificación</span>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">Bienestar</span>
                <p className="text-3xl font-serif font-bold text-purple-950">{scData.bienestar} SC</p>
                <span className="text-[10px] text-slate-500 block">Confianza y calma</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic pt-2">
              * Datos sincronizados con el registro semanal completado por el tutor tras cada sesión.
            </p>
          </div>
        )}

        {/* SECCIÓN 6: CALCÚLALO */}
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition shadow-sm"
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