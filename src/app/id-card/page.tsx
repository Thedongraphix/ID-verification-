'use client'

import React, { useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Avatar,
  Chip,
  CircularProgress
} from '@mui/material'
import {
  QrCode2,
  Person,
  School,
  CalendarToday,
  Badge
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useUser } from "@clerk/nextjs";

export default function IDCardPage() {
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()

  // Check if user is authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  // Handle loading state
  if (!isLoaded || !isSignedIn || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  // Mock card info for now - you can replace this with real data from your backend
  const cardInfo = {
    cardNumber: 'KEWI-2024-001',
    issueDate: '2024-01-01',
    expiryDate: '2025-01-01',
    status: 'Active'
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper 
        elevation={3}
        sx={{ 
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
        }}
      >
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                KEWI ID Card
              </Typography>
              <Chip 
                label={cardInfo.status} 
                color={cardInfo.status === 'Active' ? 'success' : 'error'} 
                variant="outlined" 
                size="small"
                sx={{ borderRadius: 2 }}
              />
            </Box>
          </Grid>

          {/* Profile Section */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              >
                {user.firstName?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.emailAddresses[0]?.emailAddress}
              </Typography>
            </Box>
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Student ID
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user.id}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Card Number
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {cardInfo.cardNumber}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Valid Until
                  </Typography>
                  <Typography variant="body1">
                    {cardInfo.expiryDate}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* QR Code Section */}
          <Grid item xs={12}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                mt: 2,
                p: 3,
                bgcolor: 'grey.50',
                borderRadius: 2
              }}
            >
              <QrCode2 sx={{ fontSize: 120, color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary" align="center">
                Scan to verify student identity
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
} 