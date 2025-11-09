import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/layout/Header";
import { getPostById, updatePost } from "@/api/post";
import { postSchema, type PostFormData } from "@/schemas/postSchemas";

export const Route = createFileRoute("/edit-post/$postId")({
  component: EditPostPage,
});

function EditPostPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { postId } = useParams({ from: "/edit-post/$postId" });

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId!),
    enabled: !!postId,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  // Prefill form when data is loaded
  if (post && !isLoading) {
    reset({
      title: post.title,
      body: post.body,
    });
  }

  const {
    mutateAsync: handleUpdate,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: PostFormData) => updatePost(postId, data),
    onSuccess: () => navigate({ to: "/" }),
  });

  const onSubmit = async (data: PostFormData) => {
    await handleUpdate(data);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper
          sx={{
            p: 4,
            border: 1,
            borderColor: theme.palette.divider,
            borderRadius: 3,
          }}
        >
          {isLoading ? (
            <Stack alignItems="center" py={5}>
              <CircularProgress />
            </Stack>
          ) : isError ? (
            <Typography color="error" align="center">
              Failed to load post.
            </Typography>
          ) : (
            <>
              <Typography variant="h4" fontWeight={600} mb={3}>
                ✏️ Edit Post
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Stack spacing={3}>
                  <TextField
                    label="Title"
                    fullWidth
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />

                  <TextField
                    label="Body"
                    fullWidth
                    multiline
                    minRows={6}
                    {...register("body")}
                    error={!!errors.body}
                    helperText={errors.body?.message}
                  />

                  {error && (
                    <Typography color="error" variant="body2">
                      {(error as any)?.response?.data?.message ||
                        "Something went wrong"}
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isPending}
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </Stack>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
