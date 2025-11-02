import React, { useState } from "react";
import Logo from "../assets/DesignSystem/logo_completo1.png";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) setUser(await res.json());
    else setError("Credenciales inválidas");
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Panel izquierdo */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-[#0057ff] to-[#8b00ff] relative text-white">
        <div className="flex flex-col items-center text-center px-8">
          <img
            src={Logo}
            alt="Live Seguros"
            className="w-64 mb-8 drop-shadow-xl select-none"
          />
          <p className="text-white/90 text-lg font-light tracking-wide">
            Tu seguro, más simple con Live.
          </p>
        </div>
        <div className="absolute bottom-4 text-white/70 text-xs">
          Cotizador 1.0 — Live Seguros
        </div>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={handleLogin}
          className="bg-gray-50 border border-gray-200 p-10 rounded-2xl shadow-xl w-96"
        >
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-700">
            Iniciar sesión
          </h2>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0057ff]"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0057ff]"
          />

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0057ff] to-[#8b00ff] text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Entrar
          </button>

          <p className="text-center text-gray-400 text-xs mt-6">
            © {new Date().getFullYear()} Live Seguros
          </p>
        </form>
      </div>
    </div>
  );
}
