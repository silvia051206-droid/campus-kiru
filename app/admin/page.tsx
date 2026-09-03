"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft,
  X,
  Save,
  KeyRound
} from "lucide-react";

interface UserAccount {
  id: string;
  name: string;
  username: string;
  password?: string;
  role: "alumno" | "mentor" | "padre" | "admin";
  createdAt: string;
}

const DEFAULT_USERS: UserAccount[] = [
  { id: "1", name: "Carmen Fernández", username: "carmen", password: "carmen123", role: "alumno", createdAt: "2026-08-20" },
  { id: "2", name: "Tutor Principal", username: "mentor", password: "mentor123", role: "mentor", createdAt: "2026-08-20" },
  { id: "3", name: "Familia Fernández", username: "familia", password: "familia123", role: "padre", createdAt: "2026-08-20" },
  { id: "4", name: "Administrador General", username: "admin", password: "admin123", role: "admin", createdAt: "2026-08-20" },
];

export default function AdminPage() {
  const [users, setUsers] = useState<UserAccount[]>(DEFAULT_USERS);
  
  // Estados para nuevo usuario
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"alumno" | "mentor" | "padre" | "admin">("alumno");
  
  // Estado para editar usuario
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Cargar usuarios de localStorage si existen
  useEffect(() => {
    const saved = localStorage.getItem("kiru_custom_users");
    if (saved) {
      try {
        setUsers(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveToStorage = (updatedUsers: UserAccount[]) => {
    setUsers(updatedUsers);
    localStorage.setItem("kiru_custom_users", JSON.stringify(updatedUsers));
  };

  // Crear usuario
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !password.trim()) {
      setMsg({ text: "Por favor, completa todos los campos.", type: "error" });
      return;
    }

    const cleanUsername = username.trim().toLowerCase();
    if (users.some((u) => u.username.toLowerCase() === cleanUsername)) {
      setMsg({ text: "Ese nombre de usuario ya existe.", type: "error" });
      return;
    }

    const newUser: UserAccount = {
      id: Date.now().toString(),
      name: name.trim(),
      username: cleanUsername,
      password: password.trim(),
      role,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newUser, ...users];
    saveToStorage(updated);
    
    setName("");
    setUsername("");
    setPassword("");
    setRole("alumno");
    setMsg({ text: `Usuario «${cleanUsername}» creado correctamente.`, type: "success" });
    setTimeout(() => setMsg(null), 4000);
  };

  // Guardar cambios al editar
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    if (!editingUser.name.trim() || !editingUser.username.trim() || !editingUser.password?.trim()) {
      setMsg({ text: "Los campos no pueden quedar vacíos.", type: "error" });
      return;
    }

    const cleanUsername = editingUser.username.trim().toLowerCase();
    const existsOther = users.some((u) => u.id !== editingUser.id && u.username.toLowerCase() === cleanUsername);
    if (existsOther) {
      setMsg({ text: "Ese nombre de usuario ya pertenece a otra cuenta.", type: "error" });
      return;
    }

    const updated = users.map((u) =>
      u.id === editingUser.id ? { ...editingUser, username: cleanUsername } : u
    );

    saveToStorage(updated);
    setEditingUser(null);
    setMsg({ text: `Usuario «${cleanUsername}» actualizado con éxito.`, type: "success" });
    setTimeout(() => setMsg(null), 4000);
  };

  // Eliminar usuario
  const handleDeleteUser = (id: string, userToDelete: string) => {
    if (userToDelete === "admin") {
      setMsg({ text: "No puedes eliminar el usuario administrador principal.", type: "error" });
      return;
    }
    const updated = users.filter((u) => u.id !== id);
    saveToStorage(updated);
    setMsg({ text: `Usuario «${userToDelete}» eliminado.`, type: "success" });
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="min-h-screen bg-kiru-bg pb-16">
      {/* Cabecera */}
      <header className="bg-kiru-card border-b border-kiru-border px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-kiru-forest" />
          <div>
            <h1 className="font-serif text-2xl text-kiru-text">Panel de Administración</h1>
            <p className="text-xs text-kiru-muted">Gestión general de cuentas y permisos</p>
          </div>
        </div>
        <Link 
          href="/" 
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 border border-rose-200 bg-white px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-rose-50 transition"
        >
          Cerrar sesión
        </Link>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Notificaciones */}
        {msg && (
          <div
            className={`p-4 rounded-2xl text-xs font-medium flex items-center justify-between animate-fadeIn ${
              msg.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <span>{msg.text}</span>
            <button onClick={() => setMsg(null)}><X className="w-4 h-4" /></button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* COLUMNA 1: Formulario para crear usuarios */}
          <div className="bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-4 h-fit">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-kiru-forest" />
              <h2 className="font-serif text-lg text-kiru-text">Crear nuevo usuario</h2>
            </div>
            <p className="text-xs text-kiru-muted">
              Registra nuevos alumnos, mentores o tutores legales.
            </p>

            <form onSubmit={handleCreateUser} className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Ej: Lucía Navarro"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-kiru-border bg-[#F7F6F3] text-xs font-medium text-kiru-text focus:outline-none focus:border-kiru-forest"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1">
                  Usuario
                </label>
                <input
                  type="text"
                  placeholder="Ej: lucia"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-kiru-border bg-[#F7F6F3] text-xs font-medium text-kiru-text focus:outline-none focus:border-kiru-forest"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1">
                  Contraseña
                </label>
                <input
                  type="text"
                  placeholder="Ej: lucia123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-kiru-border bg-[#F7F6F3] text-xs font-medium text-kiru-text focus:outline-none focus:border-kiru-forest"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1">
                  Tipo de usuario / Rol
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full p-3 rounded-2xl border border-kiru-border bg-[#F7F6F3] text-xs font-semibold text-kiru-text focus:outline-none focus:border-kiru-forest"
                >
                  <option value="alumno">Alumno</option>
                  <option value="mentor">Mentor</option>
                  <option value="padre">Padre / Madre</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-kiru-forest text-white text-xs font-semibold rounded-2xl hover:bg-kiru-forest-hover transition-colors shadow-xs flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-4 h-4" /> Registrar Usuario
              </button>
            </form>
          </div>

          {/* COLUMNA 2 & 3: Lista de usuarios registrados (Ver, Editar, Eliminar) */}
          <div className="lg:col-span-2 bg-kiru-card rounded-3xl p-6 border border-kiru-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg text-kiru-text">Usuarios registrados ({users.length})</h2>
                <p className="text-xs text-kiru-muted mt-0.5">
                  Visualiza, edita o elimina las cuentas del sistema.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-kiru-border text-kiru-muted uppercase tracking-wider font-semibold">
                    <th className="pb-3 pl-2">Nombre / Usuario</th>
                    <th className="pb-3">Rol</th>
                    <th className="pb-3">Contraseña</th>
                    <th className="pb-3 text-right pr-2">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-kiru-border/60 text-kiru-text">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-[#F7F6F3]/60 transition-colors">
                      <td className="py-3.5 pl-2">
                        <p className="font-bold text-kiru-text">{user.name}</p>
                        <p className="text-[11px] text-kiru-muted font-mono">@{user.username}</p>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "mentor"
                              : user.role === "padre"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono text-[11px] text-kiru-muted">
                        {user.password || "••••••••"}
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingUser(user)}
                            className="p-2 rounded-xl border border-kiru-border bg-[#F7F6F3] hover:bg-kiru-forest hover:text-white hover:border-kiru-forest text-kiru-muted transition-all"
                            title="Editar usuario"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteUser(user.id, user.username)}
                            className="p-2 rounded-xl border border-kiru-border bg-[#F7F6F3] hover:bg-red-500 hover:text-white hover:border-red-500 text-kiru-muted transition-all"
                            title="Eliminar usuario"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal para Editar / Cambiar Usuario */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 border border-kiru-border max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-kiru-border pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-kiru-forest" />
                <h3 className="font-serif text-lg text-kiru-text">Editar Usuario</h3>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-kiru-muted hover:text-kiru-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-kiru-border bg-[#F7F6F3] text-xs font-medium text-kiru-text focus:outline-none focus:border-kiru-forest"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1">
                  Usuario
                </label>
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-kiru-border bg-[#F7F6F3] text-xs font-medium text-kiru-text focus:outline-none focus:border-kiru-forest"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1">
                  Contraseña
                </label>
                <input
                  type="text"
                  value={editingUser.password || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-kiru-border bg-[#F7F6F3] text-xs font-medium text-kiru-text focus:outline-none focus:border-kiru-forest"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-kiru-muted uppercase tracking-wider mb-1">
                  Rol asignado
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full p-3 rounded-2xl border border-kiru-border bg-[#F7F6F3] text-xs font-semibold text-kiru-text focus:outline-none focus:border-kiru-forest"
                >
                  <option value="alumno">Alumno</option>
                  <option value="mentor">Mentor</option>
                  <option value="padre">Padre / Madre</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-2.5 rounded-xl border border-kiru-border text-xs font-semibold text-kiru-muted hover:bg-[#F7F6F3] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-kiru-forest text-white text-xs font-semibold hover:bg-kiru-forest-hover transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" /> Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}