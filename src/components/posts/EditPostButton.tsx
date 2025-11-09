import { Edit } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export default function CreatePostButton({ postId }: { postId: string }) {
  const navigate = useNavigate();
  return (
    <Fab
      color="primary"
      aria-label="edit post"
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        height: 50,
        width: 50,
      }}
      onClick={() => navigate({ to: "/edit-post/$postId", params: { postId } })}
    >
      <Edit />
    </Fab>
  );
}
