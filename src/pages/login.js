import { authService } from '../services/auth.js';

export function renderLogin() {
  return `
    <div class="auth-container">
      <div class="auth-card">
        <h1>Sistema de Cotización de Seguros</h1>
        <div id="auth-message"></div>
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" class="btn" id="login-btn">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  `;
}


export function setupLoginHandlers(navigate) {
  const loginForm = document.getElementById('login-form');
  const messageDiv = document.getElementById('auth-message');

  function showMessage(message, isError = false) {
    messageDiv.innerHTML = `<div class="${isError ? 'error-message' : 'success-message'}">${message}</div>`;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('login-btn');
      btn.disabled = true;
      btn.textContent = 'Iniciando...';

      try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        await authService.signIn(email, password);
        navigate('/dashboard');
      } catch (error) {
        showMessage(error.message || 'Error al iniciar sesión', true);
        btn.disabled = false;
        btn.textContent = 'Iniciar Sesión';
      }
    });
  }
}
