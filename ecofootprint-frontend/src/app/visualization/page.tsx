'use client';

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
  ChartOptions
} from 'chart.js';
import { Container, Typography, Paper } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EmissionLog {
  date: string;
  emission: number;
}

interface ChartConfig {
  yAxisMax: number;
  yAxisStep: number;
}

export default function VisualizationPage() {
  const [data, setData] = useState<EmissionLog[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({ yAxisMax: 100, yAxisStep: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const now = new Date();
    now.setDate(1);
    return now;
  });
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    async function fetchEmissionData() {
      if (!startDate || !endDate) {
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        const startDateISO = new Date(startDate);
        startDateISO.setHours(0, 0, 0, 0);
        const endDateISO = new Date(endDate);
        endDateISO.setHours(23, 59, 59, 999);

        const response = await fetch(`http://localhost:5000/api/emission-log/chart-data/${userId}?startDate=${startDateISO.toISOString()}&endDate=${endDateISO.toISOString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch emission data');
        }
        const json = await response.json();
        if (!json.success) {
          throw new Error(json.error || 'Failed to fetch emission data');
        }
        setData(json.data);
        if (json.chartConfig) {
          setChartConfig(json.chartConfig);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchEmissionData();
  }, [startDate, endDate]);

  // Prepare chart data
  const chartData = {
    labels: data.map((log) => log.date),
    datasets: [
      {
        label: 'CO2 Emission (kg)',
        data: data.map((log) => log.emission),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'CO2 Emissions Over Time',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'line'>) {
            return `Emission: ${context.parsed.y.toFixed(2)} kg CO2`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            weight: 'bold' as const
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'CO2 Emission (kg)',
          font: {
            weight: 'bold' as const
          }
        },
        beginAtZero: true,
        max: chartConfig.yAxisMax,
        ticks: {
          stepSize: chartConfig.yAxisStep,
          callback: function(tickValue: string | number) {
            return tickValue + ' kg';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Emission Visualization
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue: Date | null) => setStartDate(newValue)}
            slotProps={{
              day: {
                sx: {
                  backgroundColor: '#fff !important',
                  color: '#222 !important',
                  '&.Mui-selected': {
                    backgroundColor: '#2e7d32 !important',
                    color: '#fff !important',
                  },
                  '&:hover': {
                    backgroundColor: '#f5f5f5 !important',
                  },
                }
              },
              textField: { fullWidth: true, sx: { mb: 3 } }
            }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue: Date | null) => setEndDate(newValue)}
            slotProps={{
              day: {
                sx: {
                  backgroundColor: '#fff !important',
                  color: '#222 !important',
                  '&.Mui-selected': {
                    backgroundColor: '#2e7d32 !important',
                    color: '#fff !important',
                  },
                  '&:hover': {
                    backgroundColor: '#f5f5f5 !important',
                  },
                }
              },
              textField: { fullWidth: true, sx: { mb: 3 } }
            }}
          />
        </LocalizationProvider>
        {loading && <Typography>Loading data...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && data.length > 0 && <Line data={chartData} options={options} />}
        {!loading && !error && data.length === 0 && <Typography>No emission data available.</Typography>}
      </Paper>
    </Container>
  );
}
