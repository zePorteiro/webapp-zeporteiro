import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://172.206.254.101:8080/';

class AuthService {
  async login(email, senha) {
    const response = await axios.post(`${API_URL}/clientes/login`, { email, senha });
    if (response.data.token) {
      sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    sessionStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    return user && user.token;
  }

  getRoles() {
    const user = this.getCurrentUser();
    if (user) {
      const decodedToken = jwtDecode(user.token);
      return decodedToken.roles;
    }
    return [];
  }

  hasRole(role) {
    const roles = this.getRoles();
    return roles.includes(role);
  }
}

export default new AuthService();