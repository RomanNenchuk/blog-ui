import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import Header from "@/components/layout/Header";
import PostCard from "@/components/posts/PostCard";
import { getPostById } from "@/api/post";
import EditPostButton from "@/components/posts/EditPostButton";
import { useAuth } from "@/contexts/AuthProvider";

export const Route = createFileRoute("/posts/$postId")({
  component: PostDetailsPage,
});

function PostDetailsPage() {
  const { postId } = useParams({ from: "/posts/$postId" });
  const { user } = useAuth();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId!),
    enabled: !!postId,
  });

  if (isLoading) {
    return (
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Header />
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Stack alignItems="center" py={5}>
            <CircularProgress />
          </Stack>
        </Container>
      </Box>
    );
  }

  if (isError || !post) {
    return (
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Header />
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography color="error" align="center">
            Failed to load the post.
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <PostCard post={post} detailed />
      </Container>
      {post.author.id === user?.id && <EditPostButton postId={post.id} />}
    </Box>
  );
}
