import { supabase } from '../lib/supabase.js';

let usuarios = [];
let currentUser = null;

export async function renderUsuarios() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    currentUser = profile;

    if (profile?.rol !== 'admin') {
      return '<div class="error-message">No tienes permisos para acceder a esta sección</div>';
    }

    await loadUsuarios();

    return `
      <div class="view-header">
        <h1>Gestión de Usuarios</h1>
        <button class="btn-primary" id="new-usuario-btn">+ Nuevo Usuario</button>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Rol</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${usuarios.map(usuario => `
              <tr>
                <td>${usuario.nombre || '-'}</td>
                <td>${usuario.email}</td>
                <td>${usuario.cargo || '-'}</td>
                <td>
                  <span class="badge badge-${usuario.rol === 'admin' ? 'success' : 'info'}">
                    ${usuario.rol === 'admin' ? 'Administrador' : 'Vendedor'}
                  </span>
                </td>
                <td>${new Date(usuario.created_at).toLocaleDateString('es-CL')}</td>
                <td>
                  <button class="btn-icon" onclick="window.editUsuario('${usuario.id}')" title="Editar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  ${usuario.id !== currentUser.id ? `
                    <button class="btn-icon btn-danger" onclick="window.deleteUsuario('${usuario.id}')" title="Eliminar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  ` : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div id="usuario-modal" class="modal" style="display: none;">
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="modal-title">Nuevo Usuario</h2>
            <button class="modal-close" id="close-modal">&times;</button>
          </div>
          <form id="usuario-form">
            <input type="hidden" id="usuario-id" />
            <div class="form-row">
              <div class="form-group">
                <label for="nombre">Nombre *</label>
                <input type="text" id="nombre" required />
              </div>
              <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="cargo">Cargo</label>
                <input type="text" id="cargo" />
              </div>
              <div class="form-group">
                <label for="rol">Rol *</label>
                <select id="rol" required>
                  <option value="vendedor">Vendedor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
            <div class="form-group" id="password-group">
              <label for="password">Contraseña *</label>
              <input type="password" id="password" minlength="6" />
              <small>Mínimo 6 caracteres</small>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-secondary" id="cancel-btn">Cancelar</button>
              <button type="submit" class="btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error:', error);
    return '<div class="error-message">Error al cargar usuarios</div>';
  }
}

async function loadUsuarios() {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  usuarios = data || [];
}

export function setupUsuariosHandlers() {
  const newBtn = document.getElementById('new-usuario-btn');
  const modal = document.getElementById('usuario-modal');
  const closeBtn = document.getElementById('close-modal');
  const cancelBtn = document.getElementById('cancel-btn');
  const form = document.getElementById('usuario-form');

  function openModal(usuario = null) {
    const modalTitle = document.getElementById('modal-title');
    const passwordGroup = document.getElementById('password-group');
    const passwordInput = document.getElementById('password');

    if (usuario) {
      modalTitle.textContent = 'Editar Usuario';
      document.getElementById('usuario-id').value = usuario.id;
      document.getElementById('nombre').value = usuario.nombre || '';
      document.getElementById('email').value = usuario.email;
      document.getElementById('cargo').value = usuario.cargo || '';
      document.getElementById('rol').value = usuario.rol || 'vendedor';
      passwordGroup.style.display = 'none';
      passwordInput.required = false;
    } else {
      modalTitle.textContent = 'Nuevo Usuario';
      form.reset();
      document.getElementById('usuario-id').value = '';
      passwordGroup.style.display = 'block';
      passwordInput.required = true;
    }

    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
    form.reset();
  }

  newBtn?.addEventListener('click', () => openModal());
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  window.editUsuario = async (id) => {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) openModal(usuario);
  };

  window.deleteUsuario = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(id);

      const { error: deleteUsuarioError } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', id);

      if (deleteUsuarioError) throw deleteUsuarioError;

      alert('Usuario eliminado exitosamente');
      await loadUsuarios();
      document.getElementById('view-container').innerHTML = await renderUsuarios();
      setupUsuariosHandlers();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar usuario: ' + error.message);
    }
  };

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuarioId = document.getElementById('usuario-id').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const cargo = document.getElementById('cargo').value;
    const rol = document.getElementById('rol').value;
    const password = document.getElementById('password').value;

    try {
      if (usuarioId) {
        const { error } = await supabase
          .from('usuarios')
          .update({ nombre, email, cargo, rol })
          .eq('id', usuarioId);

        if (error) throw error;
        alert('Usuario actualizado exitosamente');
      } else {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) throw authError;

        const { error: profileError } = await supabase
          .from('usuarios')
          .insert({
            id: authData.user.id,
            email,
            nombre,
            cargo,
            rol
          });

        if (profileError) throw profileError;
        alert('Usuario creado exitosamente');
      }

      closeModal();
      await loadUsuarios();
      document.getElementById('view-container').innerHTML = await renderUsuarios();
      setupUsuariosHandlers();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar usuario: ' + error.message);
    }
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}
