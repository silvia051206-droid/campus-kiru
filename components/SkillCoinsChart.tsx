"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  color: string;
  pastelBg: string;
  data: { week: string; sc: number }[];
}

const CATEGORIES_DATA: CategoryData[] = [
  {
    id: "tecnicas",
    name: "Técnicas de Estudio",
    color: "#60A5FA",
    pastelBg: "bg-blue-50 text-blue-700 border-blue-200",
    data: [
      { week: "Sem 1", sc: 3 },
      { week: "Sem 2", sc: 5 },
      { week: "Sem 3", sc: 4 },
      { week: "Sem 4", sc: 8 },
    ],
  },
  {
    id: "autonomia",
    name: "Autonomía y Organización",
    color: "#34D399",
    pastelBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    data: [
      { week: "Sem 1", sc: 2 },
      { week: "Sem 2", sc: 4 },
      { week: "Sem 3", sc: 6 },
      { week: "Sem 4", sc: 7 },
    ],
  },
  {
    id: "constancia",
    name: "Constancia y Hábitos",
    color: "#FBBF24",
    pastelBg: "bg-amber-50 text-amber-700 border-amber-200",
    data: [
      { week: "Sem 1", sc: 4 },
      { week: "Sem 2", sc: 3 },
      { week: "Sem 3", sc: 7 },
      { week: "Sem 4", sc: 9 },
    ],
  },
  {
    id: "rendimiento",
    name: "Rendimiento Académico",
    color: "#F472B6",
    pastelBg: "bg-rose-50 text-rose-700 border-rose-200",
    data: [
      { week: "Sem 1", sc: 5 },
      { week: "Sem 2", sc: 6 },
      { week: "Sem 3", sc: 5 },
      { week: "Sem 4", sc: 8 },
    ],
  },
];

export default function SkillCoinsChart() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const maxVal = 10;
  const svgWidth = 500;
  const svgHeight = 200;
  const paddingX = 40;
  const paddingY = 30;

  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const weeks = ["Sem 1", "Sem 2", "Sem 3", "Sem 4"];

  const getPoints = (data: { week: string; sc: number }[]) => {
    return data
      .map((item, idx) => {
        const x = paddingX + (idx / (data.length - 1)) * chartW;
        const y = paddingY + chartH - (item.sc / maxVal) * chartH;
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-800" />
            <h3 className="font-serif text-lg text-slate-900">Evolución de SkillCoins</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Progreso semanal de SC alcanzadas por sesión (actualizado semanalmente)
          </p>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-xs font-semibold p-2 bg-[#FAF8F5] border border-slate-200 rounded-xl text-slate-700 focus:outline-none"
        >
          <option value="all">Todas las categorías (4 gráficas)</option>
          {CATEGORIES_DATA.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[420px]">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none">
            {[0, 2.5, 5, 7.5, 10].map((val) => {
              const y = paddingY + chartH - (val / maxVal) * chartH;
              return (
                <g key={val}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke="#F1F5F9"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    textAnchor="end"
                    fontSize="9"
                    fill="#94A3B8"
                    fontFamily="sans-serif"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {weeks.map((w, idx) => {
              const x = paddingX + (idx / (weeks.length - 1)) * chartW;
              return (
                <text
                  key={w}
                  x={x}
                  y={svgHeight - 10}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#64748B"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {w}
                </text>
              );
            })}

            {CATEGORIES_DATA.filter(
              (cat) => selectedCategory === "all" || selectedCategory === cat.id
            ).map((cat) => {
              const points = getPoints(cat.data);
              return (
                <g key={cat.id}>
                  <polyline
                    fill="none"
                    stroke={cat.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                    className="transition-all duration-300"
                  />
                  {cat.data.map((p, idx) => {
                    const x = paddingX + (idx / (cat.data.length - 1)) * chartW;
                    const y = paddingY + chartH - (p.sc / maxVal) * chartH;
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="4.5"
                        fill="white"
                        stroke={cat.color}
                        strokeWidth="2.5"
                        className="hover:scale-125 transition-transform cursor-pointer"
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
        {CATEGORIES_DATA.map((cat) => {
          const lastSc = cat.data[cat.data.length - 1].sc;
          return (
            <div
              key={cat.id}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.id ? "all" : cat.id)
              }
              className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                selectedCategory === "all" || selectedCategory === cat.id
                  ? cat.pastelBg
                  : "bg-slate-50 text-slate-400 border-slate-100 opacity-60"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-[10px] font-bold uppercase truncate">{cat.name}</span>
              </div>
              <p className="text-lg font-bold font-serif">+{lastSc} SC</p>
              <span className="text-[9px] block">Esta semana</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}