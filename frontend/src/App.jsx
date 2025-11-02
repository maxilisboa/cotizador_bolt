import { useState } from "react";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/usuarios");
      const user = res.data.find(
        (u) => u.email === email && u.pass === pass
      );
      if (user) {
        setMensaje(`Bienvenido ${user.nombre}`);
      } else {
        setMensaje("Credenciales inválidas");
      }
    } catch (err) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-80"
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-blue-700">
          Login Cotizador
        </h1>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
        {mensaje && (
          <p className="text-center mt-4 text-sm text-gray-700">{mensaje}</p>
        )}
      </form>
    </div>
  );
}
