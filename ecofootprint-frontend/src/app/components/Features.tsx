'use client';

import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { Leaf, Cloud, Trophy } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Leaf size={40} />,
    title: 'CarbonGauge',
    description: 'Track your daily carbon emissions and your environmental impact.',
    color: '#2E7D32',
    link: '/EmissionCalc/Vehicle',
    image: '/carbonTracking.jpg', // Placeholder image
  },
  {
    icon: <Cloud size={40} />,
    title: 'Air Quality',
    description: 'Get real-time air quality data and recommendations for your area.',
    color: '#4FC3F7',
    link: '/AQI',
    image: '/AQI.jpg', // Placeholder image
  },
  {
    icon: <Trophy size={40} color="#FFD700" />,
    title: 'Leaderboard',
    description: 'See how you rank in CO₂ savings compared to others.',
    color: '#FFD700',
    link: '/leaderboard',
    image: '/userLeaderboard.jpg', // Placeholder image
  },
  {
    icon: <Trophy size={40} color="#2e7d32" />,
    title: 'My Badges',
    description: 'Earn and showcase badges for your eco achievements.',
    color: '#2e7d32',
    link: '/badges',
    image: '/Badge.jpg', // Placeholder image (replace with a badge image if available)
  },
];

export default function Features() {
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 6,
            color: 'primary.main',
            fontWeight: 700,
          }}
        >
          Key Features
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 5,
            alignItems: 'stretch',
            justifyContent: 'center',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            width: '100%',
            maxWidth: 1500,
            mx: 'auto',
          }}
        >
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              style={{ textDecoration: 'none', flex: 1, minWidth: 260, maxWidth: 340, margin: '0 12px', display: 'flex' }}
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minHeight: 340,
                  width: '100%',
                  maxWidth: 340,
                  flex: 1,
                  mx: 0,
                  boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.10)',
                  borderRadius: 5,
                  background: 'linear-gradient(180deg, #fff 70%, #e3f2fd 100%)',
                  transition: 'all 0.3s cubic-bezier(.4,2,.3,1)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: '0 16px 32px 0 rgba(67, 160, 71, 0.15)',
                  },
                  p: 0,
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                {/* Image on Top */}
                <Box
                  sx={{
                    width: '100%',
                    height: 180,
                    background: '#222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  />
                </Box>
                {/* Content Below Image */}
                <CardContent
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: { xs: 3, md: 4 },
                    bgcolor: 'transparent',
                  }}
                >
                  <Box
                    sx={{
                      color: feature.color,
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      mb: 1,
                      fontWeight: 700,
                      color: 'primary.main',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#222',
                      fontSize: 18,
                      mb: 1.5,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
