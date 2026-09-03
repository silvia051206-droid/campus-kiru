{/* 5. CALCÚLALO */}
        {activeTab === 'calculalo' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-serif text-slate-900 mb-2">Cómo acceder</h2>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600">
                <li>Pulsa «Acceder a Calcúlalo».</li>
                <li>Accede como alumno (opción «Estudiante»).</li>
                <li>Usa tu código de clase y tu PIN.</li>
              </ol>
            </div>

            {/* TARJETA VISUAL EXACTA DE CALCULALO.APP */}
            <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
              <div className="text-center mb-8">
                <span className="text-sm font-bold tracking-widest text-[#4F46E5] uppercase">
                  CALCULALO
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-3">
                  Iniciar sesión en Calcúlalo
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Elige cómo quieres acceder
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://calculalo.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-[#FBFBFF] hover:border-indigo-300 transition"
                >
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-900">Docente</p>
                    <p className="text-xs text-slate-400">Accede a tu aula y gestiona tus alumnos</p>
                  </div>
                  <span className="text-slate-300 font-bold text-sm">›</span>
                </a>

                <a
                  href="https://calculalo.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-[#FBFBFF] hover:border-indigo-300 transition"
                >
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-900">Padre / Madre</p>
                    <p className="text-xs text-slate-400">Supervisa el progreso de tus hijos</p>
                  </div>
                  <span className="text-slate-300 font-bold text-sm">›</span>
                </a>

                <a
                  href="https://calculalo.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/30 transition"
                >
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-900">Estudiante</p>
                    <p className="text-xs text-slate-500">Entra a tu clase con tu código o QR</p>
                  </div>
                  <span className="text-emerald-600 font-bold text-sm">›</span>
                </a>
              </div>

              <div className="mt-8">
                <a
                  href="https://calculalo.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 px-4 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
                >
                  Acceder a Calcúlalo
                </a>
              </div>
            </div>
          </div>
        )}