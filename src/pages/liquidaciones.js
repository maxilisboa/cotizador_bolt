import {
  generarLiquidacion,
  obtenerLiquidaciones,
  obtenerLiquidacionPorId,
  eliminarLiquidacion,
  formatearMoneda,
  formatearUF,
  generarPDFLiquidacion,
  obtenerValorUF
} from '../services/liquidaciones.js';
import { vendedoresService } from '../services/vendedores.js';

let liquidaciones = [];
let vendedores = [];
let valorUF = 0;
let liquidacionSeleccionada = null;

export async function renderLiquidaciones() {
  const container = document.getElementById('view-container');
  if (!container) {
    console.error('view-container not found');
    return '';
  }

  const html = `
    <div class="view-header">
      <h1>Liquidaciones de Sueldos</h1>
      <button class="btn-primary" onclick="window.mostrarModalGenerarLiquidacion()">
        + Generar Liquidación
      </button>
    </div>

    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); margin-bottom: 32px;">
      <div style="display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap;">
        <div style="flex: 0 0 auto;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1e293b; font-size: 13px;">Mes</label>
          <select id="filtroMes" onchange="window.filtrarLiquidaciones()" style="padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; font-size: 14px;">
            <option value="">Todos los meses</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
        <div style="flex: 0 0 auto;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #1e293b; font-size: 13px;">Año</label>
          <select id="filtroAnio" onchange="window.filtrarLiquidaciones()" style="padding: 10px 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; cursor: pointer; font-size: 14px;">
            <option value="">Todos los años</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #fef3c7;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Valor UF Actual</div>
          <div class="stat-value" id="valorUFActual" style="font-size: 20px;">-</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #e0e7ff;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="13" x2="8" y2="13"></line>
            <line x1="12" y1="17" x2="8" y2="17"></line>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Cantidad de Liquidaciones</div>
          <div class="stat-value" id="totalLiquidaciones" style="font-size: 20px;">0</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: #e0e7ff;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Total a Pagar</div>
          <div class="stat-value" id="totalAPagar" style="font-size: 20px;">$0</div>
        </div>
      </div>
    </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Período</th>
              <th>Comisión UF</th>
              <th>Comisión CLP</th>
              <th>Total Honorarios</th>
              <th>Retención</th>
              <th>Líquido a Pagar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="tableLiquidaciones">
            <tr>
              <td colspan="8" style="text-align: center; padding: 32px; color: #94a3b8;">
                Cargando liquidaciones...
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    <div id="modalGenerarLiquidacion" class="modal" style="display: none;">
      <div class="modal-content">
        <h2>Generar Liquidación</h2>
        <form id="formGenerarLiquidacion" onsubmit="window.handleGenerarLiquidacion(event)">
          <div class="form-group">
            <label for="vendedorSelect">Vendedor *</label>
            <select id="vendedorSelect" required>
              <option value="">Seleccione un vendedor</option>
            </select>
          </div>

          <div class="form-group">
            <label for="mesSelect">Mes *</label>
            <select id="mesSelect" required>
              <option value="">Seleccione el mes</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>

          <div class="form-group">
            <label for="anioSelect">Año *</label>
            <select id="anioSelect" required>
              <option value="">Seleccione el año</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div class="btn-group">
            <button type="button" class="btn-secondary" onclick="window.cerrarModalGenerarLiquidacion()">
              Cancelar
            </button>
            <button type="submit" class="btn-primary">
              Generar
            </button>
          </div>
        </form>
      </div>
    </div>

    <div id="modalDetalleLiquidacion" class="modal" style="display: none;">
      <div class="modal-content" style="max-width: 1200px; width: 95%; max-height: 90vh;">
        <h2>Detalle de Liquidación</h2>
        <div id="detalleContent" style="margin-top: 24px;">
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
  await cargarDatos();
}

async function cargarDatos() {
  try {
    valorUF = await obtenerValorUF();
    document.getElementById('valorUFActual').textContent = formatearMoneda(valorUF);

    vendedores = await vendedoresService.getAll();
    const vendedorSelect = document.getElementById('vendedorSelect');
    if (vendedorSelect) {
      vendedorSelect.innerHTML = '<option value="">Seleccione un vendedor</option>';
      vendedores.forEach(v => {
        vendedorSelect.innerHTML += `<option value="${v.id}">${v.nombre}</option>`;
      });
    }

    await cargarLiquidaciones();
  } catch (error) {
    console.error('Error cargando datos:', error);
    alert('Error al cargar los datos');
  }
}

async function cargarLiquidaciones(mes = null, anio = null) {
  try {
    // Si no se especifica mes/año, usar el mes actual
    if (mes === null && anio === null) {
      const ahora = new Date();
      mes = ahora.getMonth() + 1;
      anio = ahora.getFullYear();

      // Actualizar los filtros para reflejar el mes actual
      document.getElementById('filtroMes').value = mes;
      document.getElementById('filtroAnio').value = anio;
    }

    liquidaciones = await obtenerLiquidaciones(mes, anio);
    renderTablaLiquidaciones();
    actualizarEstadisticas();
  } catch (error) {
    console.error('Error cargando liquidaciones:', error);
  }
}

function renderTablaLiquidaciones() {
  const tbody = document.getElementById('tableLiquidaciones');

  if (!liquidaciones || liquidaciones.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8">
          <div class="empty-state" style="margin: 0; box-shadow: none; padding: 40px 20px;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <h3>No hay liquidaciones registradas</h3>
            <p>Comienza generando tu primera liquidación</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = liquidaciones.map(liq => {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const periodo = `${meses[liq.periodo_mes - 1]} ${liq.periodo_anio}`;

    return `
      <tr>
        <td>${liq.vendedores?.nombre || 'N/A'}</td>
        <td>${periodo}</td>
        <td>${formatearUF(liq.total_comision_uf)} UF</td>
        <td>${formatearMoneda(liq.total_comision_clp)}</td>
        <td>${formatearMoneda(liq.total_honorarios)}</td>
        <td>${formatearMoneda(liq.retencion_impuesto)}</td>
        <td><strong>${formatearMoneda(liq.total_liquido)}</strong></td>
        <td style="display: flex; gap: 8px;">
          <button class="btn-icon" onclick="window.verDetalleLiquidacion('${liq.id}')" title="Ver Detalle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button class="btn-icon" onclick="window.descargarPDF('${liq.id}')" title="Descargar PDF">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function actualizarEstadisticas() {
  const totalLiquidaciones = liquidaciones.length;
  const totalAPagar = liquidaciones.reduce((sum, liq) => sum + parseFloat(liq.total_liquido || 0), 0);

  document.getElementById('totalLiquidaciones').textContent = totalLiquidaciones;
  document.getElementById('totalAPagar').textContent = formatearMoneda(totalAPagar);
}

window.mostrarModalGenerarLiquidacion = function() {
  document.getElementById('modalGenerarLiquidacion').style.display = 'flex';
  const mesActual = new Date().getMonth() + 1;
  const anioActual = new Date().getFullYear();
  document.getElementById('mesSelect').value = mesActual;
  document.getElementById('anioSelect').value = anioActual;
};

window.cerrarModalGenerarLiquidacion = function() {
  document.getElementById('modalGenerarLiquidacion').style.display = 'none';
  document.getElementById('formGenerarLiquidacion').reset();
};

window.handleGenerarLiquidacion = async function(e) {
  e.preventDefault();

  const vendedorId = document.getElementById('vendedorSelect').value;
  const mes = parseInt(document.getElementById('mesSelect').value);
  const anio = parseInt(document.getElementById('anioSelect').value);

  if (!vendedorId || !mes || !anio) {
    alert('Por favor complete todos los campos');
    return;
  }

  try {
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Generando...';

    await generarLiquidacion(vendedorId, mes, anio);

    alert('Liquidación generada exitosamente');
    window.cerrarModalGenerarLiquidacion();
    await cargarLiquidaciones();
  } catch (error) {
    console.error('Error generando liquidación:', error);
    alert('Error al generar la liquidación: ' + error.message);
  } finally {
    const btn = e.target.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Generar';
    }
  }
};

window.filtrarLiquidaciones = async function() {
  const mes = document.getElementById('filtroMes').value;
  const anio = document.getElementById('filtroAnio').value;

  await cargarLiquidaciones(
    mes ? parseInt(mes) : null,
    anio ? parseInt(anio) : null
  );
};

window.verDetalleLiquidacion = async function(liquidacionId) {
  try {
    const liquidacion = await obtenerLiquidacionPorId(liquidacionId);
    liquidacionSeleccionada = liquidacion;

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const detalleContent = document.getElementById('detalleContent');

    let html = `
      <div style="padding: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
          <div>
            <strong>Vendedor:</strong> ${liquidacion.vendedores?.nombre || 'N/A'}<br>
            <strong>Período:</strong> ${meses[liquidacion.periodo_mes - 1]} ${liquidacion.periodo_anio}
          </div>
          <div>
            <strong>Valor UF:</strong> ${formatearMoneda(liquidacion.valor_uf)}<br>
            <strong>Fecha Generación:</strong> ${new Date(liquidacion.created_at).toLocaleDateString('es-CL')}
          </div>
        </div>

        <div style="background: #6366f1; color: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600;">BOLETA HONORARIOS</h3>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 600; color: #1e293b;">Ventas de seguros</td>
            <td style="padding: 12px 16px;"></td>
            <td style="padding: 12px 16px; text-align: right; color: #1e293b;">${formatearMoneda(liquidacion.total_comision_clp)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px;"></td>
            <td style="padding: 12px 16px; font-weight: 600; color: #dc2626;">Negativa (x fuga)</td>
            <td style="padding: 12px 16px; text-align: right; color: #dc2626;">${formatearMoneda(liquidacion.negativa_fuga)}</td>
          </tr>
          <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px;"></td>
            <td style="padding: 12px 16px; font-weight: 600; color: #1e293b;">Total Honorarios</td>
            <td style="padding: 12px 16px; text-align: right; color: #1e293b;">${formatearMoneda(liquidacion.total_honorarios)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px;"></td>
            <td style="padding: 12px 16px; font-weight: 600; color: #1e293b;">${liquidacion.porcentaje_retencion}% Impto. Retenido</td>
            <td style="padding: 12px 16px; text-align: right; color: #1e293b;">${formatearMoneda(liquidacion.retencion_impuesto)}</td>
          </tr>
          <tr style="background: #6366f1; color: white; font-weight: 600;">
            <td style="padding: 12px 16px;"></td>
            <td style="padding: 12px 16px;">Total Líquido</td>
            <td style="padding: 12px 16px; text-align: right;">${formatearMoneda(liquidacion.total_liquido)}</td>
          </tr>
        </table>

        <div style="background: #6366f1; color: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Tabla ${liquidacion.vendedores?.nombre || 'Vendedor'}</h3>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr style="background: #1e293b; color: white;">
            <th style="padding: 12px 16px; border: 1px solid #e2e8f0; text-align: left; font-weight: 600;">${liquidacion.vendedores?.nombre || 'Vendedor'}</th>
            <th style="padding: 12px 16px; border: 1px solid #e2e8f0; text-align: center; font-weight: 600;">Comisión en UF</th>
            <th style="padding: 12px 16px; border: 1px solid #e2e8f0; text-align: center; font-weight: 600;">Comisión en $</th>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px 16px; font-weight: 600; color: #1e293b;">${liquidacion.vendedores?.nombre || 'Vendedor'}</td>
            <td style="padding: 12px 16px; text-align: right; color: #1e293b;">${formatearUF(liquidacion.total_comision_uf)}</td>
            <td style="padding: 12px 16px; text-align: right; color: #1e293b;">${formatearMoneda(liquidacion.total_honorarios)}</td>
          </tr>
        </table>
    `;

    if (liquidacion.detallePolizas && liquidacion.detallePolizas.length > 0) {
      html += `
        <div style="background: #6366f1; color: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Detalle de Pólizas</h3>
        </div>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
            <thead>
              <tr style="background: #1e293b; color: white;">
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Mes</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Año</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Categoría</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Estado</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Fecha</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Aseguradora</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Prima Bruta Anual</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Anual en UF</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Comisión $</th>
                <th style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; font-size: 13px;">Comisión UF</th>
              </tr>
            </thead>
            <tbody>
      `;

      liquidacion.detallePolizas.forEach((poliza, idx) => {
        const bgColor = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
        html += `
          <tr style="background: ${bgColor}; border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px 12px; text-align: center; font-size: 13px;">${poliza.mes}</td>
            <td style="padding: 10px 12px; text-align: center; font-size: 13px;">${poliza.anio}</td>
            <td style="padding: 10px 12px; font-size: 13px;">${poliza.categoria}</td>
            <td style="padding: 10px 12px; font-size: 13px;">${poliza.estado}</td>
            <td style="padding: 10px 12px; font-size: 13px;">${new Date(poliza.fecha).toLocaleDateString('es-CL')}</td>
            <td style="padding: 10px 12px; font-size: 13px;">${poliza.aseguradora}</td>
            <td style="padding: 10px 12px; text-align: right; font-size: 13px;">${formatearMoneda(poliza.prima_bruta_anual)}</td>
            <td style="padding: 10px 12px; text-align: right; font-size: 13px;">${formatearUF(poliza.anual_en_uf)}</td>
            <td style="padding: 10px 12px; text-align: right; font-size: 13px;">${formatearMoneda(poliza.comision_clp)}</td>
            <td style="padding: 10px 12px; text-align: right; font-size: 13px;">${formatearUF(poliza.comision_uf)}</td>
          </tr>
        `;
      });

      html += `
              <tr style="background: #6366f1; color: white; font-weight: 600;">
                <td colspan="8" style="padding: 12px 16px; text-align: right;">Total general</td>
                <td style="padding: 12px 16px; text-align: right;">${formatearMoneda(liquidacion.total_honorarios)}</td>
                <td style="padding: 12px 16px; text-align: right;">${formatearUF(liquidacion.total_comision_uf)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }

    html += `
        <div style="margin-top: 32px; display: flex; gap: 12px; justify-content: flex-end;">
          <button class="btn-secondary" onclick="window.cerrarModalDetalleLiquidacion()">
            Cerrar
          </button>
          <button class="btn-primary" onclick="window.descargarPDF('${liquidacion.id}')">
            Descargar PDF
          </button>
        </div>
      </div>
    `;

    detalleContent.innerHTML = html;
    document.getElementById('modalDetalleLiquidacion').style.display = 'flex';
  } catch (error) {
    console.error('Error cargando detalle:', error);
    alert('Error al cargar el detalle de la liquidación');
  }
};

window.cerrarModalDetalleLiquidacion = function() {
  document.getElementById('modalDetalleLiquidacion').style.display = 'none';
  liquidacionSeleccionada = null;
};

window.descargarPDF = async function(liquidacionId) {
  try {
    const liquidacion = await obtenerLiquidacionPorId(liquidacionId);
    generarPDFLiquidacion(liquidacion);
  } catch (error) {
    console.error('Error generando PDF:', error);
    alert('Error al generar el PDF');
  }
};

window.eliminarLiquidacionHandler = async function(liquidacionId) {
  if (!confirm('¿Está seguro de eliminar esta liquidación?')) {
    return;
  }

  try {
    await eliminarLiquidacion(liquidacionId);
    alert('Liquidación eliminada exitosamente');
    await cargarLiquidaciones();
  } catch (error) {
    console.error('Error eliminando liquidación:', error);
    alert('Error al eliminar la liquidación');
  }
};
