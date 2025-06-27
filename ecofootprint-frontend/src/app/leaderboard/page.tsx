"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { TooltipItem } from 'chart.js';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface LeaderboardUser {
  userId: string;
  name: string;
  totalEmissionKg: number;
}

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((res) => {
        setData(res.leaderboard || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load leaderboard");
        setLoading(false);
      });
  }, []);

  const palette = [
    '#FFD700', // Gold for 1st
    '#C0C0C0', // Silver for 2nd
    '#CD7F32', // Bronze for 3rd
    '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0'
  ];

  const chartData = {
    labels: data.map((u) => u.name),
    datasets: [
      {
        label: "CO₂ Emissions (kg)",
        data: data.map((u) => u.totalEmissionKg),
        backgroundColor: data.map((_, i) => palette[i] || palette[palette.length - 1]),
        borderRadius: 12,
        barThickness: 32,
        maxBarThickness: 40,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'bar'>) => `CO₂: ${ctx.parsed.x} kg`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "#e3f2fd" },
        title: {
          display: true,
          text: "CO₂ Emissions (kg)",
          color: "#1976d2",
        },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#1976d2" },
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 4, fontWeight: 800, color: "#1976d2", letterSpacing: 1 }}
        >
          User Leaderboard
        </Typography>
        <Typography align="center" sx={{ mb: 6, color: "#1976d2" }}>
          Top 10 users with the lowest total CO₂ emissions
        </Typography>
        <Card
          sx={{
            maxWidth: 1100,
            mx: "auto",
            borderRadius: 5,
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.10)",
            p: 3,
          }}
        >
          <CardContent>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : error ? (
              <Typography color="error" align="center">
                {error}
              </Typography>
            ) : data.length === 0 ? (
              <Typography align="center" color="text.secondary">
                No leaderboard data available.
              </Typography>
            ) : (
              <>
                <Bar data={chartData} options={chartOptions} height={400} />
                <Box sx={{ mt: 6 }}>
                  <Stack spacing={2}>
                    {data.map((user, idx) => (
                      <Paper
                        key={user.userId}
                        elevation={idx === 0 ? 6 : 2}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          px: 3,
                          py: 2,
                          borderRadius: 3,
                          background: idx === 0 ? 'linear-gradient(90deg, #fffbe7 0%, #fffde4 100%)' : '#f5fafd',
                          border: idx === 0 ? '2px solid #FFD700' : '1px solid #e3f2fd',
                          boxShadow: idx === 0 ? '0 4px 24px 0 rgba(255, 215, 0, 0.10)' : undefined,
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: palette[idx] || palette[palette.length - 1],
                            color: idx < 3 ? '#fff' : '#1976d2',
                            width: 44,
                            height: 44,
                            fontWeight: 700,
                            fontSize: 22,
                            mr: 2,
                          }}
                        >
                          {idx === 0 ? <EmojiEventsIcon sx={{ color: '#FFD700', fontSize: 32 }} /> : idx + 1}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: idx === 0 ? '#FFD700' : '#1976d2' }}>
                            {user.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.totalEmissionKg} kg CO₂
                          </Typography>
                        </Box>
                        {idx === 0 && (
                          <Typography variant="subtitle1" sx={{ color: '#FFD700', fontWeight: 700, ml: 2 }}>
                            #1
                          </Typography>
                        )}
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
} 