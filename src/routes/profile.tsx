import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Header from "@/components/layout/Header";
import { Box } from "@mui/material";
import { useAuth } from "@/contexts/AuthProvider";
import CurrentUserProfileCard from "@/components/profile/CurrentUserProfileCard";
import UserLoadingState from "@/components/profile/UserLoadingState";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { user, setToken, token } = useAuth();

  const {
    mutate: handleLogout,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setToken(null);
      navigate({ to: "/" });
    },
  });

  if (!token) {
    navigate({ to: "/login" });
  }
  if (!user) {
    return <UserLoadingState />;
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          mt: 16,
        }}
      >
        <CurrentUserProfileCard
          user={user}
          handleLogout={handleLogout}
          isError={isError}
          error={error}
          isPending={isPending}
        />
      </Box>
    </Box>
  );
}
