import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#43A047', // Eco green
      contrastText: '#fff',
    },
    secondary: {
      main: '#1976d2', // Eco blue
      contrastText: '#fff',
    },
    background: {
      default: '#e3f2fd',
      paper: 'rgba(255,255,255,0.7)',
    },
    success: {
      main: '#43A047',
    },
    error: {
      main: '#e53935',
    },
    warning: {
      main: '#fbc02d',
    },
    info: {
      main: '#1976d2',
    },
    text: {
      primary: '#222',
      secondary: '#1976d2',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: 'Inter, Nunito, Roboto, Arial, sans-serif',
    fontWeightBold: 800,
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.10)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          background: 'rgba(255,255,255,0.7)',
          boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.10)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          background: 'rgba(255,255,255,0.7)',
          boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.10)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px 0 rgba(67, 160, 71, 0.10)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme; 