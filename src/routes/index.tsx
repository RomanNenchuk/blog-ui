import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Grid, Container, Divider } from "@mui/material";
import { fetchPosts } from "@/api/post";
import Header from "@/components/layout/Header";
import PostsLoading from "@/components/posts/PostsLoading";
import PostError from "@/components/posts/PostError";
import PostsNotFound from "@/components/posts/PostsNotFound";
import PostCard from "@/components/posts/PostCard";
import CreatePostButton from "@/components/posts/CreatePostButton";

export const Route = createFileRoute("/")({
  component: PostsPage,
});

function PostsPage() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={600} sx={{ my: 3 }}>
          📰 Recent Posts
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3} pb={10}>
          {isLoading ? (
            <PostsLoading />
          ) : isError ? (
            <PostError />
          ) : !posts || posts.length === 0 ? (
            <PostsNotFound />
          ) : (
            posts.map((post) => <PostCard post={post} key={post.id} />)
          )}
        </Grid>
      </Container>
      <CreatePostButton />
    </Box>
  );
}
