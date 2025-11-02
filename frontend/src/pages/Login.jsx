import React, { useState } from "react";
import Logo from "../assets/logo_completo1.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.mensaje || "Login exitoso");
        // ejemplo de redirección futura:
        // window.location.href = "/dashboard";
      } else {
        setError(data.error || "Credenciales inválidas");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Panel izquierdo */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-[linear-gradient(135deg,#0057ff_0%,#8b00ff_100%)] text-white relative">
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
        <span className="absolute bottom-4 text-white/70 text-xs">
          Cotizador 1.0 — Live Seguros
        </span>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 flex justify-center items-center bg-white">
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

          {mensaje && (
            <p className="text-green-600 text-sm text-center mb-4">
              {mensaje}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[linear-gradient(90deg,#0057ff_0%,#8b00ff_100%)] text-white py-3 rounded-lg hover:opacity-90 transition"
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
