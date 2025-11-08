import { apiClient } from "./clients";

export const refreshToken = async (): Promise<ApiResponse<string>> => {
  try {
    const response = await apiClient.post("/auth/refresh-token");
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response,
    };
  }
};

export async function register(data: RegisterPayload): Promise<string> {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
}

export async function login(data: LoginPayload): Promise<string> {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
}

export async function logout(): Promise<void> {
  const response = await apiClient.post("/auth/logout");
  return response.data;
}
