{/* Pestaña Calcúlalo del Alumno */}
{activeTab === 'calculalo' && (
  <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
    <h2 className="text-2xl font-serif text-slate-900 mb-4">Calcúlalo</h2>
    <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-slate-100 mb-6">
      <h3 className="text-sm font-bold text-slate-900 mb-3">Cómo acceder</h3>
      <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600">
        <li>Pulsa «Acceder a Calcúlalo».</li>
        <li>Selecciona «Estudiante»[cite: 3].</li>
        <li>Usa tu código de clase y tu PIN[cite: 3].</li>
      </ol>
    </div>
    <a
      href="https://calculalo.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
    >
      Acceder a Calcúlalo
    </a>
  </div>
)}