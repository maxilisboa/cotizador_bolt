import React, { useState } from "react";

export default function ComisionVendedor() {
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const calcularComision = async (e) => {
    e.preventDefault();
    setResultado("");
    setLoading(true);

    const cantidad = parseInt(document.getElementById("cantidad_polizas").value, 10);
    const montoUF = parseFloat(
      document.getElementById("monto_neto").value.replace(",", ".")
    );
    if (isNaN(cantidad) || isNaN(montoUF) || cantidad <= 0) {
      alert("Datos inválidos");
      setLoading(false);
      return;
    }

    const tramos = [
      { min: 1, max: 2, pct: 35 },
      { min: 3, max: 4, pct: 40 },
      { min: 5, max: 7, pct: 45 },
      { min: 8, max: 10, pct: 50 },
      { min: 11, max: Infinity, pct: 60 },
    ];
    const tramo = tramos.find((t) => cantidad >= t.min && cantidad <= t.max);
    const porcentaje = tramo ? tramo.pct : 0;

    let valorUF = 37800; // temporal fijo
    try {
      const ufResp = await fetch("/api/uf");
      const ufData = await ufResp.json();
      valorUF = parseFloat(ufData.serie[0].valor.replace(",", "."));
    } catch {
      console.warn("No se pudo obtener valor UF, usando fijo 37.800");
    }

    const comisionUF = montoUF * (porcentaje / 100);
    const comisionCLP = comisionUF * valorUF;

    setResultado(
      `<p><strong>% Comisión:</strong> ${porcentaje}%</p>
       <p><strong>Comisión:</strong> ${comisionUF.toFixed(2)} UF</p>
       <p><strong>Equivalente:</strong> $${comisionCLP.toLocaleString("es-CL")}</p>`
    );
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Comisión de Vendedores
      </h2>
      <form id="comision-form" onSubmit={calcularComision} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Cantidad de pólizas
          </label>
          <input
            id="cantidad_polizas"
            type="number"
            min="1"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Monto total (UF)
          </label>
          <input
            id="monto_neto"
            type="text"
            placeholder="Ej: 150,75"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
        >
          {loading ? "Calculando..." : "Calcular comisión"}
        </button>
      </form>
      <div
        id="resultado-comision"
        className="mt-6 text-center text-gray-700 font-medium"
        dangerouslySetInnerHTML={{ __html: resultado }}
      ></div>
    </div>
  );
}
