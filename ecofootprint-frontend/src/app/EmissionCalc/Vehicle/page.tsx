'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function VehicleEmissionPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      router.push('/login');
      return;
    }
    setUserId(storedUserId);
  }, [router]);

  const [formData, setFormData] = useState({
    userName: '',
    vehicleName: '',
    vehicleType: '',
    vehicleCategory: '',
    fuelEfficiency: '',
    distance: '',
  });

  const [emission, setEmission] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmission(null);

    if (!userId) {
      setError('Please log in to calculate emissions');
      return;
    }

    try {
      console.log('Submitting form data:', {
        userId,
        userName: formData.userName,
        vehicleName: formData.vehicleName,
        vehicleType: formData.vehicleType,
        vehicleCategory: formData.vehicleCategory,
        fuelEfficiency: Number(formData.fuelEfficiency),
        distance: Number(formData.distance),
      });

      const res = await fetch('http://localhost:5000/api/emission-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          userName: formData.userName,
          vehicleName: formData.vehicleName,
          vehicleType: formData.vehicleType,
          vehicleCategory: formData.vehicleCategory,
          fuelEfficiency: Number(formData.fuelEfficiency),
          distance: Number(formData.distance),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to calculate emissions');
      }

      const data = await res.json();
      console.log('Server response:', data);
      setEmission(data.emission);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Error calculating emissions. Please try again.');
    }
  };

  if (!userId) {
    return null; // Don't render the form if user is not logged in
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Vehicle Emission Calculator
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {emission !== null && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="h6">
              Calculated Emission: {emission.toFixed(2)} kg CO₂
            </Typography>
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <TextField
                fullWidth
                label="User Name"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Vehicle Name/Model"
                type="text"
                name="vehicleName"
                value={formData.vehicleName}
                onChange={handleChange}
                required
              />
            </Box>

            <Box>
              <FormControl fullWidth required>
                <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
                <Select
                  labelId="vehicle-type-label"
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  label="Vehicle Type"
                  onChange={handleChange}
                >
                  <MenuItem value="2 Wheeler">2 Wheeler</MenuItem>
                  <MenuItem value="Car">Car</MenuItem>
                  <MenuItem value="Bus">Bus</MenuItem>
                  <MenuItem value="Auto-rickshaw">Auto-rickshaw</MenuItem>
                  <MenuItem value="Truck">Truck</MenuItem>
                  <MenuItem value="Van">Van</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <FormControl fullWidth required>
                <InputLabel id="vehicle-category-label">Fuel Type</InputLabel>
                <Select
                  labelId="vehicle-category-label"
                  id="vehicleCategory"
                  name="vehicleCategory"
                  value={formData.vehicleCategory}
                  label="Fuel Type"
                  onChange={handleChange}
                >
                  <MenuItem value="Petrol">Petrol</MenuItem>
                  <MenuItem value="Diesel">Diesel</MenuItem>
                  <MenuItem value="CNG">CNG</MenuItem>
                  <MenuItem value="Electric">Electric Vehicle (EV)</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Fuel Efficiency (km/l or km/kWh)"
                type="number"
                name="fuelEfficiency"
                value={formData.fuelEfficiency}
                onChange={handleChange}
                required
                inputProps={{ min: 0, step: 'any' }}
                helperText="Enter your vehicle's fuel efficiency"
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Distance Travelled (km)"
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                required
                inputProps={{ min: 0, step: 'any' }}
                helperText="Enter the distance you traveled"
              />
            </Box>

            <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' }, display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  minWidth: 200,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Calculate Emissions
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
