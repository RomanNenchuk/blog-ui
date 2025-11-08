import { Box, Card, CardContent, Alert, Button } from "@mui/material";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type CurrentUserProfileCardType = {
  user: User;
  isError: boolean;
  error: Error | null;
  isPending: boolean;
  handleLogout: VoidFunction;
};

export default function CurrentUserProfileCard({
  user,
  isError,
  isPending,
  handleLogout,
}: CurrentUserProfileCardType) {
  return (
    <Box sx={{ width: "100%", maxWidth: 700, px: { xs: 2, sm: 4 } }}>
      {isError && (
        <Alert
          icon={<ErrorOutlineIcon fontSize="inherit" />}
          sx={{ mb: 2 }}
          severity="error"
        >
          Failed to logout. Please try again later
        </Alert>
      )}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "center", sm: "start" },
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
            }}
          >
            <ProfileHeader user={user} />
            <Button
              variant="contained"
              size="small"
              sx={{ my: "auto", width: { xs: "80%", sm: "auto" } }}
              disabled={isPending}
              onClick={() => handleLogout()}
            >
              Log out
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
