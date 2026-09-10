"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  UserPlus, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  X,
  Save,
  Link2,
  CheckCircle2,
  Bell,
  FileText,
  Plus,
  Users
} from "lucide-react";

interface UserAccount {
  id: string;
  name: string;
  username: string;
  password?: string;
  role: "alumno" | "mentor" | "padre" | "admin";
  createdAt: string;
}

interface MentorStudentLink {
  studentUsername: string;
  mentorUsername: string;
}

interface Notice {
  id: string;
  title: string;
  targetStudent: string; // username del alumno o "todos"
  date: string;
  content: string;
}

interface DocumentItem {
  id: string;
  title: string;
  targetStudent: string; // username del alumno o "todos"
  type: string;
  requiresAcceptance: boolean;
  accepted?: boolean;
  acceptedAt?: string;
}

const DEFAULT_USERS: UserAccount[] = [
  { id: "1", name: "Carmen Fernández", username: "carmen", password: "carmen123", role: "alumno", createdAt: "2026-08-20" },
  { id: "2", name: "Tutor Principal", username: "mentor", password: "mentor123", role: "mentor", createdAt: "2026-08-20" },
  { id: "3", name: "Familia Fernández", username: "familia", password: "familia123", role: "padre", createdAt: "2026-08-20" },
  { id: "4", name: "Administrador General", username: "admin", password: "admin123", role: "admin", createdAt: "2026-08-20" },
];

const DEFAULT_LINKS: MentorStudentLink[] = [
  { studentUsername: "carmen", mentorUsername: "mentor" }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"usuarios" | "avisos" | "documentos">("usuarios");

  const [users, setUsers] = useState<UserAccount[]>(DEFAULT_USERS);
  const [links, setLinks] = useState<MentorStudentLink[]>(DEFAULT_LINKS);
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"alumno" | "mentor" | "padre" | "admin">("alumno");
  
  // Estados para la vinculación Mentor <-> Alumno
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");

  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [msg, setMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Estados para Avisos
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeTarget, setNoticeTarget] = useState("todos");
  const [noticeContent, setNoticeContent] = useState("");

  // Estados para Documentos
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [docTitle, setDocTitle] = useState("");
  const [docTarget, setDocTarget] = useState("todos");
  const [docType, setDocType] = useState("Propuesta");
  const [requiresSign, setRequiresSign] = useState(false);

  useEffect(() => {
    // Cargar usuarios
    const saved = localStorage.getItem("kiru_custom_users");
    if (saved) {
      try {
        setUsers(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    // Cargar enlaces
    const savedLinks = localStorage.getItem("kiru_mentor_links");
    if (savedLinks) {
      try {
        setLinks(JSON.parse(savedLinks));
      } catch (e) {
        console.error(e);
      }
    }

    // Cargar avisos
    const savedNotices = localStorage.getItem("kiru_admin_notices");
    if (savedNotices) {
      try {
        setNotices(JSON.parse(savedNotices));
      } catch (e) {
        console.error(e);
      }
    } else {
      const initialNotices: Notice[] = [
        {
          id: "n1",
          title: "Festivo Nacional",
          targetStudent: "todos",
          date: "12 de Octubre",
          content: "No habrá sesiones lectivas durante esta jornada festiva."
        }
      ];
      setNotices(initialNotices);
      localStorage.setItem("kiru_admin_notices", JSON.stringify(initialNotices));
    }

    // Cargar documentos
    const savedDocs = localStorage.getItem("kiru_admin_docs");
    if (savedDocs) {
      try {
        setDocuments(JSON.parse(savedDocs));
      } catch (e) {
        console.error(e);
      }
    } else {
      const initialDocs: DocumentItem[] = [
        {
          id: "d1",
          title: "Propuesta Personalizada Método Kiru",
          targetStudent: "carmen",
          type: "Propuesta",
          requiresAcceptance: false
        },
        {
          id: "d2",
          title: "Normas de Funcionamiento y Convivencia",
          targetStudent: "todos",
          type: "Normas",
          requiresAcceptance: true,
          accepted: false
        }
      ];
      setDocuments(initialDocs);
      localStorage.setItem("kiru_admin_docs", JSON.stringify(initialDocs));
    }
  }, []);

  const saveToStorage = (updatedUsers: UserAccount[]) => {
    setUsers(updatedUsers);
    localStorage.setItem("kiru_custom_users", JSON.stringify(updatedUsers));
  };

  const saveLinksToStorage = (updatedLinks: MentorStudentLink[]) => {
    setLinks(updatedLinks);
    localStorage.setItem("kiru_mentor_links", JSON.stringify(updatedLinks));
  };

  // Gestión de Usuarios
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

    const oldUsername = users.find(u => u.id === editingUser.id)?.username;
    const updated = users.map((u) =>
      u.id === editingUser.id ? { ...editingUser, username: cleanUsername } : u
    );

    if (oldUsername && oldUsername !== cleanUsername) {
      const updatedLinks = links.map(l => {
        if (l.studentUsername === oldUsername) return { ...l, studentUsername: cleanUsername };
        if (l.mentorUsername === oldUsername) return { ...l, mentorUsername: cleanUsername };
        return l;
      });
      saveLinksToStorage(updatedLinks);
    }

    saveToStorage(updated);
    setEditingUser(null);
    setMsg({ text: `Usuario «${cleanUsername}» actualizado con éxito.`, type: "success" });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleDeleteUser = (id: string, userToDelete: string) => {
    if (userToDelete === "admin") {
      setMsg({ text: "No puedes eliminar el usuario administrador principal.", type: "error" });
      return;
    }
    const updated = users.filter((u) => u.id !== id);
    saveToStorage(updated);

    const updatedLinks = links.filter(
      l => l.studentUsername !== userToDelete && l.mentorUsername !== userToDelete
    );
    saveLinksToStorage(updatedLinks);

    setMsg({ text: `Usuario «${userToDelete}» eliminado.`, type: "success" });
    setTimeout(() => setMsg(null), 4000);
  };

  // Vinculación Mentor <-> Alumno
  const handleAssignMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !selectedMentor) {
      setMsg({ text: "Selecciona tanto un alumno como un mentor.", type: "error" });
      return;
    }

    const filtered = links.filter(l => l.studentUsername !== selectedStudent);
    const updatedLinks = [...filtered, { studentUsername: selectedStudent, mentorUsername: selectedMentor }];
    saveLinksToStorage(updatedLinks);

    setMsg({ 
      text: `Vinculación guardada: @${selectedStudent} asignado/a a @${selectedMentor}.`, 
      type: "success" 
    });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleRemoveLink = (studentUsername: string) => {
    const updatedLinks = links.filter(l => l.studentUsername !== studentUsername);
    saveLinksToStorage(updatedLinks);
    setMsg({ text: `Se ha retirado la vinculación para @${studentUsername}.`, type: "success" });
    setTimeout(() => setMsg(null), 4000);
  };

  // Gestión de Avisos
  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeContent.trim()) return;

    const newNotice: Notice = {
      id: Date.now().toString(),
      title: noticeTitle.trim(),
      targetStudent: noticeTarget,
      date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "short" }),
      content: noticeContent.trim()
    };

    const updated = [newNotice, ...notices];
    setNotices(updated);
    localStorage.setItem("kiru_admin_notices", JSON.stringify(updated));

    setNoticeTitle("");
    setNoticeContent("");
    setMsg({ text: "Aviso publicado con éxito.", type: "success" });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleDeleteNotice = (id: string) => {
    const updated = notices.filter((n) => n.id !== id);
    setNotices(updated);
    localStorage.setItem("kiru_admin_notices", JSON.stringify(updated));
    setMsg({ text: "Aviso eliminado.", type: "success" });
    setTimeout(() => setMsg(null), 3000);
  };

  // Gestión de Documentos PDF
  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    const newDoc: DocumentItem = {
      id: Date.now().toString(),
      title: docTitle.trim(),
      targetStudent: docTarget,
      type: docType,
      requiresAcceptance: requiresSign,
      accepted: false
    };

    const updated = [newDoc, ...documents];
    setDocuments(updated);
    localStorage.setItem("kiru_admin_docs", JSON.stringify(updated));

    setDocTitle("");
    setRequiresSign(false);
    setMsg({ text: "Documento publicado y asignado.", type: "success" });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleDeleteDoc = (id: string) => {
    const updated = documents.filter((d) => d.id !== id);
    setDocuments(updated);
    localStorage.setItem("kiru_admin_docs", JSON.stringify(updated));
    setMsg({ text: "Documento eliminado.", type: "success" });
    setTimeout(() => setMsg(null), 3000);
  };

  const alumnos = users.filter(u => u.role === "alumno");
  const mentores = users.filter(u => u.role === "mentor");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] pb-16 font-sans">
      {/* Cabecera con botón de apagado en negro */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-800" />
          <div>
            <h1 className="font-serif text-xl sm:text-2xl text-slate-900 font-bold">Panel de Administración</h1>
            <p className="text-[11px] sm:text-xs text-slate-500">Gestión general del campus educativo</p>
          </div>
        </div>
        <Link 
          href="/" 
          title="Cerrar sesión"
          className="p-2 sm:p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-900">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Notificaciones */}
        {msg && (
          <div
            className={`p-4 rounded-2xl text-xs font-medium flex items-center justify-between transition-all ${
              msg.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-rose-50 border border-rose-200 text-rose-800"
            }`}
          >
            <span>{msg.text}</span>
            <button onClick={() => setMsg(null)}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Pestañas de navegación de Administración */}
        <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex flex-wrap gap-2 shadow-sm text-xs font-semibold w-fit">
          <button
            onClick={() => setActiveTab("usuarios")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === "usuarios" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Usuarios y Enlaces</span>
          </button>
          <button
            onClick={() => setActiveTab("avisos")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === "avisos" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Gestión de Avisos</span>
          </button>
          <button
            onClick={() => setActiveTab("documentos")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === "documentos" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Gestión de Documentos PDF</span>
          </button>
        </div>

        {/* SECCIÓN 1: USUARIOS Y VÍNCULOS */}
        {activeTab === "usuarios" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Columna Izquierda: Formularios */}
            <div className="space-y-6">
              
              {/* Formulario Crear Usuario */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-800" />
                  <h2 className="font-serif text-lg text-slate-900">Crear nuevo usuario</h2>
                </div>
                <p className="text-xs text-slate-500">
                  Registra nuevos alumnos, mentores o tutores legales.
                </p>

                <form onSubmit={handleCreateUser} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Lucía Navarro"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-slate-200 bg-[#F7F6F3] text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Usuario
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: lucia"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-slate-200 bg-[#F7F6F3] text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Contraseña
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: lucia123"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-slate-200 bg-[#F7F6F3] text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Tipo de usuario / Rol
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full p-3 rounded-2xl border border-slate-200 bg-[#F7F6F3] text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
                    >
                      <option value="alumno">Alumno</option>
                      <option value="mentor">Mentor</option>
                      <option value="padre">Padre / Madre</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 text-white text-xs font-semibold rounded-2xl hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
                  >
                    <UserPlus className="w-4 h-4" /> Registrar Usuario
                  </button>
                </form>
              </div>

              {/* Tarjeta Enlazar Alumno con Mentor */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-blue-600" />
                  <h2 className="font-serif text-lg text-slate-900">Enlazar Mentor y Alumno</h2>
                </div>
                <p className="text-xs text-slate-500">
                  Asigna a cada alumno su mentor correspondiente.
                </p>

                <form onSubmit={handleAssignMentor} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Seleccionar Alumno
                    </label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-slate-200 bg-[#F7F6F3] text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
                    >
                      <option value="">-- Elige un alumno --</option>
                      {alumnos.map((a) => (
                        <option key={a.id} value={a.username}>
                          {a.name} (@{a.username})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Seleccionar Mentor
                    </label>
                    <select
                      value={selectedMentor}
                      onChange={(e) => setSelectedMentor(e.target.value)}
                      className="w-full p-3 rounded-2xl border border-slate-200 bg-[#F7F6F3] text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
                    >
                      <option value="">-- Elige un mentor --</option>
                      {mentores.map((m) => (
                        <option key={m.id} value={m.username}>
                          {m.name} (@{m.username})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={!selectedStudent || !selectedMentor}
                    className="w-full py-3 bg-blue-700 text-white text-xs font-semibold rounded-2xl hover:bg-blue-800 transition-colors shadow-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-40"
                  >
                    <Link2 className="w-4 h-4" /> Asignar Mentor
                  </button>
                </form>
              </div>

            </div>

            {/* Tabla de Usuarios Registrados */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
              <div>
                <h2 className="font-serif text-lg text-slate-900">Usuarios registrados ({users.length})</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visualiza, edita o elimina las cuentas del sistema.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                      <th className="pb-3 pl-2">Nombre / Usuario</th>
                      <th className="pb-3">Rol</th>
                      <th className="pb-3">Mentor Asignado</th>
                      <th className="pb-3">Contraseña</th>
                      <th className="pb-3 text-right pr-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-900">
                    {users.map((user) => {
                      const mentorLink = links.find(l => l.studentUsername === user.username);
                      const mentorObj = mentorLink ? users.find(u => u.username === mentorLink.mentorUsername) : null;

                      return (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 pl-2">
                            <p className="font-bold text-slate-900">{user.name}</p>
                            <p className="text-[11px] text-slate-400 font-mono">@{user.username}</p>
                          </td>
                          <td className="py-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase ${
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-700"
                                  : user.role === "mentor"
                                  ? "bg-blue-100 text-blue-700"
                                  : user.role === "padre"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3.5">
                            {user.role === "alumno" ? (
                              mentorLink ? (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-[11px] font-medium border border-blue-200">
                                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                                  <span>{mentorObj ? mentorObj.name : `@${mentorLink.mentorUsername}`}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveLink(user.username)}
                                    className="ml-1 text-blue-400 hover:text-rose-600 font-bold"
                                    title="Quitar mentor"
                                  >
                                    ×
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[11px] text-slate-400 italic">Sin mentor</span>
                              )
                            ) : (
                              <span className="text-[11px] text-slate-300">—</span>
                            )}
                          </td>
                          <td className="py-3.5 font-mono text-[11px] text-slate-500">
                            {user.password || "••••••••"}
                          </td>
                          <td className="py-3.5 text-right pr-2">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setEditingUser(user)}
                                className="p-2 rounded-xl border border-slate-200 bg-[#F7F6F3] hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-500 transition-all"
                                title="Editar usuario"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteUser(user.id, user.username)}
                                className="p-2 rounded-xl border border-slate-200 bg-[#F7F6F3] hover:bg-rose-600 hover:text-white hover:border-rose-600 text-slate-500 transition-all"
                                title="Eliminar usuario"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 2: GESTIÓN DE AVISOS */}
        {activeTab === "avisos" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 md:col-span-1 h-fit">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-700" />
                <h2 className="font-serif text-base text-slate-900">Crear Comunicación</h2>
              </div>

              <form onSubmit={handleCreateNotice} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Título del aviso
                  </label>
                  <input
                    type="text"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    placeholder="Ej: Cambio de horario"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Destinatario
                  </label>
                  <select
                    value={noticeTarget}
                    onChange={(e) => setNoticeTarget(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="todos">Todos los alumnos / Familias</option>
                    {alumnos.map((a) => (
                      <option key={a.id} value={a.username}>
                        {a.name} (@{a.username})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    placeholder="Escribe aquí el texto del aviso (festivo, cancelación...)"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Publicar Aviso
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 md:col-span-2">
              <h2 className="font-serif text-base text-slate-900">Avisos Activos en el Campus ({notices.length})</h2>
              <div className="space-y-3">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-2xl border border-slate-100 bg-[#FAF8F5] flex justify-between items-start gap-4 shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900">{n.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium">
                          {n.targetStudent === "todos" ? "Todas las familias" : `Alumno: @${n.targetStudent}`}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{n.content}</p>
                      <span className="text-[10px] text-slate-400 block pt-1">{n.date}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteNotice(n.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                      title="Eliminar aviso"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 3: GESTIÓN DE DOCUMENTOS PDF */}
        {activeTab === "documentos" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 md:col-span-1 h-fit">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-700" />
                <h2 className="font-serif text-base text-slate-900">Subir Documento</h2>
              </div>

              <form onSubmit={handleCreateDocument} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Título del documento
                  </label>
                  <input
                    type="text"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="Ej: Propuesta de Acompañamiento"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Asignar a
                  </label>
                  <select
                    value={docTarget}
                    onChange={(e) => setDocTarget(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="todos">Todos los alumnos / Padres</option>
                    {alumnos.map((a) => (
                      <option key={a.id} value={a.username}>
                        {a.name} (@{a.username})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Tipo de documento
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="Propuesta">Propuesta personalizada</option>
                    <option value="Normas">Normas de Método Kiru</option>
                    <option value="Informe">Informe pedagógico</option>
                    <option value="Otro">Otro documento</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="requireSignCheck"
                    checked={requiresSign}
                    onChange={(e) => setRequiresSign(e.target.checked)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-0"
                  />
                  <label htmlFor="requireSignCheck" className="text-xs text-slate-600">
                    Requiere confirmación de lectura
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Publicar Documento
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 md:col-span-2">
              <h2 className="font-serif text-base text-slate-900">Documentos Publicados ({documents.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map((d) => (
                  <div
                    key={d.id}
                    className="p-4 rounded-2xl border border-slate-100 bg-[#FAF8F5] flex flex-col justify-between space-y-3 shadow-sm"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {d.type}
                        </span>
                        <button
                          onClick={() => handleDeleteDoc(d.id)}
                          className="text-slate-400 hover:text-rose-600 transition"
                          title="Eliminar documento"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h3 className="font-serif text-sm text-slate-900 font-medium mt-1">{d.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Asignado a: <strong className="text-slate-700">{d.targetStudent === "todos" ? "Todos" : `@${d.targetStudent}`}</strong>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 text-[10px]">
                      {d.requiresAcceptance ? (
                        <span className="text-amber-700 font-semibold flex items-center gap-1">
                          ● Requiere confirmación familiar
                        </span>
                      ) : (
                        <span className="text-slate-400">Lectura informativa</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Editar Usuario */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-800" />
                <h3 className="font-serif text-lg text-slate-900">Editar Usuario</h3>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-slate-200 bg-[#F7F6F3] text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Usuario
                </label>
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-slate-200 bg-[#F7F6F3] text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Contraseña
                </label>
                <input
                  type="text"
                  value={editingUser.password || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  className="w-full p-3 rounded-2xl border border-slate-200 bg-[#F7F6F3] text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Rol asignado
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full p-3 rounded-2xl border border-slate-200 bg-[#F7F6F3] text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
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
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
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