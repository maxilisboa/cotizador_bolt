import { supabase } from '../lib/supabase.js';
import { indicadoresService } from '../services/indicadores.js';

let vendedores = [];
let polizas = [];
let selectedVendedor = '';
let selectedMonth = '';
let UF_VALUE = 37580;
let cachedIndicadores = null;
let lastFetch = null;

export async function renderReportes() {
  try {
    await loadData();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthNum = currentDate.getMonth() + 1;
    selectedMonth = selectedMonth || `${currentYear}-${String(currentMonthNum).padStart(2, '0')}`;

    return `
      <div class="view-header">
        <h1>Reportes de Comisiones</h1>
      </div>

      <div class="filters-container" style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 16px; align-items: end;">
          <div class="form-group" style="margin: 0;">
            <label for="vendedor-select">Ejecutivo</label>
            <select id="vendedor-select" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              <option value="">Seleccionar ejecutivo</option>
              ${vendedores.map(v => `
                <option value="${v.id}" ${selectedVendedor === v.id ? 'selected' : ''}>${v.nombre}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group" style="margin: 0;">
            <label for="month-select">Mes</label>
            <input type="month" id="month-select" value="${selectedMonth}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          </div>
          <button class="btn-primary" id="generate-report-btn">Generar Reporte</button>
        </div>
      </div>

      <div id="report-container"></div>
    `;
  } catch (error) {
    console.error('Error:', error);
    return '<div class="error-message">Error al cargar reportes</div>';
  }
}

async function loadData() {
  const { data: vendData } = await supabase
    .from('vendedores')
    .select('*')
    .order('nombre');

  vendedores = vendData || [];
}

export function setupReportesHandlers() {
  const generateBtn = document.getElementById('generate-report-btn');
  const vendedorSelect = document.getElementById('vendedor-select');
  const monthSelect = document.getElementById('month-select');

  generateBtn?.addEventListener('click', async () => {
    selectedVendedor = vendedorSelect.value;
    selectedMonth = monthSelect.value;

    if (!selectedVendedor || !selectedMonth) {
      alert('Por favor selecciona un ejecutivo y un mes');
      return;
    }

    await generateReport();
  });
}

async function generateReport() {
  const reportContainer = document.getElementById('report-container');
  reportContainer.innerHTML = '<div style="text-align: center; padding: 40px;">Cargando reporte...</div>';

  try {
    if (!cachedIndicadores || !lastFetch || Date.now() - lastFetch > 24 * 60 * 60 * 1000) {
      cachedIndicadores = await indicadoresService.getAll();
      lastFetch = Date.now();
    }
    UF_VALUE = cachedIndicadores.uf;

    const [year, month] = selectedMonth.split('-');
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const { data: polizasData } = await supabase
      .from('polizas')
      .select(`
        *,
        vendedores:vendedor_id(nombre, comision_porcentaje, tipo_comision),
        aseguradoras:aseguradora_id(nombre)
      `)
      .eq('vendedor_id', selectedVendedor)
      .gte('fecha', startDate.toISOString())
      .lte('fecha', endDate.toISOString())
      .order('fecha');

    polizas = polizasData || [];

    const vendedor = vendedores.find(v => v.id === selectedVendedor);

    const comisionNetaEnUF = polizas.reduce((sum, p) => sum + parseFloat(p.comision_neta_uf || 0), 0);
    const comisionTotalLiveXMes = polizas.reduce((sum, p) => sum + parseFloat(p.comision_vendedor_uf || 0), 0);
    const comisionTotalLiveXMesNETA = comisionTotalLiveXMes;
    const impuesto = comisionTotalLiveXMes * 0.19;
    const utilidadFinal = comisionNetaEnUF - comisionTotalLiveXMes;

    const comisionNetaEnCLP = comisionNetaEnUF * UF_VALUE;
    const comisionTotalLiveXMesCLP = comisionTotalLiveXMes * UF_VALUE;
    const impuestoCLP = impuesto * UF_VALUE;
    const utilidadFinalCLP = utilidadFinal * UF_VALUE;

    reportContainer.innerHTML = `
      <div style="background: white; border-radius: 8px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #e5e7eb;">
          <div>
            <h2 style="margin: 0; color: #1f2937; font-size: 24px;">Reporte de Comisiones</h2>
            <p style="margin: 8px 0 0 0; color: #6b7280;">
              ${vendedor?.nombre || ''} - ${new Date(year, month - 1).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div style="text-align: right;">
            <div style="color: #6b7280; font-size: 14px;">Total Pólizas</div>
            <div style="font-size: 32px; font-weight: 700; color: #0ea5e9;">${polizas.length}</div>
          </div>
        </div>

        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
            <div style="text-align: center; color: white;">
              <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Comisión Total LIVE x Mes</div>
              <div style="font-size: 28px; font-weight: 700;">${comisionTotalLiveXMes.toFixed(3)} UF</div>
              <div style="font-size: 16px; opacity: 0.85; margin-top: 4px;">$${comisionTotalLiveXMesCLP.toLocaleString('es-CL', {maximumFractionDigits: 0})}</div>
            </div>
            <div style="text-align: center; color: white;">
              <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Comisión Total LIVE x Mes NETA</div>
              <div style="font-size: 28px; font-weight: 700;">${comisionTotalLiveXMesNETA.toFixed(3)} UF</div>
              <div style="font-size: 16px; opacity: 0.85; margin-top: 4px;">$${comisionTotalLiveXMesCLP.toLocaleString('es-CL', {maximumFractionDigits: 0})}</div>
            </div>
            <div style="text-align: center; color: white;">
              <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Impuesto</div>
              <div style="font-size: 28px; font-weight: 700;">${impuesto.toFixed(3)} UF</div>
              <div style="font-size: 16px; opacity: 0.85; margin-top: 4px;">$${impuestoCLP.toLocaleString('es-CL', {maximumFractionDigits: 0})}</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
          <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; border-left: 4px solid #6366f1;">
            <div style="color: #4b5563; font-size: 14px; margin-bottom: 8px;">Comisión NETA en UF</div>
            <div style="font-size: 28px; font-weight: 700; color: #1f2937;">${comisionNetaEnUF.toFixed(3)} UF</div>
            <div style="font-size: 18px; color: #6b7280; margin-top: 4px;">$${comisionNetaEnCLP.toLocaleString('es-CL', {maximumFractionDigits: 0})}</div>
          </div>
          <div style="background: #ecfdf5; padding: 20px; border-radius: 6px; border-left: 4px solid #10b981;">
            <div style="color: #065f46; font-size: 14px; margin-bottom: 8px;">Utilidad Final LIVE</div>
            <div style="font-size: 28px; font-weight: 700; color: #047857;">${utilidadFinal.toFixed(3)} UF</div>
            <div style="font-size: 18px; color: #059669; margin-top: 4px;">$${utilidadFinalCLP.toLocaleString('es-CL', {maximumFractionDigits: 0})}</div>
          </div>
        </div>

        ${polizas.length > 0 ? `
          <div style="margin-top: 32px;">
            <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 18px;">Detalle de Pólizas</h3>
            <div style="overflow-x: auto;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Asegurado</th>
                    <th>N° Póliza</th>
                    <th>Compañía</th>
                    <th>Prima Neta UF</th>
                    <th>Com. Total UF</th>
                    <th>Com. Vendedor UF</th>
                  </tr>
                </thead>
                <tbody>
                  ${polizas.map(p => `
                    <tr>
                      <td>${new Date(p.fecha).toLocaleDateString('es-CL')}</td>
                      <td>${p.nombre_asegurado}</td>
                      <td>${p.numero_poliza}</td>
                      <td>${p.aseguradoras?.nombre || '-'}</td>
                      <td>${parseFloat(p.prima_neta_anual_uf || 0).toFixed(2)}</td>
                      <td>${parseFloat(p.comision_neta_uf || 0).toFixed(2)}</td>
                      <td style="font-weight: 600; color: #0ea5e9;">${parseFloat(p.comision_vendedor_uf || 0).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : `
          <div style="text-align: center; padding: 40px; color: #6b7280;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 16px;">
              <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            <p>No hay pólizas para el ejecutivo y mes seleccionado</p>
          </div>
        `}
      </div>
    `;
  } catch (error) {
    console.error('Error:', error);
    reportContainer.innerHTML = '<div class="error-message">Error al generar el reporte</div>';
  }
}
