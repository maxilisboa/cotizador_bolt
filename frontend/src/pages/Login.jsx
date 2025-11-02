import React, { useState } from "react";
import Logo from "../assets/logo_completo1.png";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-purple-700 p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex overflow-hidden min-h-[560px]">
        {/* Panel izquierdo */}
        <div className="w-3/5 bg-gradient-to-br from-blue-700 to-purple-700 text-white flex flex-col justify-center items-center px-14 py-20">
          <img
            src={Logo}
            alt="Live Seguros"
            className="w-80 mb-6 drop-shadow-lg"
          />
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Acceso Live
          </h1>
          <p className="text-center text-white/90 max-w-md leading-relaxed text-[15px]">
            En Live Seguros trabajamos con claridad y propósito.  
            Cada cotización, cada póliza y cada cliente cuentan.  
            Esta plataforma conecta a quienes hacen posible esa confianza.
          </p>
        </div>

        {/* Panel derecho */}
        <div className="w-2/5 bg-white flex flex-col justify-center px-12 py-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Iniciar sesión
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
              className="border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
            )}
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-700 to-blue-700 text-white font-medium rounded p-2 hover:opacity-90 transition-opacity"
            >
              Entrar
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-6">
            Cotizador Live • versión 1.0.4
          </p>
        </div>
      </div>
    </div>
  );
}
