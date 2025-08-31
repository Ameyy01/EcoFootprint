'use client';

import { useState } from 'react';
import {
  Container,
  Tabs,
  Tab,
  TextField,
  Typography,
  Button,
  Paper,
  Box,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

// Google SVG Icon
const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 533.5 544.3">
    <path fill="#4285F4" d="M533.5 278.4c0-18.3-1.6-36-4.6-53.2H272v100.9h146.9c-6.4 34-25.5 62.8-54.4 82.1v68.2h87.9c51.4-47.3 81.1-117 81.1-197.9z" />
    <path fill="#34A853" d="M272 544.3c73.5 0 135-24.4 180-66.4l-87.9-68.2c-24.4 16.3-55.4 25.9-92.1 25.9-70.9 0-131-47.9-152.5-112.2H30.9v70.5C75.5 480.7 167.4 544.3 272 544.3z" />
    <path fill="#FBBC05" d="M119.5 323.4c-10.8-32.4-10.8-67.6 0-100L30.9 152.9C-10.3 228.5-10.3 315.9 30.9 391.6l88.6-68.2z" />
    <path fill="#EA4335" d="M272 107.7c39.8 0 75.6 13.7 103.8 40.5l77.9-77.9C407 24.5 345.5 0 272 0 167.4 0 75.5 63.6 30.9 152.9l88.6 70.5C141 155.5 201.1 107.7 272 107.7z" />
  </svg>
);

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
  [key: string]: unknown;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setError('');
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tabIndex === 0) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/');
    } catch (error) {
      let errorMessage = 'An error occurred.';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Account has been disabled.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No user found.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password.';
            break;
          case 'auth/email-already-in-use':
            errorMessage = 'Email already in use.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Weak password. Minimum 6 characters.';
            break;
          default:
            errorMessage = error.message;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) throw new Error('Failed to authenticate with backend');
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Authentication failed');

      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.userName || '');
      router.push('/dashboard');
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;
      if (code === 'auth/popup-closed-by-user') {
        setError('Popup closed. Try again.');
      } else if (code === 'auth/network-request-failed') {
        setError('Network error. Check your internet.');
      } else {
        setError((error as { message?: string })?.message || 'Google sign-in failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            backgroundColor: '#ffffff',
            px: 4,
            py: 5,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 600, mb: 3, color: '#2e7d32' }}
          >
            Welcome
          </Typography>

          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              mb: 3,
              '& .MuiTab-root': {
                backgroundColor: '#fff !important',
                color: '#2e7d32 !important',
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 2,
                minHeight: 48,
                transition: 'color 0.2s, background 0.2s',
                zIndex: 1,
              },
              '& .Mui-selected': {
                backgroundColor: '#2e7d32 !important',
                color: '#fff !important',
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            <Tab label="Sign In" />
            <Tab label="Create Account" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleAuth}>
            <TabPanel value={tabIndex} index={0}>
              <TextField
                label="Email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: '#2e7d32',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#27642a',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
              <TextField
                label="Email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                helperText="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: '#2e7d32',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#27642a',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </Button>
            </TabPanel>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleLogo />}
            onClick={handleGoogleSignIn}
            disabled={loading}
            sx={{
              py: 1.3,
              textTransform: 'none',
              fontWeight: 500,
              borderColor: '#ccc',
              color: '#333',
              '&:hover': {
                borderColor: '#2e7d32',
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Continue with Google
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
