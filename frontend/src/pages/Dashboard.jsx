import React, { useState, useEffect } from "react";
import { Link, useLocation, Navigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Clipboard,
  Shield,
  Users,
  Percent,
  LogOut,
} from "lucide-react";

export default function Dashboard({ user, setUser }) {
  const location = useLocation();
  if (!user) return <Navigate to="/" replace />;

  // === Moras desde backend ===
  const [moras, setMoras] = useState("—");
  useEffect(() => {
    fetch("/api/dashboard", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.moras !== "undefined") setMoras(d.moras);
      })
      .catch(() => setMoras("—"));
  }, []);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  const routes = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/cotizaciones", icon: Clipboard, label: "Cotizaciones" },
    { to: "/polizas", icon: Shield, label: "Pólizas" },
    { to: "/clientes", icon: Users, label: "Clientes" },
    { to: "comisiones", icon: Percent, label: "Comisiones" },
  ];

  const NavItem = ({ to, icon: Icon, label }) => {
    const active = location.pathname.startsWith(to);
    return (
      <Link
        to={to}
        className={[
          "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
          "text-white/90 hover:text-white hover:bg-white/10",
          active ? "bg-white/15 text-white font-medium" : "",
        ].join(" ")}
      >
        <Icon size={20} />
        <span className="text-sm">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-4">
        <div className="px-2 py-3 mb-4">
          <div className="text-lg font-semibold leading-tight">Live Seguros</div>
          <div className="text-xs text-white/80">Cotizador 1.0</div>
        </div>

        <nav className="space-y-1">
          {routes.map((r) => (
            <NavItem key={r.to} {...r} />
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-6 flex items-center gap-2 px-4 py-2 w-full rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm">Cerrar sesión</span>
        </button>
      </aside>

      {/* Contenido */}
      <main className="flex-1 bg-gray-50">
        {/* Header con indicadores */}
        <header className="bg-white shadow p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {location.pathname.includes("/dashboard/comisiones")
                ? "Comisiones"
                : "Dashboard"}
            </h1>
            <div className="text-sm text-gray-600">
              {user?.nombre ? `Conectado: ${user.nombre}` : ""}
            </div>
          </div>

          {/* Indicadores UF/USD */}
          <div className="flex flex-wrap items-center gap-8">
            <Indicator label="UF" value="39.612,97" />
            <Indicator label="USD" value="$943,69" />
          </div>
        </header>

        <section className="p-6 space-y-6">
          {/* Cards métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card title="Cotizaciones" value="—" />
            <Card title="Pólizas" value="—" />
            <Card title="Clientes" value="—" />
            <Card title="Moras" value={moras} />
          </div>

          {/* Rutas hijas, ej: /dashboard/comisiones */}
          <Outlet />
        </section>
      </main>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function Indicator({ label, value, date }) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-baseline gap-2">
        <span className="text-[11px] text-gray-500">{label}:</span>
        <span className="text-base font-semibold text-gray-800 leading-tight">
          {value}
        </span>
      </div>
      <span className="text-[9px] text-gray-400 ml-1">{date}</span>
    </div>
  );
}
