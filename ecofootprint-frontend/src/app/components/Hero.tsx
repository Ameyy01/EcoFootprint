'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import RotatingEarth from './RotatingEarth';

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'center',
        px: { xs: 0, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            minHeight: 600,
          }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, px: { xs: 2, md: 0 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.8rem', md: '4.2rem' },
                fontWeight: 800,
                color: '#0b0c10',
                mb: 3,
                letterSpacing: 1.5,
                lineHeight: 1.1,
              }}
            >
              Track Your Carbon Footprint
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 5,
                maxWidth: '600px',
                mx: { xs: 'auto', md: 0 },
                fontWeight: 400,
                fontSize: { xs: '1.1rem', md: '1.35rem' },
                letterSpacing: 0.2,
              }}
            >
              Make a positive impact on the environment by understanding and reducing your carbon emissions.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Button
                component={Link}
                href="/EmissionCalc"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'primary.main',
                  color: '#fff',
                  fontWeight: 700,
                  borderRadius: 999,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 24px 0 rgba(67, 160, 71, 0.10)',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    color: '#fff',
                  },
                }}
              >
                Calculate Now
              </Button>
              <Button
                component={Link}
                href="/components/LearnMore"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  fontWeight: 700,
                  borderRadius: 999,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    bgcolor: 'primary.main',
                    color: '#fff',
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: { xs: '100%', md: 520 },
              minHeight: { xs: 320, md: 600 },
            }}
          >
            <RotatingEarth size={420} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
