import apiService from './api';

class AuthService {
    async login(email, password) {
        try {
            const response = await apiService.post('/auth/login', {
                email,
                password
            });

            if (response.success && response.data.token) {
                this.setAuthData(response.data);
                return response.data;
            }
            throw new Error(response.message || 'Login failed');
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }

    logout() {
        this.clearAuthData();
        window.location.href = '/login';
    }

    setAuthData(data) {
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('name', data.name);
        sessionStorage.setItem('role', data.role.role_name);
    }

    clearAuthData() {
        sessionStorage.clear();
    }

    isAuthenticated() {
        return !!sessionStorage.getItem('authToken');
    }

    getCurrentUser() {
        return {
            name: sessionStorage.getItem('name'),
            role: sessionStorage.getItem('role')
        };
    }
}

export default new AuthService();
