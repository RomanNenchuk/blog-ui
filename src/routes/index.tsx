import { Add } from "@mui/icons-material";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Container,
  Divider,
  useTheme,
  Fab,
} from "@mui/material";
import UserAvatar from "@/components/UserAvatar";
import { fetchPosts } from "@/api/post";
import Header from "@/components/layout/Header";
import PostsLoading from "@/components/posts/PostsLoading";
import PostError from "@/components/posts/PostError";
import PostsNotFound from "@/components/posts/PostsNotFound";

export const Route = createFileRoute("/")({
  component: PostsPage,
});

function PostsPage() {
  const theme = useTheme();
  const navigate = Route.useNavigate();

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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" fontWeight={700} mt={4}>
            📰 Recent Posts
          </Typography>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {isLoading ? (
            <PostsLoading />
          ) : isError ? (
            <PostError />
          ) : !posts || posts.length === 0 ? (
            <PostsNotFound />
          ) : (
            posts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, sm: 6 }}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: 3,
                    bgcolor: theme.palette.background.paper,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "box-shadow 0.2s ease, transform 0.15s ease",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {post.imageUrl && (
                    <Box
                      component="img"
                      src={post.imageUrl}
                      alt={post.title}
                      sx={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                      }}
                    />
                  )}

                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                      mb={2}
                    >
                      <UserAvatar
                        size={40}
                        id={post.author.id}
                        fullname={post.author.fullname}
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {post.author.fullname}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
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
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <Fab
        color="primary"
        aria-label="create post"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          height: 50,
          width: 50,
        }}
        onClick={() => navigate({ to: "/create-post" })}
      >
        <Add />
      </Fab>
    </Box>
  );
}
