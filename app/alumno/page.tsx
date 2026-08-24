"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AlumnoPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("kiru_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div className="min-h-screen bg-kiru-bg">
      {/* Barra de navegación superior */}
      <nav className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex items-center justify-between">
        <div className="flex gap-3 text-sm font-medium">
          <Link href="/alumno" className="text-kiru-forest bg-kiru-forest-light px-3.5 py-1.5 rounded-xl font-semibold">Inicio</Link>
          <Link href="/alumno/tareas" className="text-kiru-muted hover:text-kiru-text px-3.5 py-1.5 rounded-xl transition-colors">Tareas</Link>
          <Link href="/alumno/calculalo" className="text-kiru-muted hover:text-kiru-text px-3.5 py-1.5 rounded-xl transition-colors">Calcúlalo</Link>
        </div>
        <Link href="/" className="text-xs font-semibold text-red-500 hover:underline">Cerrar sesión</Link>
      </nav>

      <main className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Cabecera del Alumno */}
        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border flex items-center gap-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-kiru-forest-light text-kiru-forest font-serif text-2xl flex items-center justify-center font-bold">
            {user?.full_name?.charAt(0) || "C"}
          </div>
          <div>
            <h1 className="font-serif text-3xl text-kiru-text">{user?.full_name || "Carmen"}</h1>
            <span className="inline-block mt-1 text-xs bg-kiru-forest-light text-kiru-forest font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Nivel: {user?.level || "Explorador"}
            </span>
          </div>
        </div>

        {/* Tarjetas de SkillCoins y Tareas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-kiru-muted">SkillCoins</p>
            <p className="text-4xl font-bold text-kiru-text mt-2">{user?.skill_coins || 19}</p>
          </div>
          <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-kiru-muted">Tareas pendientes</p>
            <p className="text-4xl font-bold text-kiru-text mt-2">3</p>
          </div>
        </div>
      </main>
    </div>
  );
}