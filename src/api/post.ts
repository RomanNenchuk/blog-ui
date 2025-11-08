import { apiClient } from "./clients";

export async function fetchPosts(): Promise<Post[]> {
  const response = await apiClient.get("/posts");
  return response.data;
}
