import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { formatDistanceToNow } from "date-fns";
import UserAvatar from "../auth/UserAvatar";

export default function PostCard({ post }: { post: Post }) {
  const theme = useTheme();

  console.log(post);

  return (
    <Grid key={post.id} size={{ xs: 12, sm: 6 }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderColor: theme.palette.divider,
          bgcolor: theme.palette.background.paper,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "border-color 0.2s ease, transform 0.15s ease",
          "&:hover": {
            borderColor: theme.palette.text.secondary,
            transform: "translateY(-1px)",
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
            <UserAvatar
              size={40}
              id={post.author.id}
              fullname={post.author.fullname}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={600} lineHeight={1}>
                {post.author.fullname}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                lineHeight={1}
              >
                {formatDistanceToNow(post.createdAt, {
                  addSuffix: true,
                })}
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="body1"
            fontWeight={700}
            textOverflow="ellipsis"
            overflow="hidden"
            sx={{
              mb: 1,
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="body2"
            textOverflow="ellipsis"
            overflow="hidden"
            color="text.secondary"
          >
            {post.body}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
