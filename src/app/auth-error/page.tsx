'use client';

import React, { useEffect } from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Error as ErrorIcon } from '@mui/icons-material';

export default function AuthErrorPage() {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, textAlign: 'center', border: '1px solid rgba(0,0,0,0.08)' }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              bgcolor: '#ffebee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ErrorIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
          </Box>
        </Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Authentication Error
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Sorry, we encountered an error while processing your authentication. This might be a temporary issue.
          Please try again or contact support if the problem persists.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" onClick={() => router.push('/')} sx={{ px: 4 }}>
            Go to Home
          </Button>
          <Button variant="outlined" onClick={() => router.push('/sign-in')} sx={{ px: 4 }}>
            Try Sign In Again
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 