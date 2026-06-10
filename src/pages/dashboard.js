import { authService } from '../services/auth.js';
import { polizasService } from '../services/polizas.js';
import { aseguradorasService } from '../services/aseguradoras.js';
import { vendedoresService } from '../services/vendedores.js';
import { vehiculosService } from '../services/vehiculos.js';
import { importarService } from '../services/importar.js';
import { renderHome, setupHomeHandlers } from './home.js';
import { renderUsuarios, setupUsuariosHandlers } from './usuarios.js';
import { renderReportes, setupReportesHandlers } from './reportes.js';
import { renderLiquidaciones } from './liquidaciones.js';

let currentUser = null;
let polizas = [];
let aseguradoras = [];
let vendedores = [];
let vehiculos = [];
let stats = { total: 0, count: 0 };
let currentView = 'home';

export async function renderDashboard() {
  try {
    currentUser = await authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No se pudo obtener el usuario actual');
    }
    const profile = await authService.getUserProfile(currentUser.id);
    polizas = await polizasService.getAll();
    aseguradoras = await aseguradorasService.getAll();
    vendedores = await vendedoresService.getAll();
    vehiculos = await vehiculosService.getAll();
    stats = await polizasService.getStats();

    return `
      <div class="app-layout">
        <aside class="sidebar">
          <div class="sidebar-header">
            <img src="/logo-blanco-sin-fondo.png" alt="Seguros LIVE" />
          </div>
          <nav class="sidebar-nav">
            <a href="#" class="nav-item ${currentView === 'home' ? 'active' : ''}" data-view="home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Dashboard
            </a>
            <a href="#" class="nav-item ${currentView === 'polizas' ? 'active' : ''}" data-view="polizas">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Pólizas
            </a>
            ${profile?.cargo === 'Admin' ? `
            <a href="#" class="nav-item ${currentView === 'companias' ? 'active' : ''}" data-view="companias">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Compañías
            </a>
            <a href="#" class="nav-item ${currentView === 'vendedores' ? 'active' : ''}" data-view="vendedores">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Ejecutivos
            </a>
            ` : ''}
            <a href="#" class="nav-item ${currentView === 'reportes' ? 'active' : ''}" data-view="reportes">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"></path>
                <path d="M18 17V9"></path>
                <path d="M13 17V5"></path>
                <path d="M8 17v-3"></path>
              </svg>
              Reportes
            </a>
            <a href="#" class="nav-item ${currentView === 'liquidaciones' ? 'active' : ''}" data-view="liquidaciones">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              Liquidaciones
            </a>
            ${profile?.rol === 'admin' ? `
              <a href="#" class="nav-item ${currentView === 'usuarios' ? 'active' : ''}" data-view="usuarios">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
                Usuarios
              </a>
            ` : ''}
          </nav>
          <div class="sidebar-footer">
            <div class="user-info">
              <span>${profile?.nombre || currentUser.email}</span>
            </div>
            <button class="btn-logout" id="logout-btn">Cerrar Sesión</button>
          </div>
        </aside>

        <main class="main-content">
          <div id="view-container"></div>
        </main>

        <div class="container" style="display: none;">
          <div class="dashboard-grid">
            <div class="card">
              <h2>Total de Pólizas</h2>
              <div class="stat-value">${stats.count}</div>
              <div class="stat-label">Pólizas registradas</div>
            </div>

            <div class="card">
              <h2>Monto Total</h2>
              <div class="stat-value">$${stats.total.toLocaleString('es-CL')}</div>
              <div class="stat-label">Suma de todas las pólizas</div>
            </div>

            <div class="card">
              <h2>Promedio</h2>
              <div class="stat-value">$${stats.count > 0 ? (stats.total / stats.count).toLocaleString('es-CL', { maximumFractionDigits: 0 }) : 0}</div>
              <div class="stat-label">Por póliza</div>
            </div>
          </div>

          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h2 style="margin: 0;">Configuración</h2>
              <div style="display: flex; gap: 10px;">
                <button class="btn-secondary" id="manage-aseguradoras-btn">Aseguradoras</button>
                <button class="btn-secondary" id="manage-vendedores-btn">Vendedores</button>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h3 style="margin-bottom: 10px;">Aseguradoras (${aseguradoras.length})</h3>
                ${aseguradoras.length === 0 ? '<p style="color: #888;">No hay aseguradoras configuradas</p>' : `
                  <div style="font-size: 14px;">
                    ${aseguradoras.slice(0, 3).map(a => `
                      <div style="padding: 8px; border-bottom: 1px solid #eee;">
                        ${a.nombre} - ${a.comision_porcentaje}%
                      </div>
                    `).join('')}
                  </div>
                `}
              </div>
              <div>
                <h3 style="margin-bottom: 10px;">Vendedores (${vendedores.length})</h3>
                ${vendedores.length === 0 ? '<p style="color: #888;">No hay vendedores configurados</p>' : `
                  <div style="font-size: 14px;">
                    ${vendedores.slice(0, 3).map(v => `
                      <div style="padding: 8px; border-bottom: 1px solid #eee;">
                        ${v.nombre} - ${v.tipo_comision === 'prima_bruta_mensual' ? 'Prima Bruta Mensual' : v.comision_porcentaje + '%'}
                      </div>
                    `).join('')}
                  </div>
                `}
              </div>
            </div>
          </div>

          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h2 style="margin: 0;">Pólizas Recientes</h2>
              <button class="btn-primary" id="new-poliza-btn">+ Nueva Póliza</button>
            </div>

            ${polizas.length === 0 ? `
              <p style="text-align: center; color: #888; padding: 40px;">
                No hay pólizas registradas. ¡Crea tu primera póliza!
              </p>
            ` : `
              <div style="overflow-x: auto;">
                <table class="table" style="min-width: 1200px;">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Ejecutivo</th>
                      <th>Categoría</th>
                      <th>Estado</th>
                      <th>Asegurado</th>
                      <th>N° Póliza</th>
                      <th>Compañía</th>
                      <th>Prima Bruta UF</th>
                      <th>Prima Neta UF</th>
                      <th>Com. Total UF</th>
                      <th>Com. Vendedor UF</th>
                      <th>Utilidad LIVE</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${polizas.map(poliza => `
                      <tr>
                        <td>${new Date(poliza.fecha).toLocaleDateString('es-CL')}</td>
                        <td>${poliza.ejecutivo_venta || '-'}</td>
                        <td>${poliza.categoria || '-'}</td>
                        <td><span style="padding: 4px 8px; border-radius: 4px; font-size: 12px; background: ${poliza.estado === 'Vigente' ? '#d4edda' : poliza.estado === 'Pendiente' ? '#fff3cd' : '#f8d7da'}; color: ${poliza.estado === 'Vigente' ? '#155724' : poliza.estado === 'Pendiente' ? '#856404' : '#721c24'};">${poliza.estado || '-'}</span></td>
                        <td>${poliza.nombre_asegurado}</td>
                        <td>${poliza.numero_poliza}</td>
                        <td>${poliza.aseguradora?.nombre || '-'}</td>
                        <td>${parseFloat(poliza.prima_bruta_anual_uf || 0).toFixed(2)}</td>
                        <td>${parseFloat(poliza.prima_neta_anual_uf || 0).toFixed(2)}</td>
                        <td>${parseFloat(poliza.comision_neta_uf || 0).toFixed(2)}</td>
                        <td style="font-weight: 600; color: #0ea5e9;">${parseFloat(poliza.comision_vendedor_uf || 0).toFixed(2)}</td>
                        <td style="font-weight: 600; color: #28a745;">${parseFloat(poliza.utilidad_live || 0).toFixed(2)}</td>
                        <td>
                          <button class="btn-secondary" onclick="window.editPoliza('${poliza.id}')">Editar</button>
                          <button class="btn-secondary" onclick="window.deletePoliza('${poliza.id}')" style="color: #c33;">Eliminar</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
        <div id="modal-container"></div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading dashboard:', error);
    return `
      <div class="container" style="padding: 40px; text-align: center;">
        <div style="background: #fee; border: 1px solid #fcc; border-radius: 8px; padding: 24px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c33; margin-bottom: 16px;">Error al cargar el dashboard</h2>
          <p style="color: #666; margin-bottom: 16px;">${error.message}</p>
          <p style="color: #999; font-size: 14px;">Por favor, verifica tu conexión y configuración.</p>
          <button onclick="location.reload()" class="btn-primary" style="margin-top: 16px;">Reintentar</button>
        </div>
      </div>
    `;
  }
}

export function setupDashboardHandlers(navigate) {
  const logoutBtn = document.getElementById('logout-btn');
  const navItems = document.querySelectorAll('.nav-item');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await authService.signOut();
      navigate('/login');
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const view = item.getAttribute('data-view');
      switchView(view);
    });
  });

  switchView(currentView);

  window.editPoliza = (id) => {
    const poliza = polizas.find(p => p.id === id);
    if (poliza) {
      showPolizaModal(poliza);
    }
  };
}

async function switchView(view) {
  const profile = await authService.getUserProfile(currentUser.id);

  if ((view === 'companias' || view === 'vendedores') && profile?.cargo !== 'Admin') {
    currentView = 'home';
    const container = document.getElementById('view-container');
    container.innerHTML = await renderHome();
    setupHomeHandlers();
    return;
  }

  currentView = view;

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-view') === view) {
      item.classList.add('active');
    }
  });

  const container = document.getElementById('view-container');

  switch(view) {
    case 'home':
      container.innerHTML = await renderHome();
      setupHomeHandlers();
      break;
    case 'polizas':
      container.innerHTML = renderPolizasView();
      setupPolizasHandlers();
      break;
    case 'companias':
      container.innerHTML = renderCompaniasView();
      setupCompaniasHandlers();
      break;
    case 'vendedores':
      container.innerHTML = renderVendedoresView();
      setupVendedoresHandlers();
      break;
    case 'reportes':
      container.innerHTML = await renderReportes();
      setupReportesHandlers();
      break;
    case 'liquidaciones':
      await renderLiquidaciones();
      break;
    case 'usuarios':
      container.innerHTML = await renderUsuarios();
      setupUsuariosHandlers();
      break;
  }
}

function renderPolizasView() {
  return `
    <div class="view-header">
      <h1>Gestión de Pólizas</h1>
      <div style="display: flex; gap: 10px;">
        <button class="btn-secondary" id="import-csv-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Importar CSV
        </button>
        <button class="btn-primary" id="new-poliza-btn">+ Nueva Póliza</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #e3f2fd;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1976d2" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Total Pólizas</div>
          <div class="stat-value">${stats.count}</div>
        </div>
      </div>
    </div>

    ${polizas.length === 0 ? `
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <h3>No hay pólizas registradas</h3>
        <p>Comienza creando tu primera póliza</p>
        <button class="btn-primary" onclick="document.getElementById('new-poliza-btn').click()">+ Nueva Póliza</button>
      </div>
    ` : `
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Ejecutivo</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Asegurado</th>
              <th>N° Póliza</th>
              <th>Compañía</th>
              <th>Prima Bruta UF</th>
              <th>Prima Neta UF</th>
              <th>Com. Total UF</th>
              <th>Com. Vendedor UF</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${polizas.map(poliza => `
              <tr>
                <td>${new Date(poliza.fecha).toLocaleDateString('es-CL')}</td>
                <td>${poliza.ejecutivo_venta || '-'}</td>
                <td>${poliza.categoria || '-'}</td>
                <td><span class="badge badge-${poliza.estado === 'Vigente' ? 'success' : poliza.estado === 'Pendiente' ? 'warning' : 'danger'}">${poliza.estado || '-'}</span></td>
                <td>${poliza.nombre_asegurado}</td>
                <td>${poliza.numero_poliza}</td>
                <td>${poliza.aseguradora?.nombre || '-'}</td>
                <td>${parseFloat(poliza.prima_bruta_anual_uf || 0).toFixed(2)}</td>
                <td>${parseFloat(poliza.prima_neta_anual_uf || 0).toFixed(2)}</td>
                <td>${parseFloat(poliza.comision_neta_uf || 0).toFixed(2)}</td>
                <td style="font-weight: 600; color: #0ea5e9;">${parseFloat(poliza.comision_vendedor_uf || 0).toFixed(2)}</td>
                <td>
                  <button class="btn-icon" onclick="window.editPoliza('${poliza.id}')" title="Editar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon btn-danger" onclick="window.deletePoliza('${poliza.id}')" title="Eliminar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `}
  `;
}

function renderCompaniasView() {
  return `
    <div class="view-header">
      <h1>Gestión de Compañías</h1>
      <button class="btn-primary" id="new-aseguradora-btn">+ Nueva Compañía</button>
    </div>

    ${aseguradoras.length === 0 ? `
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
        <h3>No hay compañías registradas</h3>
        <p>Agrega tu primera compañía aseguradora</p>
      </div>
    ` : `
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>% Comisión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${aseguradoras.map(a => `
              <tr>
                <td><strong>${a.nombre}</strong></td>
                <td>${a.comision_porcentaje}%</td>
                <td>
                  <button class="btn-icon" onclick="window.editAseguradora('${a.id}')" title="Editar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon btn-danger" onclick="window.deleteAseguradora('${a.id}')" title="Eliminar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `}
  `;
}

function renderVendedoresView() {
  return `
    <div class="view-header">
      <h1>Gestión de Ejecutivos</h1>
      <button class="btn-primary" id="new-vendedor-btn">+ Nuevo Ejecutivo</button>
    </div>

    ${vendedores.length === 0 ? `
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
        <h3>No hay ejecutivos registrados</h3>
        <p>Agrega tu primer ejecutivo</p>
      </div>
    ` : `
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Comisión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${vendedores.map(v => `
              <tr>
                <td><strong>${v.nombre}</strong></td>
                <td>${v.tipo_comision === 'prima_bruta_mensual' ? 'Prima Bruta Mensual' : 'Porcentaje'}</td>
                <td>${v.tipo_comision === 'prima_bruta_mensual' ? 'Prima Bruta Mensual' : v.comision_porcentaje + '%'}</td>
                <td>
                  <button class="btn-icon" onclick="window.editVendedor('${v.id}')" title="Editar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-icon btn-danger" onclick="window.deleteVendedor('${v.id}')" title="Inactivar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      <line x1="9" y1="10" x2="15" y2="10"></line>
                    </svg>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `}
  `;
}

function setupPolizasHandlers() {
  const newPolizaBtn = document.getElementById('new-poliza-btn');
  const importCsvBtn = document.getElementById('import-csv-btn');

  if (newPolizaBtn) {
    newPolizaBtn.addEventListener('click', () => {
      showPolizaModal();
    });
  }

  if (importCsvBtn) {
    importCsvBtn.addEventListener('click', () => {
      showImportModal();
    });
  }

  window.editPoliza = (id) => {
    const poliza = polizas.find(p => p.id === id);
    if (poliza) {
      showPolizaModal(poliza);
    }
  };

  window.deletePoliza = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta póliza?')) {
      try {
        await polizasService.delete(id);
        window.location.reload();
      } catch (error) {
        alert('Error al eliminar la póliza: ' + error.message);
      }
    }
  };
}

function setupCompaniasHandlers() {
  const newBtn = document.getElementById('new-aseguradora-btn');

  if (newBtn) {
    newBtn.addEventListener('click', () => {
      showAseguradoraModal();
    });
  }

  window.editAseguradora = (id) => {
    const aseg = aseguradoras.find(a => a.id === id);
    if (!aseg) return;
    showAseguradoraModal(aseg);
  };

  window.deleteAseguradora = async (id) => {
    if (confirm('¿Eliminar esta compañía?')) {
      try {
        await aseguradorasService.delete(id);
        window.location.reload();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };
}

function setupVendedoresHandlers() {
  const newBtn = document.getElementById('new-vendedor-btn');

  if (newBtn) {
    newBtn.addEventListener('click', () => {
      showVendedorModal();
    });
  }

  window.editVendedor = (id) => {
    const vend = vendedores.find(v => v.id === id);
    if (!vend) return;
    showVendedorModal(vend);
  };

  window.deleteVendedor = async (id) => {
    if (confirm('¿Inactivar este ejecutivo?')) {
      try {
        await vendedoresService.delete(id);
        window.location.reload();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };
}

function showPolizaModal(poliza = null) {
  const isEdit = !!poliza;
  const modalContainer = document.getElementById('modal-container');

  if (!isEdit && aseguradoras.length === 0) {
    alert('Debe registrar al menos una compañía aseguradora antes de crear una póliza.\n\nVaya a la sección "Compañías" para agregar una.');
    return;
  }

  modalContainer.innerHTML = `
    <div class="modal">
      <div class="modal-content" style="max-width: 900px;">
        <h2>${isEdit ? 'Editar Póliza' : 'Nueva Póliza'}</h2>
        <form id="poliza-form" class="excel-form">
          <div class="form-section">
            <h3>Datos de la Póliza</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" value="${poliza?.fecha ? new Date(poliza.fecha).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}" required />
              </div>
              <div class="form-group">
                <label for="ejecutivo_venta">Ejecutivo de Venta *</label>
                <select id="ejecutivo_venta" required>
                  <option value="">Seleccionar ejecutivo</option>
                  ${vendedores.length === 0 ? '<option value="" disabled>No hay ejecutivos registrados</option>' : ''}
                  ${vendedores.map(v => `
                    <option value="${v.nombre}" ${poliza?.ejecutivo_venta === v.nombre ? 'selected' : ''}>
                      ${v.nombre}
                    </option>
                  `).join('')}
                </select>
                ${vendedores.length === 0 ? '<small style="color: #dc2626;">Primero debe agregar ejecutivos en la sección Ejecutivos</small>' : ''}
              </div>
              <div class="form-group">
                <label for="categoria">Categoría *</label>
                <select id="categoria" required>
                  <option value="">Seleccionar categoría</option>
                  <option value="Automotriz" ${poliza?.categoria === 'Automotriz' ? 'selected' : ''}>Automotriz</option>
                  <option value="Salud" ${poliza?.categoria === 'Salud' ? 'selected' : ''}>Salud</option>
                  <option value="Vida" ${poliza?.categoria === 'Vida' ? 'selected' : ''}>Vida</option>
                  <option value="Hogar" ${poliza?.categoria === 'Hogar' ? 'selected' : ''}>Hogar</option>
                </select>
              </div>
              <div class="form-group">
                <label for="estado">Estado *</label>
                <select id="estado" required>
                  <option value="">Seleccionar estado</option>
                  <option value="Vigente" ${poliza?.estado === 'Vigente' ? 'selected' : ''}>Vigente</option>
                  <option value="Pendiente" ${poliza?.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                  <option value="Anulada" ${poliza?.estado === 'Anulada' ? 'selected' : ''}>Anulada</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Datos del Asegurado</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="nombre_asegurado">Nombre Completo *</label>
                <input type="text" id="nombre_asegurado" value="${poliza?.nombre_asegurado || ''}" required />
              </div>
              <div class="form-group">
                <label for="rut_asegurado">RUT</label>
                <input type="text" id="rut_asegurado" value="${poliza?.rut_asegurado || ''}" placeholder="12.345.678-9" />
              </div>
              <div class="form-group">
                <label for="email_asegurado">Email</label>
                <input type="email" id="email_asegurado" value="${poliza?.email_asegurado || ''}" placeholder="correo@ejemplo.com" />
              </div>
              <div class="form-group">
                <label for="telefono_asegurado">Teléfono</label>
                <input type="tel" id="telefono_asegurado" value="${poliza?.telefono_asegurado || ''}" placeholder="+56 9 1234 5678" />
              </div>
              <div class="form-group">
                <label for="direccion_asegurado">Dirección</label>
                <input type="text" id="direccion_asegurado" value="${poliza?.direccion_asegurado || ''}" />
              </div>
              <div class="form-group">
                <label for="comuna_asegurado">Comuna</label>
                <input type="text" id="comuna_asegurado" value="${poliza?.comuna_asegurado || ''}" placeholder="Santiago, Providencia, etc." />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Datos del Vehículo</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="patente">Patente</label>
                <input type="text" id="patente" value="${poliza?.patente || ''}" placeholder="ABCD12" />
              </div>
              <div class="form-group">
                <label for="marca">Marca</label>
                <input type="text" id="marca" value="${poliza?.marca || ''}" placeholder="Toyota, Chevrolet, etc." />
              </div>
              <div class="form-group">
                <label for="modelo">Modelo</label>
                <input type="text" id="modelo" value="${poliza?.modelo || ''}" placeholder="Corolla, Cruze, etc." />
              </div>
              <div class="form-group">
                <label for="ano">Año</label>
                <input type="number" id="ano" value="${poliza?.ano || ''}" placeholder="2024" min="1900" max="2100" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Datos de la Póliza y Compañía</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="numero_poliza">N° Póliza *</label>
                <input type="text" id="numero_poliza" value="${poliza?.numero_poliza || ''}" required />
              </div>
              <div class="form-group">
                <label for="aseguradora_id">Compañía *</label>
                <select id="aseguradora_id" required>
                  <option value="">Seleccionar compañía</option>
                  ${aseguradoras.length === 0 ? '<option value="" disabled>No hay compañías registradas</option>' : ''}
                  ${aseguradoras.map(a => `
                    <option value="${a.id}" data-comision="${a.comision_porcentaje}" ${poliza?.aseguradora_id === a.id ? 'selected' : ''}>
                      ${a.nombre} (${a.comision_porcentaje}%)
                    </option>
                  `).join('')}
                </select>
                ${aseguradoras.length === 0 ? '<small style="color: #dc2626;">Primero debe agregar compañías en la sección Compañías</small>' : ''}
              </div>
              <div class="form-group">
                <label for="deducible">Deducible</label>
                <input type="number" id="deducible" step="1" value="${poliza?.deducible || 0}" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Valores Primas (ingrese Bruta o Neta, se calcula automático)</h3>
            <div class="form-grid-3">
              <div class="form-group">
                <label for="prima_bruta_anual_uf">Prima Bruta Anual UF</label>
                <input type="number" id="prima_bruta_anual_uf" step="0.01" value="${poliza?.prima_bruta_anual_uf || ''}" />
              </div>
              <div class="form-group">
                <label for="prima_neta_anual_uf">Prima Neta Anual UF</label>
                <input type="number" id="prima_neta_anual_uf" step="0.01" value="${poliza?.prima_neta_anual_uf || ''}" />
              </div>
              <div class="form-group">
                <label for="prima_bruta_mensual_uf">Prima Bruta Mensual UF</label>
                <input type="number" id="prima_bruta_mensual_uf" step="0.01" value="${poliza?.prima_bruta_mensual_uf || ''}" readonly class="readonly-field" />
              </div>
              <div class="form-group">
                <label for="prima_neta_mensual_uf">Prima Neta Mensual UF</label>
                <input type="number" id="prima_neta_mensual_uf" step="0.01" value="${poliza?.prima_neta_mensual_uf || ''}" readonly class="readonly-field" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Comisiones (calculadas automáticamente)</h3>
            <div class="form-grid-3">
              <div class="form-group">
                <label for="porcentaje_aseguradora">% Comisión Aseguradora</label>
                <input type="number" id="porcentaje_aseguradora" step="0.01" value="" readonly class="readonly-field" />
              </div>
              <div class="form-group">
                <label for="comision_neta_uf">Comisión Total UF</label>
                <input type="number" id="comision_neta_uf" step="0.01" value="${poliza?.comision_neta_uf || ''}" readonly class="readonly-field" />
              </div>
              <div class="form-group">
                <label for="porcentaje_vendedor">% Comisión Vendedor</label>
                <input type="number" id="porcentaje_vendedor" step="0.01" value="" readonly class="readonly-field" />
              </div>
              <div class="form-group">
                <label for="comision_vendedor_uf">Comisión Vendedor UF</label>
                <input type="number" id="comision_vendedor_uf" step="0.01" value="${poliza?.comision_vendedor_uf || ''}" readonly class="readonly-field" />
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Observaciones</h3>
            <div class="form-group">
              <label for="observaciones">Notas adicionales</label>
              <textarea id="observaciones" rows="3" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit;">${poliza?.observaciones || ''}</textarea>
            </div>
          </div>

          <div class="btn-group">
            <button type="button" class="btn-secondary" id="cancel-modal-btn">Cancelar</button>
            <button type="submit" class="btn-primary">${isEdit ? 'Actualizar' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById('poliza-form');
  const cancelBtn = document.getElementById('cancel-modal-btn');

  const primaBrutaAnualUF = document.getElementById('prima_bruta_anual_uf');
  const primaNetaAnualUF = document.getElementById('prima_neta_anual_uf');
  const primaBrutaMensualUF = document.getElementById('prima_bruta_mensual_uf');
  const primaNetaMensualUF = document.getElementById('prima_neta_mensual_uf');
  const aseguradoraSelect = document.getElementById('aseguradora_id');
  const ejecutivoSelect = document.getElementById('ejecutivo_venta');
  const porcentajeAseguradora = document.getElementById('porcentaje_aseguradora');
  const comisionNetaUF = document.getElementById('comision_neta_uf');
  const porcentajeVendedor = document.getElementById('porcentaje_vendedor');
  const comisionVendedorUF = document.getElementById('comision_vendedor_uf');

  function calculateFromBruta() {
    const brutaAnual = parseFloat(primaBrutaAnualUF.value) || 0;
    if (brutaAnual > 0) {
      primaNetaAnualUF.value = (brutaAnual / 1.19).toFixed(2);
    } else {
      primaNetaAnualUF.value = '';
    }
    updateMensual();
    calculateComisionTotal();
  }

  function calculateFromNeta() {
    const netaAnual = parseFloat(primaNetaAnualUF.value) || 0;
    if (netaAnual > 0) {
      primaBrutaAnualUF.value = (netaAnual * 1.19).toFixed(2);
    } else {
      primaBrutaAnualUF.value = '';
    }
    updateMensual();
    calculateComisionTotal();
  }

  function updateMensual() {
    const finalBruta = parseFloat(primaBrutaAnualUF.value) || 0;
    const finalNeta = parseFloat(primaNetaAnualUF.value) || 0;

    primaBrutaMensualUF.value = finalBruta > 0 ? (finalBruta / 12).toFixed(2) : '';
    primaNetaMensualUF.value = finalNeta > 0 ? (finalNeta / 12).toFixed(2) : '';
  }

  function updatePorcentajeAseguradora() {
    const aseguradoraId = aseguradoraSelect.value;
    const aseguradora = aseguradoras.find(a => a.id === aseguradoraId);

    if (aseguradora) {
      porcentajeAseguradora.value = parseFloat(aseguradora.comision_porcentaje || 0).toFixed(2);
    } else {
      porcentajeAseguradora.value = '';
    }
    calculateComisionTotal();
  }

  function calculateComisionTotal() {
    const primaNeta = parseFloat(primaNetaAnualUF.value) || 0;
    const porcentaje = parseFloat(porcentajeAseguradora.value) || 0;

    if (primaNeta > 0 && porcentaje > 0) {
      comisionNetaUF.value = (primaNeta * porcentaje / 100).toFixed(2);
    } else {
      comisionNetaUF.value = '';
    }
    calculateComisionVendedor();
  }

  function updatePorcentajeVendedor() {
    const nombreVendedor = ejecutivoSelect.value;
    const vendedor = vendedores.find(v => v.nombre === nombreVendedor);

    if (vendedor) {
      if (vendedor.tipo_comision === 'prima_bruta_mensual') {
        porcentajeVendedor.value = 'Prima Bruta Mensual';
        porcentajeVendedor.readOnly = true;
      } else {
        porcentajeVendedor.value = parseFloat(vendedor.comision_porcentaje || 0).toFixed(2);
        porcentajeVendedor.readOnly = false;
      }
    } else {
      porcentajeVendedor.value = '';
      porcentajeVendedor.readOnly = false;
    }
    calculateComisionVendedor();
  }

  function calculateComisionVendedor() {
    const nombreVendedor = ejecutivoSelect.value;
    const vendedor = vendedores.find(v => v.nombre === nombreVendedor);

    if (!vendedor) {
      comisionVendedorUF.value = '';
      return;
    }

    if (vendedor.tipo_comision === 'prima_bruta_mensual') {
      const primaBrutaMensual = parseFloat(primaBrutaMensualUF.value) || 0;
      comisionVendedorUF.value = primaBrutaMensual > 0 ? primaBrutaMensual.toFixed(2) : '';
    } else {
      const comisionNeta = parseFloat(comisionNetaUF.value) || 0;
      const porcentaje = parseFloat(porcentajeVendedor.value) || 0;

      if (comisionNeta > 0 && porcentaje > 0) {
        comisionVendedorUF.value = (comisionNeta * porcentaje / 100).toFixed(2);
      } else {
        comisionVendedorUF.value = '';
      }
    }
  }

  primaBrutaAnualUF.addEventListener('input', calculateFromBruta);
  primaNetaAnualUF.addEventListener('input', calculateFromNeta);
  aseguradoraSelect.addEventListener('change', updatePorcentajeAseguradora);
  ejecutivoSelect.addEventListener('change', updatePorcentajeVendedor);

  updateMensual();
  updatePorcentajeAseguradora();
  updatePorcentajeVendedor();

  cancelBtn.addEventListener('click', () => {
    modalContainer.innerHTML = '';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const aseguradoraId = document.getElementById('aseguradora_id').value;
    const primaBruta = parseFloat(primaBrutaAnualUF.value) || 0;
    const primaNeta = parseFloat(primaNetaAnualUF.value) || 0;

    if (!aseguradoraId) {
      alert('Debe seleccionar una compañía aseguradora.');
      document.getElementById('aseguradora_id').focus();
      return;
    }

    if (primaBruta === 0 && primaNeta === 0) {
      alert('Debe ingresar al menos la Prima Bruta o Prima Neta.');
      primaBrutaAnualUF.focus();
      return;
    }

    const ejecutivoVenta = document.getElementById('ejecutivo_venta').value;
    const vendedor = vendedores.find(v => v.nombre === ejecutivoVenta);

    const formData = {
      fecha: document.getElementById('fecha').value,
      ejecutivo_venta: ejecutivoVenta,
      vendedor_id: vendedor?.id || null,
      categoria: document.getElementById('categoria').value,
      estado: document.getElementById('estado').value,
      numero_poliza: document.getElementById('numero_poliza').value,
      nombre_asegurado: document.getElementById('nombre_asegurado').value,
      rut_asegurado: document.getElementById('rut_asegurado').value,
      email_asegurado: document.getElementById('email_asegurado').value,
      telefono_asegurado: document.getElementById('telefono_asegurado').value,
      direccion_asegurado: document.getElementById('direccion_asegurado').value,
      comuna_asegurado: document.getElementById('comuna_asegurado').value,
      patente: document.getElementById('patente').value,
      marca: document.getElementById('marca').value,
      modelo: document.getElementById('modelo').value,
      ano: document.getElementById('ano').value ? parseInt(document.getElementById('ano').value) : null,
      aseguradora_id: aseguradoraId,
      deducible: parseFloat(document.getElementById('deducible').value) || 0,
      prima_bruta_anual_uf: parseFloat(primaBrutaAnualUF.value) || 0,
      prima_neta_anual_uf: parseFloat(primaNetaAnualUF.value) || 0,
      prima_bruta_mensual_uf: parseFloat(primaBrutaMensualUF.value) || 0,
      prima_neta_mensual_uf: parseFloat(primaNetaMensualUF.value) || 0,
      comision_neta_uf: parseFloat(comisionNetaUF.value) || 0,
      comision_vendedor_uf: parseFloat(comisionVendedorUF.value) || 0,
      observaciones: document.getElementById('observaciones').value,
      monto: parseFloat(primaNetaAnualUF.value) || 0
    };

    try {
      if (isEdit) {
        await polizasService.update(poliza.id, formData);
      } else {
        await polizasService.create(formData);
      }

      modalContainer.innerHTML = '';
      window.location.reload();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}

function showImportModal() {
  const modalContainer = document.getElementById('modal-container');

  modalContainer.innerHTML = `
    <div class="modal">
      <div class="modal-content" style="max-width: 600px;">
        <h2>Importar Vehículos desde CSV</h2>

        <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 8px 0; color: #0369a1; font-size: 14px;">Formato del archivo</h3>
          <p style="margin: 0 0 12px 0; color: #0c4a6e; font-size: 13px;">
            El archivo debe ser CSV con valores separados por comas (,)
          </p>
          <div style="background: white; border: 1px solid #bae6fd; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 12px;">
            <div style="color: #64748b; margin-bottom: 4px;">Ejemplo:</div>
            <div style="color: #0f172a;">ASTON MARTIN,DB11,2018</div>
            <div style="color: #0f172a;">BMW,430I,2019</div>
            <div style="color: #0f172a;">AUDI,A5,2023</div>
          </div>
          <p style="margin: 12px 0 0 0; color: #0c4a6e; font-size: 12px;">
            <strong>Columnas:</strong> MARCA, MODELO, AÑO
          </p>
        </div>

        <div style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 32px; text-align: center; background: #f8fafc; margin-bottom: 20px;">
          <input type="file" id="csv-file-input" accept=".csv,.txt" style="display: none;" />
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" style="margin: 0 auto 12px;">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <div style="margin-bottom: 8px; color: #475569; font-weight: 500;">
            Selecciona un archivo CSV
          </div>
          <button type="button" class="btn-primary" id="select-file-btn">Elegir archivo</button>
          <div id="file-name-display" style="margin-top: 12px; color: #64748b; font-size: 14px;"></div>
        </div>

        <div id="import-progress" style="display: none; margin-bottom: 20px;">
          <div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
            <div style="font-size: 14px; color: #334155; margin-bottom: 8px;">Procesando...</div>
            <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
              <div id="progress-bar" style="background: #3b82f6; height: 100%; width: 0%; transition: width 0.3s;"></div>
            </div>
            <div id="progress-text" style="font-size: 12px; color: #64748b; margin-top: 8px;"></div>
          </div>
        </div>

        <div id="import-result" style="display: none; margin-bottom: 20px;"></div>

        <div class="btn-group">
          <button type="button" class="btn-secondary" id="cancel-import-btn">Cancelar</button>
          <button type="button" class="btn-primary" id="process-import-btn" disabled>Importar</button>
        </div>
      </div>
    </div>
  `;

  const fileInput = document.getElementById('csv-file-input');
  const selectFileBtn = document.getElementById('select-file-btn');
  const fileNameDisplay = document.getElementById('file-name-display');
  const processBtn = document.getElementById('process-import-btn');
  const cancelBtn = document.getElementById('cancel-import-btn');
  const progressDiv = document.getElementById('import-progress');
  const resultDiv = document.getElementById('import-result');

  let selectedFile = null;

  selectFileBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      selectedFile = file;
      fileNameDisplay.innerHTML = `
        <div style="display: inline-flex; align-items: center; gap: 8px; background: #f0f9ff; padding: 8px 12px; border-radius: 6px; border: 1px solid #0ea5e9;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <span style="color: #0c4a6e; font-weight: 500;">${file.name}</span>
          <span style="color: #64748b; font-size: 12px;">(${(file.size / 1024).toFixed(1)} KB)</span>
        </div>
      `;
      processBtn.disabled = false;
    }
  });

  processBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    try {
      processBtn.disabled = true;
      selectFileBtn.disabled = true;
      progressDiv.style.display = 'block';
      resultDiv.style.display = 'none';

      const progressBar = document.getElementById('progress-bar');
      const progressText = document.getElementById('progress-text');

      progressBar.style.width = '30%';
      progressText.textContent = 'Leyendo archivo...';

      const fileContent = await selectedFile.text();

      progressBar.style.width = '60%';
      progressText.textContent = 'Procesando registros...';

      const results = await importarService.processCSV(fileContent);

      progressBar.style.width = '100%';
      progressText.textContent = 'Completado';

      setTimeout(() => {
        progressDiv.style.display = 'none';
        resultDiv.style.display = 'block';

        const hasErrors = results.errors.length > 0;
        const successRate = ((results.success / results.total) * 100).toFixed(0);

        resultDiv.innerHTML = `
          <div style="background: ${results.success > 0 ? '#f0fdf4' : '#fef2f2'}; border: 1px solid ${results.success > 0 ? '#22c55e' : '#ef4444'}; border-radius: 8px; padding: 16px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${results.success > 0 ? '#22c55e' : '#ef4444'}" stroke-width="2">
                ${results.success > 0 ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
              </svg>
              <div>
                <div style="font-weight: 600; color: ${results.success > 0 ? '#166534' : '#991b1b'}; font-size: 16px;">
                  ${results.success > 0 ? 'Importación completada' : 'Error en la importación'}
                </div>
                <div style="color: ${results.success > 0 ? '#15803d' : '#b91c1c'}; font-size: 14px; margin-top: 4px;">
                  ${results.success} de ${results.total} registros importados (${successRate}%)
                </div>
              </div>
            </div>

            ${hasErrors ? `
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid ${results.success > 0 ? '#bbf7d0' : '#fecaca'};">
                <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">Errores encontrados (${results.errors.length}):</div>
                <div style="max-height: 200px; overflow-y: auto; background: white; border: 1px solid #fecaca; border-radius: 4px; padding: 8px;">
                  ${results.errors.slice(0, 10).map(err => `
                    <div style="padding: 8px; border-bottom: 1px solid #fee2e2; font-size: 12px;">
                      <div style="color: #991b1b; font-weight: 500;">Línea ${err.line}: ${err.error}</div>
                      <div style="color: #64748b; font-family: monospace; margin-top: 4px;">${err.content}</div>
                    </div>
                  `).join('')}
                  ${results.errors.length > 10 ? `<div style="padding: 8px; color: #64748b; font-size: 12px;">... y ${results.errors.length - 10} errores más</div>` : ''}
                </div>
              </div>
            ` : ''}
          </div>
        `;

        if (results.success > 0) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }, 500);

    } catch (error) {
      progressDiv.style.display = 'none';
      resultDiv.style.display = 'block';
      resultDiv.innerHTML = `
        <div style="background: #fef2f2; border: 1px solid #ef4444; border-radius: 8px; padding: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
              <div style="font-weight: 600; color: #991b1b;">Error al procesar el archivo</div>
              <div style="color: #b91c1c; font-size: 14px; margin-top: 4px;">${error.message}</div>
            </div>
          </div>
        </div>
      `;
      processBtn.disabled = false;
      selectFileBtn.disabled = false;
    }
  });

  cancelBtn.addEventListener('click', () => {
    modalContainer.innerHTML = '';
  });
}

function showAseguradoraModal(aseguradora = null) {
  const isEdit = !!aseguradora;
  const modalContainer = document.getElementById('modal-container');

  modalContainer.innerHTML = `
    <div class="modal">
      <div class="modal-content">
        <h2>${isEdit ? 'Editar Compañía' : 'Nueva Compañía'}</h2>
        <form id="edit-aseguradora-form">
          <div class="form-group">
            <label for="edit_aseg_nombre">Nombre</label>
            <input type="text" id="edit_aseg_nombre" value="${aseguradora?.nombre || ''}" required />
          </div>
          <div class="form-group">
            <label for="edit_aseg_comision">% Comisión</label>
            <input type="number" id="edit_aseg_comision" step="0.01" min="0" max="100" value="${aseguradora?.comision_porcentaje || ''}" required />
          </div>
          <div class="btn-group">
            <button type="button" class="btn-secondary" id="cancel-edit-aseg-btn">Cancelar</button>
            <button type="submit" class="btn-primary">${isEdit ? 'Actualizar' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById('edit-aseguradora-form');
  const cancelBtn = document.getElementById('cancel-edit-aseg-btn');

  cancelBtn.addEventListener('click', () => {
    modalContainer.innerHTML = '';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('edit_aseg_nombre').value.trim();
    const comision = parseFloat(document.getElementById('edit_aseg_comision').value);

    if (!nombre) {
      alert('El nombre es requerido');
      return;
    }

    try {
      if (isEdit) {
        await aseguradorasService.update(aseguradora.id, {
          nombre,
          comision_porcentaje: comision
        });
      } else {
        await aseguradorasService.create({
          nombre,
          comision_porcentaje: comision
        });
      }
      window.location.reload();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}

function showVendedorModal(vendedor = null) {
  const isEdit = !!vendedor;
  const modalContainer = document.getElementById('modal-container');

  modalContainer.innerHTML = `
    <div class="modal">
      <div class="modal-content">
        <h2>${isEdit ? 'Editar Ejecutivo' : 'Nuevo Ejecutivo'}</h2>
        <form id="edit-vendedor-form">
          <div class="form-group">
            <label for="edit_vend_nombre">Nombre</label>
            <input type="text" id="edit_vend_nombre" value="${vendedor?.nombre || ''}" required />
          </div>
          <div class="form-group">
            <label for="edit_vend_tipo_comision">Tipo de Comisión</label>
            <select id="edit_vend_tipo_comision" required>
              <option value="porcentaje" ${vendedor?.tipo_comision === 'porcentaje' ? 'selected' : ''}>Porcentaje (%)</option>
              <option value="prima_bruta_mensual" ${vendedor?.tipo_comision === 'prima_bruta_mensual' ? 'selected' : ''}>Prima Bruta Mensual</option>
            </select>
          </div>
          <div class="form-group" id="edit_vend_comision_group" style="display: ${vendedor?.tipo_comision === 'prima_bruta_mensual' ? 'none' : 'block'};">
            <label for="edit_vend_comision">% Comisión</label>
            <input type="number" id="edit_vend_comision" step="0.01" min="0" max="100" value="${vendedor?.comision_porcentaje || ''}" required />
          </div>
          <div class="btn-group">
            <button type="button" class="btn-secondary" id="cancel-edit-vend-btn">Cancelar</button>
            <button type="submit" class="btn-primary">${isEdit ? 'Actualizar' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById('edit-vendedor-form');
  const cancelBtn = document.getElementById('cancel-edit-vend-btn');
  const tipoSelect = document.getElementById('edit_vend_tipo_comision');
  const comisionGroup = document.getElementById('edit_vend_comision_group');
  const comisionInput = comisionGroup.querySelector('input');

  tipoSelect.addEventListener('change', (e) => {
    if (e.target.value === 'prima_bruta_mensual') {
      comisionGroup.style.display = 'none';
      comisionInput.required = false;
    } else {
      comisionGroup.style.display = 'block';
      comisionInput.required = true;
    }
  });

  cancelBtn.addEventListener('click', () => {
    modalContainer.innerHTML = '';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('edit_vend_nombre').value.trim();
    const tipoComision = document.getElementById('edit_vend_tipo_comision').value;
    const comision = tipoComision === 'porcentaje' ? parseFloat(document.getElementById('edit_vend_comision').value) : 0;

    if (!nombre) {
      alert('El nombre es requerido');
      return;
    }

    try {
      const vendedorData = {
        nombre,
        tipo_comision: tipoComision,
        comision_porcentaje: comision
      };

      if (isEdit) {
        await vendedoresService.update(vendedor.id, vendedorData);
      } else {
        await vendedoresService.create(vendedorData);
      }
      window.location.reload();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
}

