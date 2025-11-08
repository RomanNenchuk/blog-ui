import { createTheme } from "@mui/material/styles";
import { red, grey, teal, green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: green[700],
      light: green[400],
      dark: green[900],
      contrastText: "#fff",
    },
    secondary: {
      main: teal[500],
      light: teal[300],
      dark: teal[700],
      contrastText: "#fff",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
    error: {
      main: red[500],
    },
    divider: grey[300],
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontSize: "2.2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.9rem",
      color: grey[700],
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;
