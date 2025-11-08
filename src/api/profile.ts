import { apiClient } from "./clients";

export const getCurrentUser = async (): Promise<User> => {
  console.log("getCurrentUser");

  const response = await apiClient.get("/profile/me");
  return response.data;
};
