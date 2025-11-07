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
  Avatar,
  Stack,
} from "@mui/material";

type Post = {
  id: number;
  title: string;
  body: string;
  author: string;
  userId: string;
};

// Функція для стабільного кольору з рядка
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.floor(
    Math.abs(Math.sin(hash) * 16777215) % 16777215
  ).toString(16);
  return `#${"0".repeat(6 - color.length) + color}`;
}

// Симуляція запиту постів з автором
async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=6"
  );
  const data = await res.json();
  return data.map((post: any) => ({
    id: post.id,
    title: post.title,
    body: post.body,
    author: `Автор ${post.userId}`,
    userId: String(post.userId),
  }));
}

export const Route = createFileRoute("/")({
  component: PostsPage,
});

function PostsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <Typography variant="subtitle1" color="error">
          Не вдалося завантажити публікації
        </Typography>
      </Box>
    );

  return (
    <Box maxWidth="800px" mx="auto" px={2} py={4}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Останні публікації
      </Typography>

      <Grid container spacing={3}>
        {data?.map((post) => (
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
                  <Avatar
                    sx={{
                      bgcolor: stringToColor(post.userId),
                      width: 36,
                      height: 36,
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    {post.author.charAt(6)} {/* літера з імені */}
                  </Avatar>
                  <Typography variant="subtitle2" color="text.secondary">
                    {post.author}
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
