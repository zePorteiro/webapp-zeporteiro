import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrigir a importação

import { useNavigate } from "react-router-dom";

const API_URL = 'http://172.206.254.101:8080/';
const localHost = 'http://localhost:8080/';

class AuthService {
  async login(email, senha) {
  try {
      const response = await axios.post(`${localHost}clientes/login`, { email, senha });
      const token = response.data.token;


      window.location.href = "/cadastrar-encomenda";

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.response) {
        if (error.response.status === 401) {
          console.error("Credenciais inválidas. Por favor, tente novamente.");
        }
        else {
          console.error("Detalhes do erro:", error.response.data);
        }
      }
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    if (user && user.token) {
      try {
        const decodedToken = jwtDecode(user.token);
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
    if (user && user.token) {
      const decodedToken = jwtDecode(user.token);
      return decodedToken.roles || [];
    }
    return [];
  }

  hasRole(role) {
    return this.getRoles().includes(role);
  }

  getAuthHeader() {
    const user = this.getCurrentUser();
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  }
}

export default new AuthService();