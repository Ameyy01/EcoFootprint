'use client';

import { Box, Container, Typography, Card, CardContent, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const MotionCard = motion(Card);

const badges = [
  {
    title: 'Joined EcoFootprint',
    description: 'You took your first step towards a greener future.',
    icon: <EmojiEventsIcon fontSize="large" />,
    gradient: 'radial-gradient(circle at 30% 30%, #FFD700, #B8860B)', // Gold
    glow: '0 0 15px rgba(255, 215, 0, 0.6)',
  },
  {
    title: 'CO₂ Tracking Started',
    description: 'You began tracking your carbon emissions.',
    icon: <TrackChangesIcon fontSize="large" />,
    gradient: 'radial-gradient(circle at 30% 30%, #C0C0C0, #808080)', // Silver
    glow: '0 0 15px rgba(192, 192, 192, 0.5)',
  },
];

export default function BadgesPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        py: 6,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 700, mb: 5, color: '#2e7d32' }}
        >
          Your Eco Achievements 🏅
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: 4,
            flexWrap: 'wrap',
          }}
        >
          {badges.map((badge, index) => (
            <MotionCard
              key={badge.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              sx={{
                flex: '1 1 300px',
                borderRadius: 4,
                background: '#ffffff',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  background: badge.gradient,
                  boxShadow: badge.glow,
                  border: '2px solid #ffffff',
                  color: '#ffffff',
                }}
              >
                {badge.icon}
              </Avatar>

              <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                  {badge.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
                  {badge.description}
                </Typography>
              </CardContent>
            </MotionCard>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
