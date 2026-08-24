import Link from "next/link";

export default function PadrePage() {
  return (
    <div className="min-h-screen bg-kiru-bg">
      <nav className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex justify-between items-center">
        <h1 className="font-serif text-xl text-kiru-text">Panel Familiar</h1>
        <Link href="/" className="text-xs font-semibold text-red-500 hover:underline">
          Cerrar sesión
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-kiru-forest-light text-kiru-forest font-serif text-xl flex items-center justify-center font-bold">
              C
            </div>
            <div>
              <h2 className="font-serif text-2xl text-kiru-text">Carmen</h2>
              <span className="text-xs bg-kiru-forest-light text-kiru-forest font-semibold px-2.5 py-0.5 rounded-full uppercase">
                Nivel: Explorador
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-kiru-muted uppercase">SkillCoins</p>
            <p className="text-3xl font-bold text-kiru-text mt-0.5">19</p>
          </div>
        </div>

        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm">
          <h3 className="font-serif text-lg text-kiru-text mb-2">Progreso General</h3>
          <p className="text-sm text-kiru-muted">El alumno mantiene un ritmo constante y ha completado sus actividades de la semana.</p>
        </div>
      </main>
    </div>
  );
}