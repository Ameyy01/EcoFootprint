'use client';

import { Box, Container, Typography, Button, Paper } from '@mui/material';
import Link from 'next/link';
import { DirectionsCar, Restaurant, ElectricBolt } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudIcon from '@mui/icons-material/Cloud';
import PeopleIcon from '@mui/icons-material/People';
import { Card, CardContent, Divider } from '@mui/material';

export default function FeatureSection() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        align="center"
        sx={{
          mb: 6,
          color: 'primary.main',
          fontWeight: 700,
        }}
      >
        Track Your Impact
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ mb: 2, color: 'primary.main' }}>
              <DirectionsCar sx={{ mr: 1, verticalAlign: 'middle' }} />
              Vehicle Emissions
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Log your car/bike distance to calculate travel emissions. Enter your commute and track CO₂ output.
            </Typography>
            <Button
              component={Link}
              href="/EmissionCalc/Vehicle"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Calculate Vehicle Emissions
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              height: 200,
              bgcolor: 'primary.light',
              borderRadius: 2,
              opacity: 0.1,
            }}
          />
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: 200,
              bgcolor: 'secondary.light',
              borderRadius: 2,
              opacity: 0.1,
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ mb: 2, color: 'secondary.main' }}>
              <Restaurant sx={{ mr: 1, verticalAlign: 'middle' }} />
              Food Impact
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Pick your meal type (veg, non-veg, vegan) to see its carbon footprint and optimize your choices.
            </Typography>
            <Button
              component={Link}
              href="/EmissionCalc/Food"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'secondary.main',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                },
              }}
            >
              Calculate Food Impact
            </Button>
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ mb: 2, color: 'warning.main' }}>
              <ElectricBolt sx={{ mr: 1, verticalAlign: 'middle' }} />
              Electricity Usage
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Enter your daily electricity usage in kWh to estimate your household&apos;s CO₂ emissions.
            </Typography>
            <Button
              component={Link}
              href="/EmissionCalc/Electricity"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'warning.main',
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'warning.dark',
                },
              }}
            >
              Calculate Electricity Impact
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              height: 200,
              bgcolor: 'warning.light',
              borderRadius: 2,
              opacity: 0.1,
            }}
          />
        </Paper>
      </Box>
    </Container>
  );
}

export function LearnMorePage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
          Welcome to EcoFootprint
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary', mb: 6, fontSize: 20 }}>
          Your all-in-one platform to track, understand, and reduce your carbon footprint.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mb: 8 }}>
          <Card sx={{ p: 3, textAlign: 'center', borderRadius: 5, boxShadow: 3, minWidth: 220, flex: 1, maxWidth: 300 }}>
            <CardContent>
              <PeopleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>12,500+</Typography>
              <Typography variant="body1" color="text.secondary">Users joined</Typography>
            </CardContent>
          </Card>
          <Card sx={{ p: 3, textAlign: 'center', borderRadius: 5, boxShadow: 3, minWidth: 220, flex: 1, maxWidth: 300 }}>
            <CardContent>
              <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>2,300,000+</Typography>
              <Typography variant="body1" color="text.secondary">kg CO₂ tracked</Typography>
            </CardContent>
          </Card>
          <Card sx={{ p: 3, textAlign: 'center', borderRadius: 5, boxShadow: 3, minWidth: 220, flex: 1, maxWidth: 300 }}>
            <CardContent>
              <CloudIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>8,900+</Typography>
              <Typography variant="body1" color="text.secondary">Air quality checks</Typography>
            </CardContent>
          </Card>
          <Card sx={{ p: 3, textAlign: 'center', borderRadius: 5, boxShadow: 3, minWidth: 220, flex: 1, maxWidth: 300 }}>
            <CardContent>
              <EmojiEventsIcon sx={{ fontSize: 48, color: '#FFD700', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFD700' }}>1,200+</Typography>
              <Typography variant="body1" color="text.secondary">Leaderboard entries</Typography>
            </CardContent>
          </Card>
        </Box>
        <Divider sx={{ my: 6 }} />
        <Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
            Why EcoFootprint?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            EcoFootprint empowers you to make a real difference for the planet. Our mission is to make carbon tracking simple, insightful, and motivating for everyone.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
            <Card sx={{ p: 3, borderRadius: 5, boxShadow: 2, minWidth: 260, flex: 1, maxWidth: 320 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                🌱 Simple & Intuitive
              </Typography>
              <Typography color="text.secondary">
                Log your daily activities, track your emissions, and see your progress with beautiful charts and insights.
              </Typography>
            </Card>
            <Card sx={{ p: 3, borderRadius: 5, boxShadow: 2, minWidth: 260, flex: 1, maxWidth: 320 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                🏆 Friendly Competition
              </Typography>
              <Typography color="text.secondary">
                Join the leaderboard, earn badges, and challenge friends to reduce your collective carbon footprint.
              </Typography>
            </Card>
            <Card sx={{ p: 3, borderRadius: 5, boxShadow: 2, minWidth: 260, flex: 1, maxWidth: 320 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                🌍 Real Impact
              </Typography>
              <Typography color="text.secondary">
                Every small step counts. See your positive impact grow as you make eco-friendly choices every day.
              </Typography>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
