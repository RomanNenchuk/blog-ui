import { Grid, Skeleton } from "@mui/material";

export default function PostsLoading() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6 }}>
          <Skeleton
            key={i}
            variant="rectangular"
            height={160}
            animation="wave"
            sx={{ borderRadius: 3, mb: 3 }}
          />
        </Grid>
      ))}
    </>
  );
}
