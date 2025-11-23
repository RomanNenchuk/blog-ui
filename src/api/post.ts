import { apiClient } from "./clients";

export async function fetchPosts(): Promise<Post[]> {
  const response = await apiClient.get("/posts");
  return response.data;
}

export async function getPostById(id: string): Promise<Post> {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
}

export const createPost = async (postData: { title: string; body: string }) => {
  const { data } = await apiClient.post("/posts", postData);
  return data;
};

export const deletePost = async (postId: string) => {
  const { data } = await apiClient.delete(`/posts/${postId}`);
  return data;
};

export const updatePost = async (
  postId: string,
  postData: { title: string; body: string }
) => {
  const { data } = await apiClient.put(`/posts/${postId}`, postData);
  return data;
};
