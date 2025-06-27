import './globals.css';
import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { Inter } from 'next/font/google';
import ThemeRegistry from './ThemeRegistry';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EcoFootprint',
  description: 'EcoFootprint Application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <Navbar />
          <Box sx={{ pt: '64px' }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
