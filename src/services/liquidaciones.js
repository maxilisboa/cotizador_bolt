import { supabase } from '../lib/supabase.js';

export async function obtenerValorUF() {
  try {
    const response = await fetch('https://mindicador.cl/api/uf');
    const data = await response.json();
    return parseFloat(data.serie[0].valor);
  } catch (error) {
    console.error('Error obteniendo valor UF:', error);
    return 38000;
  }
}

export async function calcularComisionesVendedor(vendedorId, mes, anio) {
  const { data: polizas, error } = await supabase
    .from('polizas')
    .select(`
      *,
      vendedores (nombre, tipo_comision, comision_porcentaje, porcentaje_comision, monto_fijo_comision),
      aseguradoras (nombre)
    `)
    .eq('vendedor_id', vendedorId)
    .gte('fecha', `${anio}-${String(mes).padStart(2, '0')}-01`)
    .lt('fecha', mes === 12 ? `${anio + 1}-01-01` : `${anio}-${String(mes + 1).padStart(2, '0')}-01`)
    .eq('estado', 'Vigente');

  if (error) {
    console.error('Error fetching polizas:', error);
    throw error;
  }

  let totalComisionCLP = 0;
  let totalComisionUF = 0;
  const detallePolizas = [];
  const valorUF = await obtenerValorUF();

  for (const poliza of polizas || []) {
    const comisionVendedorUF = parseFloat(poliza.comision_vendedor_uf || 0);
    const comisionNetaUF = parseFloat(poliza.comision_neta_uf || 0);
    const comisionVendedorCLP = comisionVendedorUF * valorUF;

    const primaBrutaAnualUF = parseFloat(poliza.prima_bruta_anual_uf || 0);
    const primaBrutaAnualCLP = primaBrutaAnualUF * valorUF;
    const primaBrutaMensualUF = parseFloat(poliza.prima_bruta_mensual_uf || 0);
    const primaBrutaMensualCLP = primaBrutaMensualUF * valorUF;

    totalComisionCLP += comisionVendedorCLP;
    totalComisionUF += comisionVendedorUF;

    detallePolizas.push({
      mes: new Date(poliza.fecha).toLocaleString('es-CL', { month: 'short' }),
      anio: new Date(poliza.fecha).getFullYear(),
      categoria: poliza.categoria || 'N/A',
      estado: poliza.estado,
      fecha: poliza.fecha,
      deducible: poliza.deducible || 0,
      prima_compania: primaBrutaAnualCLP,
      prima_bruta_anual: primaBrutaAnualCLP,
      anual_en_uf: primaBrutaAnualUF,
      prima_neta: primaBrutaMensualCLP,
      prima_bruta_mensual: primaBrutaMensualCLP,
      mensual_en_uf: primaBrutaMensualUF,
      comision_uf: comisionVendedorUF,
      comision_clp: comisionVendedorCLP,
      aseguradora: poliza.aseguradoras?.nombre || poliza.compania || 'N/A',
      poliza_numero: poliza.numero_poliza || 'N/A'
    });
  }

  return {
    polizas: detallePolizas,
    totalComisionCLP,
    totalComisionUF,
    cantidadPolizas: polizas?.length || 0
  };
}

export async function generarLiquidacion(vendedorId, mes, anio) {
  try {
    const valorUF = await obtenerValorUF();

    const comisiones = await calcularComisionesVendedor(vendedorId, mes, anio);

    const totalComisionVendedor = comisiones.totalComisionCLP;
    const negativaFuga = 0;
    const porcentajeRetencion = 15.25;
    const retencionImpuesto = totalComisionVendedor * (porcentajeRetencion / 100);
    const totalLiquido = totalComisionVendedor - retencionImpuesto - negativaFuga;

    const { data: vendedor, error: vendedorError } = await supabase
      .from('vendedores')
      .select('*')
      .eq('id', vendedorId)
      .single();

    if (vendedorError) {
      console.error('Error fetching vendedor:', vendedorError);
      throw vendedorError;
    }

    const liquidacionData = {
      vendedor_id: vendedorId,
      periodo_mes: mes,
      periodo_anio: anio,
      total_comision_uf: comisiones.totalComisionUF,
      total_comision_clp: comisiones.totalComisionCLP,
      total_honorarios: totalComisionVendedor,
      retencion_impuesto: retencionImpuesto,
      total_liquido: totalLiquido,
      valor_uf: valorUF,
      porcentaje_retencion: porcentajeRetencion,
      negativa_fuga: negativaFuga,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('liquidaciones')
      .upsert(liquidacionData, {
        onConflict: 'vendedor_id,periodo_mes,periodo_anio'
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting liquidacion:', error);
      throw error;
    }

    return {
      ...data,
      vendedor,
      detallePolizas: comisiones.polizas
    };
  } catch (error) {
    console.error('Error in generarLiquidacion:', error);
    throw error;
  }
}

export async function obtenerLiquidaciones(mes = null, anio = null) {
  try {
    let query = supabase
      .from('liquidaciones')
      .select(`
        *,
        vendedores (nombre, email, rut)
      `)
      .order('periodo_anio', { ascending: false })
      .order('periodo_mes', { ascending: false });

    if (mes !== null) {
      query = query.eq('periodo_mes', mes);
    }
    if (anio !== null) {
      query = query.eq('periodo_anio', anio);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching liquidaciones:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error in obtenerLiquidaciones:', error);
    return [];
  }
}

export async function obtenerLiquidacionPorId(liquidacionId) {
  try {
    const { data: liquidacion, error } = await supabase
      .from('liquidaciones')
      .select(`
        *,
        vendedores (nombre, email, rut)
      `)
      .eq('id', liquidacionId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching liquidacion:', error);
      throw error;
    }

    if (!liquidacion) {
      throw new Error('Liquidación no encontrada');
    }

    const comisiones = await calcularComisionesVendedor(
      liquidacion.vendedor_id,
      liquidacion.periodo_mes,
      liquidacion.periodo_anio
    );

    return {
      ...liquidacion,
      detallePolizas: comisiones.polizas || []
    };
  } catch (error) {
    console.error('Error in obtenerLiquidacionPorId:', error);
    throw error;
  }
}

export async function eliminarLiquidacion(liquidacionId) {
  const { error } = await supabase
    .from('liquidaciones')
    .delete()
    .eq('id', liquidacionId);

  if (error) throw error;
}

export function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(valor);
}

export function formatearUF(valor) {
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor);
}

export function generarPDFLiquidacion(liquidacion) {
  if (!liquidacion) {
    console.error('No se proporcionó liquidación');
    return;
  }

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const nombreMes = meses[liquidacion.periodo_mes - 1];
  const nombreVendedor = liquidacion.vendedores?.nombre || liquidacion.vendedor?.nombre || 'Vendedor';

  const fecha = new Date().toLocaleDateString('es-CL');

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Liquidación ${nombreVendedor} - ${nombreMes} ${liquidacion.periodo_anio}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          max-width: 900px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .header-info {
          border: 2px solid #000;
          padding: 5px 10px;
        }
        .header-info td {
          padding: 3px 10px;
        }
        .section-title {
          background-color: #8B4789;
          color: white;
          padding: 8px;
          text-align: center;
          font-weight: bold;
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .honorarios-table td {
          border: 1px solid #000;
          padding: 8px;
        }
        .honorarios-table .label {
          background-color: #f0f0f0;
          font-weight: bold;
        }
        .honorarios-table .total {
          background-color: #8B4789;
          color: white;
          font-weight: bold;
        }
        .honorarios-table .negativa {
          color: red;
        }
        .detalle-table {
          font-size: 10px;
          margin-top: 10px;
        }
        .detalle-table th {
          background-color: #2c3e50;
          color: white;
          padding: 8px 4px;
          border: 1px solid #ddd;
          font-weight: bold;
        }
        .detalle-table td {
          padding: 6px 4px;
          border: 1px solid #ddd;
          text-align: center;
        }
        .detalle-table .pink-row {
          background-color: #f8b6d9;
        }
        .detalle-table .total-row {
          background-color: #8B4789;
          color: white;
          font-weight: bold;
        }
        .amount {
          text-align: right;
        }
        .vendor-title {
          background-color: #8B4789;
          color: white;
          padding: 8px;
          font-weight: bold;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <table class="header-info">
          <tr><td><strong>Nombre</strong></td><td>${nombreVendedor}</td></tr>
        </table>
        <table class="header-info">
          <tr><td><strong>Fecha</strong></td><td>${fecha}</td></tr>
        </table>
      </div>

      <div class="section-title">BOLETA HONORARIOS</div>

      <table class="honorarios-table">
        <tr>
          <td class="label">Ventas de seguros</td>
          <td></td>
          <td class="amount">${formatearMoneda(liquidacion.total_honorarios)}</td>
        </tr>
        <tr>
          <td></td>
          <td class="label negativa">Negativa (x fuga)</td>
          <td class="amount negativa">${formatearMoneda(liquidacion.negativa_fuga)}</td>
        </tr>
        <tr>
          <td></td>
          <td class="label">Total Honorarios</td>
          <td class="amount">${formatearMoneda(liquidacion.total_honorarios)}</td>
        </tr>
        <tr>
          <td></td>
          <td class="label">${liquidacion.porcentaje_retencion}% Impto. Retenido</td>
          <td class="amount">${formatearMoneda(liquidacion.retencion_impuesto)}</td>
        </tr>
        <tr>
          <td></td>
          <td class="total">Total Líquido</td>
          <td class="total amount">${formatearMoneda(liquidacion.total_liquido)}</td>
        </tr>
      </table>

      <div class="vendor-title">Tabla ${nombreVendedor}</div>

      <table class="honorarios-table" style="margin-bottom: 10px;">
        <tr>
          <td style="width: 200px;"><strong>${nombreVendedor}</strong></td>
          <td style="text-align: center;"><strong>Comisión en UF</strong></td>
          <td style="text-align: center;"><strong>Comisión en $</strong></td>
        </tr>
        <tr>
          <td><strong>${nombreVendedor}</strong></td>
          <td class="amount">${formatearUF(liquidacion.total_comision_uf)}</td>
          <td class="amount">${formatearMoneda(liquidacion.total_honorarios)}</td>
        </tr>
      </table>
  `;

  if (liquidacion.detallePolizas && liquidacion.detallePolizas.length > 0) {
    html += `
      <table class="detalle-table">
        <thead>
          <tr>
            <th>Mes</th>
            <th>Año</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Ded</th>
            <th>Prima Compañía</th>
            <th>Prima Bruta Anual</th>
            <th>Anual en UF</th>
            <th>Prima Neta</th>
            <th>Prima Bruta Mensual</th>
            <th>Mensual en UF</th>
            <th>Comisión en UF</th>
            <th>Comisión en $</th>
          </tr>
        </thead>
        <tbody>
    `;

    liquidacion.detallePolizas.forEach((poliza, index) => {
      const rowClass = index % 2 === 0 ? '' : 'pink-row';
      html += `
        <tr class="${rowClass}">
          <td>${poliza.mes}</td>
          <td>${poliza.anio}</td>
          <td>${poliza.categoria}</td>
          <td>${poliza.estado}</td>
          <td>${new Date(poliza.fecha).toLocaleDateString('es-CL')}</td>
          <td>${poliza.deducible}</td>
          <td>${formatearMoneda(poliza.prima_compania)}</td>
          <td>${formatearMoneda(poliza.prima_bruta_anual)}</td>
          <td>${formatearUF(poliza.anual_en_uf)}</td>
          <td>${formatearMoneda(poliza.prima_neta)}</td>
          <td>${formatearMoneda(poliza.prima_bruta_mensual)}</td>
          <td>${formatearUF(poliza.mensual_en_uf)}</td>
          <td>${formatearUF(poliza.comision_uf)}</td>
          <td>${formatearMoneda(poliza.comision_clp)}</td>
        </tr>
      `;
    });

    html += `
          <tr class="total-row">
            <td colspan="12">Total general</td>
            <td>${formatearUF(liquidacion.total_comision_uf)}</td>
            <td>${formatearMoneda(liquidacion.total_honorarios)}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  html += `
    </body>
    </html>
  `;

  // Crear un iframe oculto para evitar problemas con pop-ups bloqueados
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  iframe.contentWindow.focus();

  setTimeout(() => {
    iframe.contentWindow.print();

    // Remover el iframe después de imprimir
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 500);
}
