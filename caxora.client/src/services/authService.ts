// Auth service to integrate with Caxora backend API
const API_BASE_URL = 'http://localhost:5147'; // Caxora backend port

export interface SignupRequest {
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
  };
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
  };
  token?: string;
}

class AuthService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async signup(userData: SignupRequest): Promise<SignupResponse> {
    try {
      const response = await this.makeRequest<SignupResponse>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      // Store token if provided
      if (response.token) {
        localStorage.setItem('caxora_token', response.token);
      }

      return response;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.makeRequest<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      // Store token if provided
      if (response.token) {
        localStorage.setItem('caxora_token', response.token);
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('caxora_token');
      if (token) {
        await this.makeRequest('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('caxora_token');
    }
  }

  getToken(): string | null {
    return localStorage.getItem('caxora_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Get user profile (requires authentication)
  async getProfile(): Promise<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    return this.makeRequest('/api/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

export const authService = new AuthService();
export default authService;
