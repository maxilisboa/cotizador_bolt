import { supabase } from '../lib/supabase.js';
import { indicadoresService } from '../services/indicadores.js';

let cachedIndicadores = null;
let lastFetch = null;

export async function renderHome() {
  try {
    if (!cachedIndicadores || !lastFetch || Date.now() - lastFetch > 24 * 60 * 60 * 1000) {
      try {
        cachedIndicadores = await indicadoresService.getAll();
        lastFetch = Date.now();
      } catch (indicadorError) {
        console.error('Error obteniendo indicadores, usando valores por defecto:', indicadorError);
        cachedIndicadores = { uf: 37000, usd: 950 };
        lastFetch = Date.now();
      }
    }

    const UF_VALUE = cachedIndicadores.uf;
    const USD_VALUE = cachedIndicadores.usd;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

    const { data: polizas } = await supabase
      .from('polizas')
      .select(`
        *,
        vendedores:vendedor_id(nombre),
        aseguradoras:aseguradora_id(nombre)
      `)
      .gte('fecha', startOfMonth.toISOString())
      .lte('fecha', endOfMonth.toISOString());

    const { data: vendedores } = await supabase
      .from('vendedores')
      .select('*')
      .order('nombre');

    const totalPolizas = polizas?.length || 0;
    const comisionTotalUF = polizas?.reduce((sum, p) => sum + parseFloat(p.comision_neta_uf || 0), 0) || 0;
    const comisionVendedorUF = polizas?.reduce((sum, p) => sum + parseFloat(p.comision_vendedor_uf || 0), 0) || 0;
    const utilidadUF = comisionTotalUF - comisionVendedorUF;
    const impuestoUF = comisionVendedorUF * 0.19;

    const comisionTotalCLP = comisionTotalUF * UF_VALUE;
    const comisionVendedorCLP = comisionVendedorUF * UF_VALUE;
    const utilidadCLP = utilidadUF * UF_VALUE;
    const impuestoCLP = impuestoUF * UF_VALUE;

    const vendedoresStats = vendedores?.map(v => {
      const polizasVendedor = polizas?.filter(p => p.vendedor_id === v.id) || [];
      const comisionTotal = polizasVendedor.reduce((sum, p) => sum + parseFloat(p.comision_vendedor_uf || 0), 0);
      return {
        nombre: v.nombre,
        polizas: polizasVendedor.length,
        comision: comisionTotal
      };
    }) || [];

    vendedoresStats.sort((a, b) => b.comision - a.comision);

    const monthName = startOfMonth.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

    return `
      <div class="view-header" style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h1>Dashboard General</h1>
          <p style="color: #6b7280; margin-top: 8px;">${monthName}</p>
        </div>
        <div style="display: flex; gap: 16px;">
          <div style="background: white; padding: 12px 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center;">
            <div style="font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">UF</div>
            <div style="font-size: 18px; font-weight: 700; color: #2563eb;">$${UF_VALUE.toLocaleString('es-CL', {maximumFractionDigits: 2})}</div>
          </div>
          <div style="background: white; padding: 12px 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center;">
            <div style="font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">USD</div>
            <div style="font-size: 18px; font-weight: 700; color: #10b981;">$${USD_VALUE.toLocaleString('es-CL', {maximumFractionDigits: 2})}</div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px;">
        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #2563eb;">
          <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Total Pólizas</div>
          <div style="font-size: 36px; font-weight: 700; color: #2563eb;">${totalPolizas}</div>
          <div style="color: #9ca3af; font-size: 13px; margin-top: 4px;">Este mes</div>
        </div>

        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #7c3aed;">
          <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Comisión Total</div>
          <div style="font-size: 28px; font-weight: 700; color: #7c3aed;">${comisionTotalUF.toFixed(2)} UF</div>
          <div style="color: #7c3aed; font-size: 16px; margin-top: 4px;">$${comisionTotalCLP.toLocaleString('es-CL', {maximumFractionDigits: 0})}</div>
        </div>

        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #10b981;">
          <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Utilidad LIVE</div>
          <div style="font-size: 28px; font-weight: 700; color: #10b981;">${utilidadUF.toFixed(2)} UF</div>
          <div style="color: #059669; font-size: 16px; margin-top: 4px;">$${utilidadCLP.toLocaleString('es-CL', {maximumFractionDigits: 0})}</div>
        </div>

        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-left: 4px solid #ef4444;">
          <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">Impuesto (19%)</div>
          <div style="font-size: 28px; font-weight: 700; color: #ef4444;">${impuestoUF.toFixed(2)} UF</div>
          <div style="color: #dc2626; font-size: 16px; margin-top: 4px;">$${impuestoCLP.toLocaleString('es-CL', {maximumFractionDigits: 0})}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px;">Top Ejecutivos por Comisión</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${vendedoresStats.slice(0, 5).map((v, index) => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: ${index === 0 ? '#fef3c7' : '#f9fafb'}; border-radius: 6px;">
                <div>
                  <div style="font-weight: 600; color: #1f2937;">${v.nombre}</div>
                  <div style="font-size: 13px; color: #6b7280;">${v.polizas} pólizas</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: 700; color: #2563eb; font-size: 18px;">${v.comision.toFixed(2)} UF</div>
                  <div style="font-size: 13px; color: #6b7280;">$${(v.comision * UF_VALUE).toLocaleString('es-CL', {maximumFractionDigits: 0})}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px;">Pólizas por Ejecutivo</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${vendedoresStats.map(v => {
              const maxPolizas = Math.max(...vendedoresStats.map(vs => vs.polizas), 1);
              const percentage = (v.polizas / maxPolizas) * 100;
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span style="font-size: 14px; color: #1f2937; font-weight: 500;">${v.nombre}</span>
                    <span style="font-size: 14px; color: #6b7280; font-weight: 600;">${v.polizas}</span>
                  </div>
                  <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #2563eb, #7c3aed); height: 100%; width: ${percentage}%; transition: width 0.3s ease;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <div style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 18px;">Resumen Ejecutivos</h3>
        <div style="overflow-x: auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Ejecutivo</th>
                <th>Pólizas</th>
                <th>Comisión (UF)</th>
                <th>Comisión (CLP)</th>
                <th>Promedio por Póliza</th>
              </tr>
            </thead>
            <tbody>
              ${vendedoresStats.map(v => `
                <tr>
                  <td style="font-weight: 500;">${v.nombre}</td>
                  <td style="text-align: center;">${v.polizas}</td>
                  <td style="text-align: right; font-weight: 600; color: #2563eb;">${v.comision.toFixed(2)}</td>
                  <td style="text-align: right;">$${(v.comision * UF_VALUE).toLocaleString('es-CL', {maximumFractionDigits: 0})}</td>
                  <td style="text-align: right;">${v.polizas > 0 ? (v.comision / v.polizas).toFixed(2) : '0.00'} UF</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr style="background: #f9fafb; font-weight: 700;">
                <td>TOTAL</td>
                <td style="text-align: center;">${totalPolizas}</td>
                <td style="text-align: right; color: #2563eb;">${comisionVendedorUF.toFixed(2)}</td>
                <td style="text-align: right;">$${comisionVendedorCLP.toLocaleString('es-CL', {maximumFractionDigits: 0})}</td>
                <td style="text-align: right;">${totalPolizas > 0 ? (comisionVendedorUF / totalPolizas).toFixed(2) : '0.00'} UF</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error:', error);
    return '<div class="error-message">Error al cargar el dashboard</div>';
  }
}

export function setupHomeHandlers() {
}
