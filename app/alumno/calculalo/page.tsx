import Link from "next/link";

export default function CalculaloPage() {
  return (
    <div className="min-h-screen bg-kiru-bg">
      <nav className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex items-center justify-between">
        <div className="flex gap-3 text-sm font-medium">
          <Link href="/alumno" className="text-kiru-muted hover:text-kiru-text px-3.5 py-1.5 rounded-xl">Inicio</Link>
          <Link href="/alumno/tareas" className="text-kiru-muted hover:text-kiru-text px-3.5 py-1.5 rounded-xl">Tareas</Link>
          <Link href="/alumno/calculalo" className="text-kiru-forest bg-kiru-forest-light px-3.5 py-1.5 rounded-xl font-semibold">Calcúlalo</Link>
        </div>
        <Link href="/" className="text-xs font-semibold text-red-500 hover:underline">Cerrar sesión</Link>
      </nav>

      <main className="max-w-xl mx-auto p-6 text-center">
        <div className="bg-kiru-card rounded-3xl p-8 border border-kiru-border shadow-sm space-y-6">
          <h1 className="font-serif text-3xl text-kiru-text">Calcúlalo</h1>
          <div className="bg-[#FAF9F6] p-5 rounded-2xl text-left text-sm text-kiru-text border border-kiru-border space-y-2">
            <p className="font-semibold text-kiru-forest uppercase tracking-wider text-xs">Cómo acceder</p>
            <p>1. Pulsa «Acceder a Calcúlalo».</p>
            <p>2. Accede como alumno.</p>
            <p>3. Usa tu código de clase y tu PIN.</p>
          </div>
          <a
            href="https://calculalo.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 bg-kiru-forest text-white rounded-2xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Acceder a Calcúlalo
          </a>
        </div>
      </main>
    </div>
  );
}