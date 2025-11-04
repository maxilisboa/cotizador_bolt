import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ComisionVendedor from "./pages/ComisionVendedor.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setUser(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 font-medium">Cargando...</p>
      </div>
    );

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Login setUser={setUser} />
          }
        />

        {/* Layout protegido Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        >
          <Route path="comisiones" element={<ComisionVendedor user={user} />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
