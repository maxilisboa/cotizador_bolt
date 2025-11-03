import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, FileText, Shield, Clipboard } from "lucide-react";

export default function Dashboard({ user, setUser }) {
  const [indicadores, setIndicadores] = useState({
    uf: 0,
    usd: 0,
    fecha: "",
    fuente: "",
  });
  const [datos, setDatos] = useState({
    cotizaciones: 0,
    polizas: 0,
    clientes: 0,
    usuarios: 0,
    moras: 0,
  });

  // --- Cargar indicadores UF/USD ---
  useEffect(() => {
    fetch("/api/indicadores")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setIndicadores(d))
      .catch((e) => {
        console.error("Error al obtener indicadores:", e);
        setIndicadores({ uf: 0, usd: 0, fecha: "", fuente: "—" });
      });
  }, []);

  // --- Cargar datos base del Dashboard ---
  useEffect(() => {
    fetch("/api/dashboard", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setDatos(d))
      .catch((e) => console.error("Error al obtener datos del dashboard:", e));
  }, []);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  // --- Datos simulados del gráfico (visual) ---
  const data = [
    { name: "Ene", cotizaciones: 12, polizas: 8 },
    { name: "Feb", cotizaciones: 18, polizas: 10 },
    { name: "Mar", cotizaciones: 25, polizas: 14 },
    { name: "Abr", cotizaciones: 22, polizas: 11 },
  ];

  // --- Cards principales ---
  const cards = [
    { title: "Cotizaciones", value: datos.cotizaciones, icon: <Clipboard size={28} /> },
    { title: "Pólizas", value: datos.polizas, icon: <Shield size={28} /> },
    { title: "Clientes", value: datos.clientes, icon: <Users size={28} /> },
    { title: "Usuarios", value: datos.usuarios, icon: <FileText size={28} /> },
    { title: "Moras pendientes", value: datos.moras, icon: <Shield size={28} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-gradient-to-b from-blue-600 to-purple-700 text-white p-4 flex flex-col">
        <div className="text-2xl font-bold mb-6">Live Seguros</div>
        <nav className="flex flex-col gap-4">
          {["Dashboard", "Cotizaciones", "Pólizas", "Clientes", "Configuración"].map(
            (item) => (
              <button
                key={item}
                className="text-left hover:bg-white/10 p-2 rounded transition"
              >
                {item}
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-white p-4 shadow">
          <div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500">
              UF: {indicadores.uf.toLocaleString("es-CL")} | USD:{" "}
              {indicadores.usd.toLocaleString("es-CL")}
            </p>
            <p className="text-xs text-gray-400">
              Fuente: {indicadores.fuente || "—"} ·{" "}
              {indicadores.fecha
                ? new Date(indicadores.fecha).toLocaleDateString("es-CL")
                : ""}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-700">{user?.nombre ?? "Usuario"}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Salir
            </button>
          </div>
        </header>

        {/* Cards */}
        <section className="grid grid-cols-5 gap-4 p-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white p-4 rounded-2xl shadow flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-500">{c.title}</p>
                <p className="text-2xl font-semibold">{c.value}</p>
              </div>
              <div className="text-blue-600">{c.icon}</div>
            </div>
          ))}
        </section>

        {/* Gráfico */}
        <section className="flex-1 p-6">
          <div className="bg-white rounded-2xl shadow p-4 h-full">
            <h2 className="text-lg font-semibold mb-4">
              Evolución mensual (simulada)
            </h2>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cotizaciones" fill="#2563eb" />
                <Bar dataKey="polizas" fill="#9333ea" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
