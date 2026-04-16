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
    <div class="container">
      <div class="page-header">
        <h1>Liquidaciones de Sueldos</h1>
        <button class="btn btn-primary" onclick="window.mostrarModalGenerarLiquidacion()">
          + Generar Liquidación
        </button>
      </div>

      <div class="filters-card" style="margin-bottom: 1.5rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="flex: 0 0 auto;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #2c3e50;">Filtrar por período:</label>
          </div>
          <div style="flex: 0 0 auto;">
            <select id="filtroMes" onchange="window.filtrarLiquidaciones()" style="padding: 0.5rem 2rem 0.5rem 0.75rem; border: 1px solid #ddd; border-radius: 6px; background: white; cursor: pointer;">
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
            <select id="filtroAnio" onchange="window.filtrarLiquidaciones()" style="padding: 0.5rem 2rem 0.5rem 0.75rem; border: 1px solid #ddd; border-radius: 6px; background: white; cursor: pointer;">
              <option value="">Todos los años</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
      </div>

      <div class="stats-grid" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-label">Valor UF Actual</div>
          <div class="stat-value" id="valorUFActual">-</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Liquidaciones</div>
          <div class="stat-value" id="totalLiquidaciones">0</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total a Pagar</div>
          <div class="stat-value" id="totalAPagar">$0</div>
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
              <td colspan="8" style="text-align: center; padding: 2rem;">
                Cargando liquidaciones...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="modalGenerarLiquidacion" class="modal" style="display: none;">
      <div class="modal-content" style="max-width: 500px;">
        <div class="modal-header">
          <h2>Generar Liquidación</h2>
          <button class="close-btn" onclick="window.cerrarModalGenerarLiquidacion()">&times;</button>
        </div>
        <div class="modal-body">
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

            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" onclick="window.cerrarModalGenerarLiquidacion()">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">
                Generar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div id="modalDetalleLiquidacion" class="modal" style="display: none;">
      <div class="modal-content" style="max-width: 1200px;">
        <div class="modal-header">
          <h2>Detalle de Liquidación</h2>
          <button class="close-btn" onclick="window.cerrarModalDetalleLiquidacion()">&times;</button>
        </div>
        <div class="modal-body" id="detalleContent">
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
        <td colspan="8" style="text-align: center; padding: 2rem; color: #666;">
          No hay liquidaciones generadas
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
        <td>
          <button class="btn btn-small btn-primary" onclick="window.verDetalleLiquidacion('${liq.id}')">
            Ver Detalle
          </button>
          <button class="btn btn-small btn-secondary" onclick="window.descargarPDF('${liq.id}')">
            PDF
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

        <div style="background: linear-gradient(135deg, #8B4789 0%, #9b59b6 100%); color: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
          <h3 style="margin: 0 0 0.5rem 0;">BOLETA HONORARIOS</h3>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <tr style="background: #f8f9fa;">
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; font-weight: bold;">Ventas de seguros</td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6;"></td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: right;">${formatearMoneda(liquidacion.total_comision_clp)}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6;"></td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; font-weight: bold; color: red;">Negativa (x fuga)</td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: right; color: red;">${formatearMoneda(liquidacion.negativa_fuga)}</td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 0.75rem; border: 1px solid #dee2e6;"></td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; font-weight: bold;">Total Honorarios</td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: right;">${formatearMoneda(liquidacion.total_honorarios)}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6;"></td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; font-weight: bold;">${liquidacion.porcentaje_retencion}% Impto. Retenido</td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: right;">${formatearMoneda(liquidacion.retencion_impuesto)}</td>
          </tr>
          <tr style="background: linear-gradient(135deg, #8B4789 0%, #9b59b6 100%); color: white; font-weight: bold;">
            <td style="padding: 0.75rem; border: 1px solid #dee2e6;"></td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6;">Total Líquido</td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: right;">${formatearMoneda(liquidacion.total_liquido)}</td>
          </tr>
        </table>

        <div style="background: linear-gradient(135deg, #8B4789 0%, #9b59b6 100%); color: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
          <h3 style="margin: 0;">Tabla ${liquidacion.vendedores?.nombre || 'Vendedor'}</h3>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <tr style="background: #2c3e50; color: white;">
            <th style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: left;">${liquidacion.vendedores?.nombre || 'Vendedor'}</th>
            <th style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: center;">Comisión en UF</th>
            <th style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: center;">Comisión en $</th>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; font-weight: bold;">${liquidacion.vendedores?.nombre || 'Vendedor'}</td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: right;">${formatearUF(liquidacion.total_comision_uf)}</td>
            <td style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: right;">${formatearMoneda(liquidacion.total_honorarios)}</td>
          </tr>
        </table>
    `;

    if (liquidacion.detallePolizas && liquidacion.detallePolizas.length > 0) {
      html += `
        <div style="background: linear-gradient(135deg, #8B4789 0%, #9b59b6 100%); color: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
          <h3 style="margin: 0;">Detalle de Pólizas</h3>
        </div>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
            <thead>
              <tr style="background: #2c3e50; color: white;">
                <th style="padding: 0.5rem; border: 1px solid #dee2e6;">Mes</th>
                <th style="padding: 0.5rem; border: 1px solid #dee2e6;">Año</th>
                <th style="padding: 0.5rem; border: 1px solid #dee2e6;">Categoría</th>
                <th style="padding: 0.5rem; border: 1px solid #dee2e6;">Estado</th>
                <th style="padding: 0.5rem; border: 1px solid #dee2e6;">Fecha</th>
                <th style="padding: 0.5rem; border: 1px solid #dee2e6;">Aseguradora</th>
                <th style="padding: 0.5rem; border: 1px solid #dee2e6;">Prima Bruta Anual</th>
                <th style="padding: 0.5rem; border: 1px solid #dee2e6;">Anual en UF</th>
                <th style="padding: 0.5rem; border: 1px solid #dee2e6;">Comisión $</th>
                <th style="padding: 0.5rem; border: 1px solid #dee2e6;">Comisión UF</th>
              </tr>
            </thead>
            <tbody>
      `;

      liquidacion.detallePolizas.forEach((poliza, idx) => {
        const bgColor = idx % 2 === 0 ? '#ffffff' : '#f8b6d9';
        html += `
          <tr style="background: ${bgColor};">
            <td style="padding: 0.5rem; border: 1px solid #dee2e6; text-align: center;">${poliza.mes}</td>
            <td style="padding: 0.5rem; border: 1px solid #dee2e6; text-align: center;">${poliza.anio}</td>
            <td style="padding: 0.5rem; border: 1px solid #dee2e6;">${poliza.categoria}</td>
            <td style="padding: 0.5rem; border: 1px solid #dee2e6;">${poliza.estado}</td>
            <td style="padding: 0.5rem; border: 1px solid #dee2e6;">${new Date(poliza.fecha).toLocaleDateString('es-CL')}</td>
            <td style="padding: 0.5rem; border: 1px solid #dee2e6;">${poliza.aseguradora}</td>
            <td style="padding: 0.5rem; border: 1px solid #dee2e6; text-align: right;">${formatearMoneda(poliza.prima_bruta_anual)}</td>
            <td style="padding: 0.5rem; border: 1px solid #dee2e6; text-align: right;">${formatearUF(poliza.anual_en_uf)}</td>
            <td style="padding: 0.5rem; border: 1px solid #dee2e6; text-align: right;">${formatearMoneda(poliza.comision_clp)}</td>
            <td style="padding: 0.5rem; border: 1px solid #dee2e6; text-align: right;">${formatearUF(poliza.comision_uf)}</td>
          </tr>
        `;
      });

      html += `
              <tr style="background: linear-gradient(135deg, #8B4789 0%, #9b59b6 100%); color: white; font-weight: bold;">
                <td colspan="8" style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: right;">Total general</td>
                <td style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: right;">${formatearMoneda(liquidacion.total_honorarios)}</td>
                <td style="padding: 0.75rem; border: 1px solid #dee2e6; text-align: right;">${formatearUF(liquidacion.total_comision_uf)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }

    html += `
        <div style="margin-top: 2rem; text-align: right;">
          <button class="btn btn-primary" onclick="window.descargarPDF('${liquidacion.id}')">
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
