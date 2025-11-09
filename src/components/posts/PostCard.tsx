import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { formatDistanceToNow } from "date-fns";
import UserAvatar from "../auth/UserAvatar";
import { useNavigate } from "@tanstack/react-router";
import TruncatedText from "../common/TruncatedText";

export default function PostCard({
  post,
  detailed = false,
}: {
  post: Post;
  detailed?: boolean;
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate({ to: "/posts/$postId", params: { postId: post.id } });
  };

  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Card
        onClick={handlePostClick}
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderColor: theme.palette.divider,
          bgcolor: theme.palette.background.paper,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
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

          <TruncatedText
            variant="body1"
            fontWeight={700}
            gutterBottom
            detailed={detailed}
            text={post.title}
          />

          <TruncatedText
            variant="body2"
            color="text.secondary"
            detailed={detailed}
            text={post.body}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
