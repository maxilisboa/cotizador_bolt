import React from "react";
import { Home, FileText, ShieldCheck, Users, Settings, LogOut } from "lucide-react";
import Logo from "../assets/logo_completo1.png";

export default function Dashboard({ user, setUser }) {
  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  const menu = [
    { icon: <Home size={18} />, label: "Dashboard" },
    { icon: <FileText size={18} />, label: "Cotizaciones" },
    { icon: <ShieldCheck size={18} />, label: "Pólizas" },
    { icon: <Users size={18} />, label: "Clientes" },
    { icon: <Settings size={18} />, label: "Configuración" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-60 bg-gradient-to-br from-blue-700 to-purple-700 text-white flex flex-col">
        <div className="flex items-center justify-center h-24 border-b border-white/20">
          <img src={Logo} alt="Live Seguros" className="w-28 drop-shadow-lg" />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menu.map((item, i) => (
            <button
              key={i}
              className="flex items-center w-full gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {item.icon}
              <span className="text-sm font-light">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="border-t border-white/20 p-4">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar superior */}
        <header className="flex justify-between items-center bg-white h-16 px-6 shadow-sm">
          <h1 className="text-lg font-semibold">Panel principal</h1>

          <div className="flex items-center gap-6">
            {/* Indicadores UF / USD */}
            <div className="flex gap-4 text-sm text-gray-600">
              <span>UF: —</span>
              <span>USD: —</span>
            </div>

            {/* Usuario */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">{user?.nombre}</span>
            </div>
          </div>
        </header>

        {/* Área de contenido */}
        <main className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-center text-center">
            <h3 className="text-gray-500 text-sm mb-1">Cotizaciones</h3>
            <p className="text-2xl font-semibold text-gray-800">0</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-center text-center">
            <h3 className="text-gray-500 text-sm mb-1">Pólizas</h3>
            <p className="text-2xl font-semibold text-gray-800">0</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-center text-center">
            <h3 className="text-gray-500 text-sm mb-1">Clientes</h3>
            <p className="text-2xl font-semibold text-gray-800">0</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-center text-center">
            <h3 className="text-gray-500 text-sm mb-1">Usuarios</h3>
            <p className="text-2xl font-semibold text-gray-800">0</p>
          </div>
        </main>
      </div>
    </div>
  );
}
