import { useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPostById, updatePost, deletePost } from "@/api/post";
import { postSchema, type PostFormData } from "@/schemas/postSchemas";

export function useEditPost() {
  const navigate = useNavigate();
  const { postId } = useParams({ from: "/edit-post/$postId" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId!),
    enabled: !!postId,
  });

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const { reset } = form;

  const updateMutation = useMutation({
    mutationFn: (data: PostFormData) => updatePost(postId, data),
    onSuccess: () => navigate({ to: "/" }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => navigate({ to: "/" }),
  });

  const onSubmit = async (data: PostFormData) => {
    await updateMutation.mutateAsync(data);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteMutation.mutateAsync();
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return {
    post,
    deleteDialogOpen,
    isLoading,
    isError,
    isUpdatePending: updateMutation.isPending,
    isDeletePending: deleteMutation.isPending,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    form,
    onSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    reset,
    postId,
  };
}
