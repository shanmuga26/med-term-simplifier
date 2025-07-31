// medical-simplifier/frontend/src/App.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Alert,
  AlertTitle,
  useTheme,
  Tooltip,
  AppBar,
  Toolbar,
  Container,
  LinearProgress
} from '@mui/material';
import { HelpOutline, MedicalServicesOutlined, TranslateOutlined } from '@mui/icons-material';

function App() {
  const theme = useTheme();
  const [inputText, setInputText] = useState('');
  const [simplifiedData, setSimplifiedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSimplify = async () => {
    setLoading(true);
    setError(null);
    setSimplifiedData(null); // Clear previous results

    try {
      const response = await axios.post('http://localhost:8000/simplify', {
        text: inputText,
      });
      setSimplifiedData(response.data);
      console.log("Backend Response:", response.data);
    } catch (err) {
      console.error('Error simplifying text:', err);
      setError('Failed to simplify text. Please ensure the backend is running and matches the expected API structure (glossary-based).');
    } finally {
      setLoading(false);
    }
  };

  const renderHighlightedText = () => {
    if (!simplifiedData || !simplifiedData.original_text) {
      return null;
    }

    const textParts = [];
    let lastIndex = 0;

    const sortedParts = [...simplifiedData.simplified_parts].sort((a, b) => a.start - b.start);

    sortedParts.forEach((part) => {
      if (part.start > lastIndex) {
        textParts.push(
          <React.Fragment key={`text-${lastIndex}`}>{simplifiedData.original_text.substring(lastIndex, part.start)}</React.Fragment>
        );
      }

      textParts.push(
        <Tooltip
          key={`tooltip-${part.start}`}
          title={
            <Typography variant="body2" sx={{ p: 1 }}>
              {part.explanation}
            </Typography>
          }
          arrow
          placement="top"
          enterDelay={300}
          leaveDelay={200}
        >
          <Box
            component="span"
            sx={{
              backgroundColor: theme.palette.primary.dark, // Keep dark teal for highlights
              color: theme.palette.primary.contrastText,
              borderRadius: '4px',
              padding: '2px 4px',
              cursor: 'help',
              fontWeight: 'bold',
              whiteSpace: 'pre-wrap',
              transition: 'background-color 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: theme.palette.primary.light, // Brighter teal on hover
              }
            }}
          >
            {part.term} <HelpOutline sx={{ fontSize: '0.9em', verticalAlign: 'middle' }} />
          </Box>
        </Tooltip>
      );
      lastIndex = part.end;
    });

    if (lastIndex < simplifiedData.original_text.length) {
      textParts.push(
        <React.Fragment key={`text-end-${lastIndex}`}>{simplifiedData.original_text.substring(lastIndex)}</React.Fragment>
      );
    }

    return <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', textAlign: 'left', lineHeight: 1.8 }}>{textParts}</Typography>;
  };


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        // More dynamic background gradient
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 50%, ${theme.palette.background.default} 100%)`,
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle Background Animation: Moving Gradient/Shapes (pure CSS) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.2, // Slightly more visible
          background: `
            radial-gradient(circle at 10% 20%, ${theme.palette.primary.light} 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, ${theme.palette.secondary.light} 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, ${theme.palette.tertiary.main} 0%, transparent 50%) // New gradient spot
          `,
          backgroundSize: '250% 250%', // Even larger
          animation: 'moveGradient 20s ease-in-out infinite alternate', // Slower, more subtle
          '@keyframes moveGradient': {
            '0%': { backgroundPosition: '0% 0%' },
            '100%': { backgroundPosition: '100% 100%' },
          },
        }}
      />

      <AppBar position="static" sx={{ py: 2, bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[6] }}> {/* Solid AppBar background & shadow */}
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <MedicalServicesOutlined sx={{ mr: 1.5, color: theme.palette.tertiary.main, fontSize: '2.8rem' }} /> {/* Use tertiary color */}
            </motion.div>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, letterSpacing: '0.05em' }}>
              MedTerm Simplifier
            </Typography>
            <TranslateOutlined sx={{ ml: 1.5, color: theme.palette.tertiary.main, fontSize: '2.8rem' }} /> {/* Use tertiary color */}
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 5, mb: 5, flexGrow: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: '100%' }}
        >
          <Paper
            elevation={12}
            sx={{
              p: { xs: 3, sm: 5 },
              bgcolor: theme.palette.background.paper,
              borderRadius: 4,
              boxShadow: theme.shadows[10],
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
              }
            }}
          >
            <Stack spacing={3}>
              <Typography variant="h5" component="h1" color={theme.palette.primary.light} textAlign="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                Simplify Complex Medical Jargon
              </Typography>
              <Typography variant="body1" textAlign="center" color={theme.palette.text.secondary}>
                Paste any medical text below to instantly get simplified explanations for key terms.
              </Typography>

              <TextField
                label="Paste Medical Text Here"
                multiline
                rows={8}
                fullWidth
                variant="outlined"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                sx={{
                  mt: 2
                }}
              />

              <Button
                variant="contained"
                color="secondary" // Use secondary color for button for contrast
                onClick={handleSimplify}
                disabled={loading || inputText.trim() === ''}
                sx={{
                  py: 1.8,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  boxShadow: theme.shadows[5], // Slightly more pronounced button shadow
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    backgroundColor: theme.palette.secondary.light // Lighter green on hover
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'SIMPLIFY TEXT'}
              </Button>

              {loading && <LinearProgress color="tertiary" sx={{ mt: 2 }} />} {/* Use tertiary color for loading bar */}

              {error && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                  <AlertTitle>Error Processing</AlertTitle>
                  {error}
                </Alert>
              )}
            </Stack>
          </Paper>
        </motion.div>

        {simplifiedData && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{ width: '100%' }}
          >
            <Paper
              elevation={12}
              sx={{
                p: { xs: 3, sm: 5 },
                mt: 5,
                bgcolor: theme.palette.background.paper,
                borderRadius: 4,
                boxShadow: theme.shadows[10],
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Typography variant="h5" component="h2" color={theme.palette.tertiary.main} gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Simplified Explanation
              </Typography>
              {renderHighlightedText()}
              {simplifiedData.simplified_parts.length === 0 && (
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic', mt: 2 }}>
                  No specific medical terms from our current glossary were found in the text, or the text is already simple.
                </Typography>
              )}
            </Paper>
          </motion.div>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ py: 3, mt: 'auto', bgcolor: theme.palette.background.default, width: '100%', textAlign: 'center', color: theme.palette.text.secondary, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="body2">
          Developed by Ashok - Biomedical Engineer specializing in Healthcare IT.
        </Typography>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </Typography>
      </Box>

    </Box>
  );
}

export default App;