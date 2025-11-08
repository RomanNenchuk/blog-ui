import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export default function CreatePostButton() {
  const navigate = useNavigate();
  return (
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
  );
}
