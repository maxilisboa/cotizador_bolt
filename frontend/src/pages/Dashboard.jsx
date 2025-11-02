import React from "react";

export default function Dashboard({ user, setUser }) {
  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold tracking-wide">Live Seguros</h1>
        <button
          onClick={logout}
          className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Cards grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow hover:bg-white/20 transition"
          >
            <h2 className="text-lg font-medium mb-2">Card {i}</h2>
            <p className="text-sm text-white/80">Contenido pendiente</p>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-white/60">
        Sesión activa: {user?.nombre || "Usuario desconocido"}
      </footer>
    </div>
  );
}
