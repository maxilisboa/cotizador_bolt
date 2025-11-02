import React, { useState, useEffect } from "react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  // verificar sesión activa al cargar
  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setUser(d))
      .catch(() => {});
  }, []);

  return user ? (
    <Dashboard user={user} setUser={setUser} />
  ) : (
    <Login setUser={setUser} />
  );
}
