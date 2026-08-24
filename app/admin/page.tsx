"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("alumno");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: true });
    if (data) setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from("profiles").insert([{
      full_name: name,
      username: username.trim().toLowerCase(),
      password,
      role
    }]);
    setName(""); setUsername(""); setPassword("");
    setLoading(false);
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("profiles").delete().eq("id", id);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-kiru-bg">
      <nav className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex justify-between items-center">
        <h1 className="font-serif text-xl text-kiru-text">Administración de Usuarios</h1>
        <Link href="/" className="text-xs font-semibold text-red-500 hover:underline">
          Cerrar sesión
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Formulario Crear Usuario */}
        <form onSubmit={handleCreate} className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <h2 className="font-serif text-xl col-span-full text-kiru-text">Crear nuevo usuario</h2>
          <input
            required
            placeholder="Nombre completo (ej: Carmen)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 bg-[#F7F6F3] border border-kiru-border rounded-xl text-sm outline-none"
          />
          <input
            required
            placeholder="Usuario (ej: carmen)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 bg-[#F7F6F3] border border-kiru-border rounded-xl text-sm outline-none"
          />
          <input
            required
            placeholder="Contraseña (ej: carmen123)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 bg-[#F7F6F3] border border-kiru-border rounded-xl text-sm outline-none"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-3 bg-[#F7F6F3] border border-kiru-border rounded-xl text-sm outline-none font-medium"
          >
            <option value="alumno">Alumno</option>
            <option value="mentor">Mentor</option>
            <option value="padre">Padre/madre</option>
            <option value="admin">Administrador</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="col-span-full py-3 bg-kiru-forest text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            {loading ? "Creando..." : "Crear usuario"}
          </button>
        </form>

        {/* Lista de Usuarios Registrados */}
        <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-3">
          <h2 className="font-serif text-xl text-kiru-text mb-4">Usuarios registrados</h2>
          {users.map((u) => (
            <div key={u.id} className="flex justify-between items-center border-b border-kiru-border pb-3 text-sm last:border-0 last:pb-0">
              <div>
                <p className="font-semibold text-kiru-text">{u.full_name} <span className="text-xs font-normal text-kiru-muted">(@{u.username})</span></p>
                <p className="text-xs text-kiru-forest uppercase font-semibold">{u.role}</p>
              </div>
              <button
                onClick={() => handleDelete(u.id)}
                className="text-red-500 text-xs font-semibold hover:underline"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}