import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const localHost = 'http://localhost:8080/';

class AuthService {
  async login(email, senha) {
    try {
      const response = await axios.post(`${localHost}clientes/login`, { email, senha });
      const { token, user } = response.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      window.location.href = "/estoque";
    } catch (error) {
      this.handleLoginError(error);
    }
  }

  handleLoginError(error) {
    console.error("Erro ao fazer login:", error);
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Credenciais inválidas. Por favor, tente novamente.");
      } else {
        console.error("Detalhes do erro:", error.response.data);
      }
    }
  }

  getCurrentUser() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    const token = sessionStorage.getItem('token');
    if (user && token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp > Date.now() / 1000;
      } catch (error) {
        console.error("Token inválido:", error);
        return false;
      }
    }
    return false;
  }

  getRoles() {
    const user = this.getCurrentUser();
    const token = sessionStorage.getItem('token');
    if (user && token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.roles || [];
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return [];
      }
    }
    return [];
  }

  hasRole(role) {
    return this.getRoles().includes(role);
  }

  getAuthHeader() {
    const token = sessionStorage.getItem('token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
