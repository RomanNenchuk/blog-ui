import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import UserAvatar from "@/components/UserAvatar";
import { fetchPosts } from "@/api/post";

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

  console.log(posts);

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <Typography variant="subtitle1">Failed to load posts</Typography>
      </Box>
    );

  if (!posts || posts.length === 0)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <Typography variant="subtitle1">
          Be first to share something amazing!
        </Typography>
      </Box>
    );

  return (
    <Box maxWidth="800px" mx="auto" px={2} py={4}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Recent posts
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id} size={12}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                p: 2,
                transition: "box-shadow 0.2s ease",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                },
              }}
            >
              <CardContent>
                {/* Автор зверху */}
                <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
                  <UserAvatar
                    id={post.author.id}
                    fullname={post.author.fullname}
                  />
                  <Typography variant="subtitle2" color="text.secondary">
                    {post.author.fullname}
                  </Typography>
                </Stack>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.body}
                </Typography>

                <Divider />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
