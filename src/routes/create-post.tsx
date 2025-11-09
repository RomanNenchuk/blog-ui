import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/layout/Header";
import { createPost } from "@/api/post";
import { postSchema, type PostFormData } from "@/schemas/postSchemas";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect } from "react";

export const Route = createFileRoute("/create-post")({
  component: CreatePostPage,
});

function CreatePostPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) navigate({ to: "/login", replace: true });
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const {
    mutateAsync: handleCreate,
    isPending,
    error,
  } = useMutation({
    mutationFn: createPost,
    onSuccess: () => navigate({ to: "/" }),
  });

  const onSubmit = async (data: PostFormData) => {
    await handleCreate(data);
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
          <Typography variant="h4" fontWeight={600} mb={3}>
            ✏️ Create a New Post
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                {isPending ? "Creating..." : "Create Post"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
