// src/services/authService.js

const API_URL = 'http://localhost:8080/api/auth';

class AuthService {
    constructor() {
        this.tokenKey = 'jwt_token';
    }

    /**
     * Login user and store JWT
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Promise<string>} JWT token
     */
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                // If status is not 2xx, throw error
                const errorText = await response.text();
                throw new Error(errorText || 'Login failed');
            }

            const token = await response.text(); // Backend returns plain string token

            if (token && token !== 'Invalid username or password') {
                this.setToken(token);
                return token;
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw new Error(error.message || 'Network error occurred');
        }
    }

    /**
     * Register new user
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} Registration response
     */
    async register(userData) {
        try {
            // Corectează URL-ul - elimina /auth suplimentar
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    timeZone: userData.timeZone
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Registration failed');
            }

            // Register is successful (201 Created with no body)
            // User needs to login manually
            return { success: true };

        } catch (error) {
            console.error('Registration error:', error);
            throw new Error(error.message || 'Registration failed');
        }
    }

    /**
     * Logout user - remove token from storage
     */
    logout() {
        this.removeToken();
        // Optional: Call logout endpoint on backend
        // fetch(`${API_URL}/auth/logout`, { method: 'POST' }).catch(console.error);
    }

    /**
     * Store JWT token
     * @param {string} token - JWT token
     */
    setToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    /**
     * Get stored JWT token
     * @returns {string|null} JWT token or null
     */
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Remove JWT token
     */
    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} True if token exists
     */
    isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;

        // Check if token is expired
        if (this.isTokenExpired(token)) {
            this.logout();
            return false;
        }

        return true;
    }

    /**
     * Decode JWT token to get payload
     * @param {string} token - JWT token
     * @returns {Object|null} Decoded payload or null
     */
    decodeToken(token = null) {
        const tokenToDecode = token || this.getToken();
        if (!tokenToDecode) return null;

        try {
            // JWT format: header.payload.signature
            const parts = tokenToDecode.split('.');
            if (parts.length !== 3) return null;

            const payloadBase64 = parts[1];
            // Replace URL-safe characters and decode
            const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
            const payloadJson = atob(base64);
            return JSON.parse(payloadJson);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    /**
     * Check if token is expired
     * @param {string} token - JWT token
     * @returns {boolean} True if expired
     */
    isTokenExpired(token = null) {
        const decoded = this.decodeToken(token);
        if (!decoded || !decoded.exp) return true;

        // exp is in seconds, Date.now() is in milliseconds
        const expirationTime = decoded.exp * 1000;
        return Date.now() >= expirationTime;
    }

    /**
     * Get token expiration time
     * @returns {Date|null} Expiration date or null
     */
    getTokenExpiration() {
        const decoded = this.decodeToken();
        if (!decoded || !decoded.exp) return null;
        return new Date(decoded.exp * 1000);
    }

    /**
     * Get current user info from token
     * @returns {Object|null} User info or null
     */
    getCurrentUser() {
        const decoded = this.decodeToken();
        if (!decoded) return null;

        return {
            email: decoded.sub,
            userId: decoded.id,  // ← Asigură-te că asta există în token
            issuedAt: new Date(decoded.iat * 1000),
            expiresAt: new Date(decoded.exp * 1000)
        };
    }

    /**
     * Create authenticated fetch request
     * Wrapper around fetch that automatically adds Authorization header
     * @param {string} url - Request URL
     * @param {Object} options - Fetch options
     * @returns {Promise<Response>} Fetch response
     */
    async authenticatedFetch(url, options = {}) {
        const token = this.getToken();

        if (!token) {
            throw new Error('No authentication token');
        }

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };

        const response = await fetch(url, {
            ...options,
            headers
        });

        // If unauthorized, logout and throw error
        if (response.status === 401) {
            this.logout();
            throw new Error('Session expired. Please login again.');
        }

        return response;
    }
}
export default new AuthService();