'use client'

import React, { useEffect } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  CircularProgress
} from '@mui/material'
import {
  Badge,
  QrCode2,
  Person,
  School,
  Info
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
  const router = useRouter()
  const { user, cardInfo, isAuthenticated } = useAuth()

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Handle loading state
  if (!isAuthenticated || !user || !cardInfo) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Card */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 3,
              background: 'linear-gradient(90deg, #f0f8ff 0%, #e1ebf5 100%)',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.04)'
            }}
          >
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              {user.firstName.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Welcome, {user.firstName} {user.lastName}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Chip
                  icon={<Person />}
                  label={`ID: ${user.id}`}
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                />
                <Chip
                  icon={<School />}
                  label={`Program: ${user.program}`}
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* ID Card Info */}
        <Grid item xs={12} md={7} lg={8}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.04)'
            }}
          >
            <Box
              sx={{
                p: 3,
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge color="primary" /> ID Card Information
              </Typography>
              <Chip 
                label={cardInfo.status} 
                color={cardInfo.status === 'Active' ? 'success' : 'error'} 
                variant="outlined" 
                size="small"
                sx={{ borderRadius: 2 }}
              />
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', display: 'block', mb: 0.5 }}>
                      CARD NUMBER
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {cardInfo.cardNumber}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', display: 'block', mb: 0.5 }}>
                      ISSUE DATE
                    </Typography>
                    <Typography variant="body1">
                      {cardInfo.issueDate}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', display: 'block', mb: 0.5 }}>
                      EXPIRY DATE
                    </Typography>
                    <Typography variant="body1">
                      {cardInfo.expiryDate}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      mt: 2
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<QrCode2 />}
                      onClick={() => router.push('/id-card')}
                      sx={{
                        borderRadius: 8,
                        textTransform: 'none',
                        px: 4,
                        py: 1.5
                      }}
                    >
                      View Digital ID Card
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Quick Actions */}
        <Grid item xs={12} md={5} lg={4}>
          <Card 
            elevation={0} 
            sx={{ 
              height: '100%',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.04)'
            }}
          >
            <Box
              sx={{
                p: 3,
                borderBottom: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Person />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    py: 1.5,
                    bgcolor: 'primary.light',
                    '&:hover': {
                      bgcolor: 'primary.main'
                    }
                  }}
                >
                  Update Profile
                </Button>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Info />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    py: 1.5,
                    bgcolor: '#ff9800',
                    '&:hover': {
                      bgcolor: '#e68a00'
                    }
                  }}
                >
                  Report Lost Card
                </Button>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<QrCode2 />}
                  onClick={() => router.push('/verify')}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    py: 1.5,
                    bgcolor: '#009688',
                    '&:hover': {
                      bgcolor: '#00796b'
                    }
                  }}
                >
                  Verify ID Card
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
} 