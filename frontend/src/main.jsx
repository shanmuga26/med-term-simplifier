// medical-simplifier/frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define a custom Material UI theme with a more vibrant palette
const theme = createTheme({
  palette: {
    mode: 'dark', // Keep dark mode for professionalism
    primary: {
      main: '#00D1C8', // A brighter, more energetic teal
      light: '#4CE0DD', // Lighter version for hover/focus
      dark: '#00A09B',  // Darker version for background highlights
      contrastText: '#FFFFFF', // White text on primary colors
    },
    secondary: {
      main: '#8BC34A', // A fresh, natural green
      light: '#B2FF59',
      dark: '#689F38',
      contrastText: '#FFFFFF',
    },
    // Adding a new accent color (can be accessed as theme.palette.tertiary.main)
    tertiary: {
      main: '#FFB300', // A warm, golden orange for accents
      light: '#FFD54F',
      dark: '#E65100',
      contrastText: '#000000', // Black text on this bright color
    },
    error: {
      main: '#EF5350', // Standard error red
    },
    warning: {
      main: '#FFCA28', // Standard warning yellow
    },
    info: {
      main: '#29B6F6', // Standard info blue
    },
    success: {
      main: '#66BB6A', // Standard success green
    },
    background: {
      default: '#1A2930', // Deep, rich dark blue background
      paper: '#233845',   // Slightly lighter blue for cards/containers
    },
    text: {
      primary: '#E0F2F7', // Off-white/light blue for main text
      secondary: '#A7C9D6', // Lighter blue for secondary text/labels
      disabled: '#6E8B99',
    },
    divider: '#3C5C6C', // A visible, yet harmonious, divider color
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 700, // Make titles bolder
      letterSpacing: '0.02em',
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Keep button text natural
      fontWeight: 600,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16, // More pronounced rounded corners for cards
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.4)', // Deeper, softer shadows
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12, // Rounded text field borders
            '& fieldset': {
              borderColor: '#4A6D86', // Custom border color
            },
            '&:hover fieldset': {
              borderColor: '#00D1C8', // Primary color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFB300', // Accent color on focus
              borderWidth: '2px', // Thicker border on focus
            },
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#233845', // Match paper background
          color: '#E0F2F7',
          fontSize: '0.9rem',
          padding: '10px 14px',
          borderRadius: 8,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
        },
        arrow: {
          color: '#233845', // Match tooltip background
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);