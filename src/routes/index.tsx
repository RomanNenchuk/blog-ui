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

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Як створити власний проєкт з нуля",
    body: "Почати завжди складно. У цій статті я розповім, як структурувати роботу, розділити її на етапи та уникнути типових помилок початківців.",
    author: { id: "ujsgfdhgjk1", name: "Олександр Коваль" },
  },
  {
    id: 2,
    title: "Поради з продуктивності в React",
    body: "Оптимізація рендерів, використання мемоізації, та розділення компонентів — усе це допоможе зробити ваш застосунок швидшим і приємнішим у використанні.",
    author: { id: "udsfs2", name: "Марія Іваненко" },
  },
  {
    id: 3,
    title: "Що таке чиста архітектура в бекенді",
    body: "Чиста архітектура допомагає відокремити бізнес-логіку від інфраструктури. У цій публікації ми розглянемо основні принципи та практичні приклади.",
    author: { id: "u324uy2iu4y2373", name: "Ігор Петренко" },
  },
  {
    id: 4,
    title: "Як писати зрозумілий код",
    body: "Зрозумілий код — це той, який легко читати і підтримувати. Давайте розберемось, як іменування, структура та коментарі впливають на якість коду.",
    author: { id: "u4", name: "Катерина Левчук" },
  },
  {
    id: 5,
    title: "Роль тестування у великих проєктах",
    body: "Тестування — це не просто перевірка, а й спосіб проєктування системи. Ми розглянемо підходи TDD і модульне тестування у реальних сценаріях.",
    author: { id: "u5", name: "Дмитро Савчук" },
  },
  {
    id: 6,
    title: "Як почати з TypeScript у фронтенді",
    body: "TypeScript додає безпечність і передбачуваність у код. Розберемо базові поняття, типи і те, як інтегрувати TS у наявний React-проєкт.",
    author: { id: "u6", name: "Наталія Бондар" },
  },
];

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
  const {
    data: _,
    isLoading,
    isError,
  } = useQuery({
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
        {mockPosts.map((post) => (
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
                    displayName={post.author.name}
                  />
                  <Typography variant="subtitle2" color="text.secondary">
                    {post.author.name}
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
