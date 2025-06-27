'use client';

import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Chip from '@mui/material/Chip';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const userId = localStorage.getItem('userId');
      const name = localStorage.getItem('userName');
      setIsLoggedIn(!!userId);
      setUserName(name || '');
    };

    // Check auth immediately
    checkAuth();

    // Listen for storage events
    window.addEventListener('storage', checkAuth);

    // Set up an interval to check auth every second
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      setIsLoggedIn(false);
      setUserName('');
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppBar 
      position="fixed"
      elevation={0}
      sx={{
        background: 'rgba(255,255,255,0.35)',
        backdropFilter: 'blur(18px)',
        borderBottom: 'none',
        boxShadow: '0 4px 24px 0 rgba(67, 160, 71, 0.08)',
        zIndex: 1100,
        width: '100vw',
      }}
    >
      <Toolbar sx={{ 
        width: '100%',
        px: { xs: 2, sm: 4, md: 6 },
        minHeight: '70px',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            textDecoration: 'none',
            background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            fontSize: '1.6rem',
            letterSpacing: '0.5px',
            '&:hover': {
              background: 'linear-gradient(45deg, #1B5E20 30%, #2E7D32 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          }}
        >
          EcoFootprint
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 2, sm: 3, md: 4 }, 
          alignItems: 'center',
          ml: 'auto'
        }}>
          <Link
            href="/"
            style={{ textDecoration: 'none' }}
          >
            <Typography
              sx={{
                color: pathname === '/' ? 'primary.main' : '#222',
                fontWeight: pathname === '/' ? 700 : 500,
                fontSize: '1.08rem',
                px: 1,
                py: 0.5,
                borderRadius: 2,
                position: 'relative',
                transition: 'color 0.2s',
                cursor: 'pointer',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: pathname === '/' ? '100%' : '0%',
                  height: '2px',
                  background: 'linear-gradient(90deg, #43A047 0%, #1976d2 100%)',
                  borderRadius: 2,
                  transition: 'width 0.3s',
                },
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'rgba(67, 160, 71, 0.06)',
                  '&:after': {
                    width: '100%',
                  },
                },
              }}
            >
              Home
            </Typography>
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/EmissionCalc/Vehicle" style={{ textDecoration: 'none' }}>
                <Typography
                  sx={{
                    color: pathname === '/EmissionCalc/Vehicle' ? 'primary.main' : '#222',
                    fontWeight: pathname === '/EmissionCalc/Vehicle' ? 700 : 500,
                    fontSize: '1.08rem',
                    px: 1,
                    py: 0.5,
                    borderRadius: 2,
                    position: 'relative',
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: pathname === '/EmissionCalc' ? '100%' : '0%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #43A047 0%, #1976d2 100%)',
                      borderRadius: 2,
                      transition: 'width 0.3s',
                    },
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(67, 160, 71, 0.06)',
                      '&:after': {
                        width: '100%',
                      },
                    },
                  }}
                >
                  Calculate
                </Typography>
              </Link>
              <Link href="/visualization" style={{ textDecoration: 'none' }}>
                <Typography
                  sx={{
                    color: pathname === '/visualization' ? 'primary.main' : '#222',
                    fontWeight: pathname === '/visualization' ? 700 : 500,
                    fontSize: '1.08rem',
                    px: 1,
                    py: 0.5,
                    borderRadius: 2,
                    position: 'relative',
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: pathname === '/visualization' ? '100%' : '0%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #43A047 0%, #1976d2 100%)',
                      borderRadius: 2,
                      transition: 'width 0.3s',
                    },
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(67, 160, 71, 0.06)',
                      '&:after': {
                        width: '100%',
                      },
                    },
                  }}
                >
                  Visualization
                </Typography>
              </Link>
            </>
          )}
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => setProfileOpen(true)}
                >
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#2E7D32',
                    fontWeight: 500
                  }}
                >
                  {userName}
                </Typography>
              </Box>
              <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, color: '#1976d2', textAlign: 'center' }}>Profile</DialogTitle>
                <DialogContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 1 }}>
                    <Avatar sx={{ width: 64, height: 64, background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)', fontWeight: 700, fontSize: 32 }}>
                      {userName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', mt: 1 }}>{userName}</Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Chip icon={<EmojiEventsIcon sx={{ color: '#FFD700' }} />} label="Joined EcoFootprint" color="primary" variant="outlined" sx={{ fontWeight: 600, fontSize: 15 }} />
                      <Chip icon={<CheckCircleIcon sx={{ color: '#43A047' }} />} label="Started CO₂ Tracking" color="success" variant="outlined" sx={{ fontWeight: 600, fontSize: 15 }} />
                    </Box>
                  </Box>
                </DialogContent>
              </Dialog>
              <Button
                onClick={handleLogout}
                variant="outlined"
                size="small"
                sx={{
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  fontWeight: 600,
                  borderRadius: 999,
                  px: 3,
                  py: 1,
                  fontSize: '1rem',
                  transition: 'background 0.2s, color 0.2s',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: '#fff',
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              component={Link}
              href="/login"
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
                color: 'white',
                fontWeight: 500,
                textTransform: 'none',
                px: 3,
                '&:hover': {
                  background: 'linear-gradient(45deg, #1B5E20 30%, #2E7D32 90%)',
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
