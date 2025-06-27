'use client';

import { Container, Typography, Card, CardContent, Button, Box, Stack, Divider } from '@mui/material';
import { EmojiNature, Insights, Group } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const MotionBox = motion(Box);

export default function LearnMorePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      {/* Header */}
      <MotionBox initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }} textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Learn More About EcoFootprint
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Track your carbon footprint, understand your impact, and take steps toward a greener future.
        </Typography>
      </MotionBox>

      {/* Stats Section */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        mb={8}
      >
        {[ 
          { icon: <Group color="primary" sx={{ fontSize: 40 }} />, label: 'Users Joined', value: '100+' },
          { icon: <Insights color="secondary" sx={{ fontSize: 40 }} />, label: 'Tonnes of CO₂ Calculated', value: 'Multiple' },
          { icon: <EmojiNature color="success" sx={{ fontSize: 40 }} />, label: 'Eco Goals Achieved', value: '200' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card sx={{ width: 250, textAlign: 'center', boxShadow: 3, borderRadius: 3 }}>
              <CardContent>
                {stat.icon}
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Stack>

      {/* Why Section */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="center"
        gap={6}
        mb={10}
      >
        <MotionBox
          flex={1}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Why EcoFootprint?
          </Typography>
          <Typography variant="body1" mb={2}>
            EcoFootprint is a personal sustainability tracker that helps you log daily activities,
            calculate carbon emissions, and receive actionable eco-tips. Whether you're commuting,
            eating out, or shopping, your carbon impact is calculated in real time.
          </Typography>
          <Typography variant="body1" mb={2}>
            With a user-friendly dashboard, interactive charts, and community challenges, staying
            eco-conscious has never been easier. Start small, make a big difference.
          </Typography>
          <Button variant="contained" color="primary" href="/dashboard">
            Start Tracking
          </Button>
        </MotionBox>

        <MotionBox
          flex={1}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Image
            src="/learnMore.jpg"
            alt="Eco illustration"
            width={800}
            height={500}
            style={{ width: '100%', borderRadius: '12px', height: 'auto' }}
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </MotionBox>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 6 }} />

      {/* About Us Section */}
      <MotionBox initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          About Us
        </Typography>
        <Typography variant="body1" maxWidth="md" mx="auto" textAlign="center" color="text.secondary">
          EcoFootprint was founded by a passionate team of developers, designers, and climate advocates who believe
          that individual actions can lead to collective impact. Our mission is to empower people with tools that
          make it easy to live sustainably. Through technology, education, and community, we aim to inspire
          environmental responsibility in everyday life.
        </Typography>
      </MotionBox>
    </Container>
  );
}
