export interface EnglishQuestion {
  id: number;
  level: string;
  topic: string;
  question: string;
  options: string[];
  answer: string;
  unit: string;       
  category: string;   
  difficulty: string; 
}

export interface EnglishConfig {
  studentUsername?: string;
  selectedUnits: string[];
  selectedCategory: string;
  difficulty: "facil" | "medio" | "desafiante" | "todas";
  questionCount: number;
}

export const ENGLISH_A1_DATABASE: EnglishQuestion[] = [
  {
    id: 1,
    level: "A1",
    topic: "Greetings and Basics",
    question: "¿Cómo se dice 'Buenos días' en inglés?",
    options: ["Good morning", "Good afternoon", "Good night", "Goodbye"],
    answer: "Good morning",
    unit: "Unit 1: Introductions & To Be",
    category: "Everyday English",
    difficulty: "facil"
  },
  {
    id: 2,
    level: "A1",
    topic: "Verb To Be",
    question: "Completa la frase: 'She ___ a student.'",
    options: ["am", "are", "is", "be"],
    answer: "is",
    unit: "Unit 1: Introductions & To Be",
    category: "Grammar",
    difficulty: "facil"
  },
  {
    id: 3,
    level: "A1",
    topic: "Daily Routines",
    question: "Elige la traducción correcta de 'I wake up early'.",
    options: ["Me acuesto tarde", "Me despierto temprano", "Desayuno solo", "Voy a casa"],
    answer: "Me despierto temprano",
    unit: "Unit 2: Daily Routines & Present Simple",
    category: "Vocabulary",
    difficulty: "medio"
  }
];