import { apiClient } from "./clients";

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get("/profile/me");
  return response.data;
};
