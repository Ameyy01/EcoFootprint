'use client';

import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Cloud } from 'lucide-react';

interface Pollutants {
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  o3: number;
  co: number;
}

interface AQIData {
  aqi: number;
  city: string;
  state: string;
  country: string;
  timestamp: string;
  station: string;
  pollutants: Pollutants;
}

export default function AQIPage() {
  const [location, setLocation] = useState('');
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#00E400'; // Good
    if (aqi <= 100) return '#FFFF00'; // Satisfactory
    if (aqi <= 200) return '#FF7E00'; // Moderate
    if (aqi <= 300) return '#FF0000'; // Poor
    if (aqi <= 400) return '#99004C'; // Very Poor
    return '#7E0023'; // Severe
  };

  const getAQIDescription = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Satisfactory';
    if (aqi <= 200) return 'Moderate';
    if (aqi <= 300) return 'Poor';
    if (aqi <= 400) return 'Very Poor';
    return 'Severe';
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/aqi?location=${encodeURIComponent(location)}`);
      const data = await response.json();
      
      if (response.ok) {
        setAqiData(data);
      } else {
        setError(data.error || 'Failed to fetch AQI data');
      }
    } catch (err) {
      setError(`Failed to fetch AQI data: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f5f7fa',
        py: 8,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 4, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 900, mx: 'auto' }}>
          <Cloud size={56} color="#43a047" style={{ filter: 'drop-shadow(0 4px 12px #43a04733)' }} />
          <Typography variant="h3" component="h1" sx={{ mt: 2, mb: 1.5, fontWeight: 700, letterSpacing: 0.5, color: '#2e7d32' }}>
            Air Quality Index
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
            Check the current air quality in your area
          </Typography>
        </Box>

        <Paper
          elevation={2}
          sx={{
            maxWidth: 700,
            mx: 'auto',
            mb: 5,
            p: 2.5,
            borderRadius: 3,
            background: '#fff',
            boxShadow: '0 2px 12px 0 rgba(67, 160, 71, 0.07)',
            display: 'flex',
            gap: 1.5,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
          }}
        >
          <TextField
            fullWidth
            label="Enter city name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            variant="outlined"
            sx={{
              bgcolor: '#f8fafc',
              borderRadius: 2,
              boxShadow: 'none',
            }}
            InputProps={{
              style: { fontWeight: 500, fontSize: 17 },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleSearch}
            disabled={loading || !location}
            sx={{
              height: { xs: '44px', sm: '48px' },
              fontWeight: 600,
              fontSize: 17,
              px: 3,
              boxShadow: '0 2px 8px 0 #43a04722',
              backgroundColor: '#2e7d32',
              color: 'white',
              borderRadius: 2,
              transition: 'transform 0.18s',
              '&:hover': {
                transform: 'scale(1.03)',
                backgroundColor: '#27642a',
              },
            }}
          >
            {loading ? 'Loading...' : 'Search'}
          </Button>
        </Paper>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 4, fontWeight: 600 }}>
            {error}
          </Typography>
        )}

        {aqiData && (
          <Box>
            <Paper
              elevation={2}
              sx={{
                maxWidth: 700,
                mx: 'auto',
                mb: 4,
                borderRadius: 3,
                background: '#fff',
                boxShadow: '0 2px 12px 0 rgba(67, 160, 71, 0.09)',
                p: 3,
                overflow: 'visible',
              }}
            >
              <Box sx={{ textAlign: 'center', position: 'relative', mb: 2 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 110,
                    height: 110,
                    borderRadius: '50%',
                    background: '#f8fafc',
                    boxShadow: '0 0 0 6px #a5d6a733',
                    mx: 'auto',
                    mb: 2,
                    border: `3px solid ${getAQIColor(aqiData.aqi)}`,
                    transition: 'background 0.3s',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: getAQIColor(aqiData.aqi),
                      fontWeight: 800,
                      fontSize: 40,
                      letterSpacing: 1.5,
                      textShadow: `0 2px 8px #388e3c22`,
                    }}
                  >
                    {aqiData.aqi}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: getAQIColor(aqiData.aqi),
                    mb: 1,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}
                >
                  {getAQIDescription(aqiData.aqi)}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {aqiData.city}, {aqiData.state}, {aqiData.country}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Station: {aqiData.station}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Last updated: {new Date(aqiData.timestamp).toLocaleString()}
                </Typography>
              </Box>
            </Paper>

            <Paper
              elevation={1}
              sx={{
                maxWidth: 900,
                mx: 'auto',
                borderRadius: 3,
                background: '#fff',
                boxShadow: '0 1px 6px 0 #a5d6a733',
                p: 2.5,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, letterSpacing: 0.5, color: '#2e7d32' }}>
                Pollutant Details
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', background: '#f8fafc' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, fontSize: 15, color: '#388e3c', background: '#f8fafc' }}>Pollutant</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, fontSize: 15, color: '#388e3c', background: '#f8fafc' }}>Value (µg/m³)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>PM2.5</TableCell>
                      <TableCell align="right">{aqiData.pollutants.pm25}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PM10</TableCell>
                      <TableCell align="right">{aqiData.pollutants.pm10}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>NO2</TableCell>
                      <TableCell align="right">{aqiData.pollutants.no2}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SO2</TableCell>
                      <TableCell align="right">{aqiData.pollutants.so2}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>O3</TableCell>
                      <TableCell align="right">{aqiData.pollutants.o3}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CO</TableCell>
                      <TableCell align="right">{aqiData.pollutants.co}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
} 