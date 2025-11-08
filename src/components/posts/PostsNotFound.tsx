import { Typography } from "@mui/material";

export default function PostsNotFound() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        No posts yet
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Be the first to share something amazing!
      </Typography>
    </>
  );
}
