import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  useTheme,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Header from "@/components/layout/Header";
import { useEditPost } from "@/hooks/useEditPost";
import { useEffect } from "react";

export const Route = createFileRoute("/edit-post/$postId")({
  component: EditPostPage,
});

function EditPostPage() {
  const theme = useTheme();
  const {
    post,
    isLoading,
    isError,
    isUpdatePending,
    isDeletePending,
    updateError,
    deleteError,
    form,
    deleteDialogOpen,
    onSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    reset,
  } = useEditPost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // Prefill form when data is loaded
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        body: post.body,
      });
    }
  }, [post, reset]);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper
          sx={{
            p: 4,
            border: 1,
            borderColor: theme.palette.divider,
            borderRadius: 3,
          }}
        >
          {isLoading ? (
            <Stack alignItems="center" py={5}>
              <CircularProgress />
            </Stack>
          ) : isError ? (
            <Typography align="center">Failed to load post.</Typography>
          ) : (
            <>
              <Typography variant="h4" fontWeight={600} mb={3}>
                ✏️ Edit Post
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Stack spacing={3}>
                  <TextField
                    label="Title"
                    fullWidth
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />

                  <TextField
                    label="Body"
                    fullWidth
                    multiline
                    minRows={6}
                    {...register("body")}
                    error={!!errors.body}
                    helperText={errors.body?.message}
                  />

                  {(updateError || deleteError) && (
                    <Typography color="error" variant="body2">
                      {(updateError as any)?.response?.data?.message ||
                        (deleteError as any)?.response?.data?.message ||
                        "Something went wrong"}
                    </Typography>
                  )}

                  <Stack direction="row" spacing={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isUpdatePending}
                      sx={{ flex: 2 }}
                    >
                      {isUpdatePending ? "Saving..." : "Save Changes"}
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="large"
                      onClick={handleDeleteClick}
                      disabled={isDeletePending}
                      sx={{ flex: 1 }}
                    >
                      {isDeletePending ? "Deleting..." : "Delete"}
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </>
          )}
        </Paper>
      </Container>

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={isDeletePending}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={isDeletePending}
            autoFocus
          >
            {isDeletePending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
