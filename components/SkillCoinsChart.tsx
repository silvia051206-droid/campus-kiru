"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  pastelBg: string;
  data: { week: string; sc: number }[];
}

const CATEGORIES_DATA: CategoryData[] = [
  {
    id: "estudios",
    name: "Estudios",
    subtitle: "Técnicas y Asimilación",
    color: "#059669",
    pastelBg: "bg-emerald-50/60 border-emerald-200 text-emerald-900",
    data: [
      { week: "Sem 1", sc: 6 },
      { week: "Sem 2", sc: 7 },
      { week: "Sem 3", sc: 8 },
      { week: "Sem 4", sc: 8 },
    ],
  },
  {
    id: "compromiso",
    name: "Compromiso",
    subtitle: "Actitud y Puntualidad",
    color: "#2563EB",
    pastelBg: "bg-blue-50/60 border-blue-200 text-blue-900",
    data: [
      { week: "Sem 1", sc: 7 },
      { week: "Sem 2", sc: 8 },
      { week: "Sem 3", sc: 8 },
      { week: "Sem 4", sc: 9 },
    ],
  },
  {
    id: "organizacion",
    name: "Organización",
    subtitle: "Agenda y Orden",
    color: "#D97706",
    pastelBg: "bg-amber-50/60 border-amber-200 text-amber-900",
    data: [
      { week: "Sem 1", sc: 5 },
      { week: "Sem 2", sc: 6 },
      { week: "Sem 3", sc: 7 },
      { week: "Sem 4", sc: 7 },
    ],
  },
  {
    id: "bienestar",
    name: "Bienestar",
    subtitle: "Calma y Confianza",
    color: "#9333EA",
    pastelBg: "bg-purple-50/60 border-purple-200 text-purple-900",
    data: [
      { week: "Sem 1", sc: 8 },
      { week: "Sem 2", sc: 8 },
      { week: "Sem 3", sc: 9 },
      { week: "Sem 4", sc: 9 },
    ],
  },
];

export default function SkillCoinsChart() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const maxVal = 10;
  const svgWidth = 320;
  const svgHeight = 130;
  const paddingX = 35;
  const paddingY = 20;

  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const visibleCategories =
    selectedCategory === "all"
      ? CATEGORIES_DATA
      : CATEGORIES_DATA.filter((c) => c.id === selectedCategory);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-800" />
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Evolución de SkillCoins
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Eje X: Semanas · Eje Y: SkillCoins obtenidas por sesión (0 a 10 SC)
          </p>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-xs font-semibold p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="all">Ver las 4 gráficas</option>
          {CATEGORIES_DATA.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cuadrícula de 4 gráficas independientes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleCategories.map((cat) => {
          const points = cat.data.map((item, idx) => {
            const x = paddingX + (idx / (cat.data.length - 1)) * chartW;
            const y = paddingY + chartH - (item.sc / maxVal) * chartH;
            return { x, y, sc: item.sc, week: item.week };
          });

          const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
          const lastSc = cat.data[cat.data.length - 1].sc;

          return (
            <div
              key={cat.id}
              className={`p-4 rounded-3xl border ${cat.pastelBg} space-y-2`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif text-sm font-bold text-slate-900">
                    {cat.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {cat.subtitle}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                  Última: {lastSc} SC
                </span>
              </div>

              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-28 overflow-visible select-none">
                {/* Líneas horizontales guía (0, 5, 10 SC) */}
                {[0, 5, 10].map((val) => {
                  const y = paddingY + chartH - (val / maxVal) * chartH;
                  return (
                    <g key={val}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={svgWidth - paddingX}
                        y2={y}
                        stroke="#CBD5E1"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                      <text
                        x={paddingX - 6}
                        y={y + 3}
                        textAnchor="end"
                        fontSize="8"
                        fill="#94A3B8"
                        fontWeight="600"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Línea evolutiva de la categoría */}
                <polyline
                  fill="none"
                  stroke={cat.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={polylinePoints}
                />

                {/* Puntos y etiquetas del eje X */}
                {points.map((p, idx) => (
                  <g key={idx}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="#FFFFFF"
                      stroke={cat.color}
                      strokeWidth="2"
                    />
                    <text
                      x={p.x}
                      y={svgHeight - 4}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#64748B"
                      fontWeight="600"
                    >
                      {p.week}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}