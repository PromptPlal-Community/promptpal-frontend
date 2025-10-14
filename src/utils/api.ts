const API_BASE_URL = 'https://promptpal-backend-j5gl.onrender.com/api';


export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json();
      const error: ApiError = {
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
        code: errorData.code,
      };
      throw error;
    }

    return await response.json() as T;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw {
        message: 'Network error: Unable to reach the server',
        code: 'NETWORK_ERROR',
      } as ApiError;
    }
    throw error;
  }
}