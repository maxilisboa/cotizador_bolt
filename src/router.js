import { authService } from './services/auth.js';
import { renderLogin, setupLoginHandlers } from './pages/login.js';
import { renderDashboard, setupDashboardHandlers } from './pages/dashboard.js';

class Router {
  constructor() {
    this.routes = {
      '/login': { render: renderLogin, setup: setupLoginHandlers, requiresAuth: false },
      '/dashboard': { render: renderDashboard, setup: setupDashboardHandlers, requiresAuth: true }
    };

    this.currentPath = '/login';
  }

  async init() {
    window.addEventListener('popstate', () => this.handleRoute());

    authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        this.navigate('/dashboard');
      } else if (event === 'SIGNED_OUT') {
        this.navigate('/login');
      }
    });

    await this.handleRoute();
  }

  async handleRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['/login'];

    try {
      const user = await authService.getCurrentUser();

      if (route.requiresAuth && !user) {
        this.navigate('/login', false);
        return;
      }

      if (!route.requiresAuth && user && path === '/login') {
        this.navigate('/dashboard', false);
        return;
      }

      this.currentPath = path;
      await this.render(route);
    } catch (error) {
      if (route.requiresAuth) {
        this.navigate('/login', false);
      } else {
        await this.render(route);
      }
    }
  }

  async render(route) {
    const app = document.getElementById('app');

    if (typeof route.render === 'function') {
      const content = await route.render();
      app.innerHTML = content;

      if (route.setup) {
        route.setup(this.navigate.bind(this));
      }
    }
  }

  navigate(path, pushState = true) {
    if (pushState) {
      window.history.pushState({}, '', path);
    }
    this.handleRoute();
  }
}

export const router = new Router();
