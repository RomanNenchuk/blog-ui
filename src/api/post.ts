import { apiClient } from "./clients";

export async function fetchPosts(): Promise<Post[]> {
  const response = await apiClient.get("/posts");
  return response.data;
}

export const createPost = async (postData: { title: string; body: string }) => {
  const { data } = await apiClient.post("/posts", postData);
  return data;
};
