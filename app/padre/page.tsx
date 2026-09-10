"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import SkillCoinsChart from "@/components/SkillCoinsChart";

interface StudentChild {
  id: string;
  name: string;
  level: string;
  avatarText: string;
}

interface Notice {
  id: string;
  title: string;
  date: string;
  type: "festivo" | "horario" | "general";
  content: string;
}

interface DocumentItem {
  id: string;
  title: string;
  type: string;
  requiresAcceptance?: boolean;
  accepted?: boolean;
  acceptedAt?: string;
}

interface PaymentItem {
  id: string;
  concept: string;
  amount: number;
  date: string;
  status: "Pagado" | "Pendiente";
}

const DEFAULT_CHILDREN: StudentChild[] = [
  { id: "carmen", name: "Carmen", level: "Explorador (1)", avatarText: "CF" }
];

export default function PadrePage() {
  const router = useRouter();
  const [children] = useState<StudentChild[]>(DEFAULT_CHILDREN);
  const [selectedChild, setSelectedChild] = useState<StudentChild | null>(null);
  const [activeTab, setActiveTab] = useState<"inicio" | "progreso" | "documentos" | "pagos">("inicio");

  const [notices] = useState<Notice[]>([
    {
      id: "1",
      title: "Festivo Nacional",
      date: "12 de Octubre",
      type: "festivo",
      content: "No habrá sesiones lectivas durante esta jornada festiva."
    },
    {
      id: "2",
      title: "Cambio de Horario Sesión Inglés",
      date: "Viernes 17:00",
      type: "horario",
      content: "La sesión individual de mentoría se adelanta 30 minutos."
    }
  ]);

  const [docs, setDocs] = useState<DocumentItem[]>([
    { id: "d1", title: "Propuesta Personalizada Método Kiru", type: "Propuesta" },
    { id: "d2", title: "Normas de Funcionamiento y Convivencia", type: "Normas", requiresAcceptance: true, accepted: false }
  ]);

  const [payments] = useState<PaymentItem[]>([
    { id: "p1", concept: "Mentoría Agosto 2026", amount: 75, date: "15/08/2026", status: "Pagado" },
    { id: "p2", concept: "Mentoría Septiembre 2026", amount: 75, date: "15/09/2026", status: "Pendiente" }
  ]);

  const handleAcceptDoc = (docId: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === docId
          ? { ...d, accepted: true, acceptedAt: new Date().toLocaleString("es-ES") }
          : d
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans pb-12">
      {/* Barra superior móvil limpia con botón de apagado en negro */}
      <header className="bg-white border-b border-slate-200 px-4 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          {selectedChild && (
            <button
              onClick={() => setSelectedChild(null)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 mr-1"
              title="Volver a mis hijos"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <span className="font-serif text-lg text-slate-900 font-bold">Método Kiru</span>
        </div>

        <button
          onClick={() => router.push("/")}
          title="Cerrar sesión"
          className="p-2 rounded-xl border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 shadow-sm transition"
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

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        {/* PANTALLA 1: LISTADO DE HIJOS */}
        {!selectedChild ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-serif text-slate-900">Espacio Familiar</h2>
              <p className="text-xs text-slate-500">Selecciona el perfil de tu hijo/a para ver sus detalles</p>
            </div>

            <div className="space-y-3">
              {children.map((child) => (
                <div
                  key={child.id}
                  onClick={() => {
                    setSelectedChild(child);
                    setActiveTab("inicio");
                  }}
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-slate-300 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-lg">
                      {child.avatarText}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-slate-900">{child.name}</h3>
                      <p className="text-xs text-emerald-700 font-medium">{child.level}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* PANTALLA 2: ESPACIO INDIVIDUAL DEL HIJO */
          <div className="space-y-5">
            {/* Cabecera del hijo */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Espacio del Alumno</span>
                <h2 className="text-xl font-serif text-slate-900">{selectedChild.name}</h2>
              </div>
              <button
                onClick={() => setSelectedChild(null)}
                className="text-xs text-slate-500 hover:text-slate-900 underline"
              >
                Mis hijos
              </button>
            </div>

            {/* Menú de navegación móvil */}
            <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm text-xs font-semibold overflow-x-auto gap-1">
              {[
                { id: "inicio", label: "Inicio / Avisos" },
                { id: "progreso", label: "Progreso" },
                { id: "documentos", label: "Mis documentos" },
                { id: "pagos", label: "Mis pagos" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-3 rounded-xl whitespace-nowrap text-center transition ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB INICIO: AVISOS */}
            {activeTab === "inicio" && (
              <div className="space-y-4">
                <h3 className="text-base font-serif text-slate-900">Comunicaciones y Avisos</h3>
                <div className="space-y-3">
                  {notices.map((n) => (
                    <div key={n.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-xs text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB PROGRESO: GRÁFICAS DE SKILLCOINS */}
            {activeTab === "progreso" && (
              <div className="space-y-4">
                <SkillCoinsChart />
              </div>
            )}

            {/* TAB DOCUMENTOS */}
            {activeTab === "documentos" && (
              <div className="space-y-4">
                <h3 className="text-base font-serif text-slate-900">Documentación de {selectedChild.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {docs.map((d) => (
                    <div key={d.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 mb-2">{d.title}</h4>
                        <div className="h-28 bg-[#FAF8F5] border border-slate-200 rounded-xl flex flex-col items-center justify-center p-2 text-slate-400">
                          <FileText className="w-8 h-8 text-slate-400 mb-1" />
                          <span className="text-[10px]">Previsualización PDF</span>
                        </div>
                      </div>

                      {d.requiresAcceptance && !d.accepted ? (
                        <div className="pt-2 border-t border-slate-100 space-y-2">
                          <span className="text-[10px] font-semibold text-amber-600 block">
                            Pendiente de aceptación
                          </span>
                          <button
                            onClick={() => handleAcceptDoc(d.id)}
                            className="w-full py-2 bg-slate-900 text-white rounded-xl text-[11px] font-semibold hover:bg-slate-800 transition"
                          >
                            He leído y acepto
                          </button>
                        </div>
                      ) : d.accepted ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-medium pt-2">
                          <CheckCircle2 className="w-4 h-4" /> Aceptado el {d.acceptedAt}
                        </div>
                      ) : (
                        <button className="w-full py-2 border border-slate-200 text-slate-700 rounded-xl text-[11px] font-semibold hover:bg-slate-50">
                          Abrir documento
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB PAGOS */}
            {activeTab === "pagos" && (
              <div className="space-y-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Próximo Pago</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900">75 €</span>
                    <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-semibold border border-amber-200">
                      Vence: 15 septiembre
                    </span>
                  </div>
                  <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition shadow-sm">
                    Pagar con Pasarela
                  </button>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <h4 className="font-serif text-sm text-slate-900">Historial de Pagos</h4>
                  <div className="divide-y divide-slate-100 text-xs">
                    {payments.map((p) => (
                      <div key={p.id} className="py-2.5 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-800">{p.concept}</p>
                          <p className="text-[10px] text-slate-400">{p.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">{p.amount} €</p>
                          <span
                            className={`text-[10px] font-bold ${
                              p.status === "Pagado" ? "text-emerald-700" : "text-amber-700"
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}