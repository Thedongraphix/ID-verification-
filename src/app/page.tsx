'use client'

import React from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Stack,
  useTheme
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { 
  School,
  Security,
  Speed,
  QrCode,
  ArrowForward,
  CheckCircle
} from '@mui/icons-material'
import { useUser } from "@clerk/nextjs"
import { SignUpButton } from "@clerk/nextjs"

export default function Home() {
  const router = useRouter()
  const theme = useTheme()
  const { isSignedIn } = useUser()

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard')
    } else {
      router.push('/sign-up')
    }
  }

  const features = [
    {
      icon: <School sx={{ fontSize: 40 }} />,
      title: 'Student Management',
      description: 'Efficiently manage student profiles and academic information'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure ID Cards',
      description: 'Generate and manage secure student identification cards'
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Quick Processing',
      description: 'Fast and automated ID card generation and distribution'
    },
    {
      icon: <QrCode sx={{ fontSize: 40 }} />,
      title: 'QR Verification',
      description: 'Easy verification using QR code technology'
    }
  ]

  const benefits = [
    'Easy student identification and verification',
    'Secure access control for campus facilities',
    'Streamlined attendance tracking',
    'Integration with other campus systems'
  ]

  return (
    <main>
      {/* Hero Section - New Design */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
        }}
      >
        {/* Background gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
            opacity: 0.9,
            zIndex: -1,
          }}
        />
        
        {/* Background pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            zIndex: -1,
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ 
                  fontWeight: 800,
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                The Smarter Way to Manage Student IDs
              </Typography>
              
              <Typography 
                variant="h6" 
                paragraph
                sx={{ 
                  color: 'rgba(255,255,255,0.9)',
                  mb: 4,
                  maxWidth: '90%'
                }}
              >
                KEWI's digital ID card system streamlines identification, verification, and campus access for educational institutions.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  endIcon={<ArrowForward />}
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    fontSize: '1rem',
                    fontWeight: 600,
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)'
                    },
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    borderRadius: 2
                  }}
                >
                  Get Started
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => router.push('/verify')}
                  sx={{ 
                    py: 1.5, 
                    px: 3, 
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    },
                    borderRadius: 2
                  }}
                >
                  Verify ID Card
                </Button>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: 2,
                  ml: { md: 4 }
                }}
              >
                {/* Card preview mockup */}
                <Paper
                  elevation={6}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    transform: 'rotate(-3deg)',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    maxWidth: 380,
                    mx: 'auto'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.5rem'
                      }}
                    >
                      JD
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        John Doe
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Computer Science • Year 3
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ my: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      STUDENT ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      KEWI-2024-1234
                    </Typography>
                  </Box>
                  
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      backgroundColor: 'rgba(0,0,0,0.03)',
                      borderRadius: 2,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <QrCode sx={{ fontSize: 100, color: 'primary.main' }} />
                  </Box>
                </Paper>
                
                {/* Secondary card for visual effect */}
                <Paper
                  elevation={2}
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: { xs: 0, md: 20 },
                    right: { xs: 0, md: 'auto' },
                    width: { xs: 'calc(100% - 40px)', md: 380 },
                    height: '80%',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderRadius: 3,
                    transform: 'rotate(3deg)',
                    zIndex: 1,
                    mx: { xs: 'auto', md: 0 }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Benefits
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Our ID card system offers numerous advantages for educational institutions 
          </Typography>
        </Box>
        
        <Grid container spacing={3} justifyContent="center">
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  height: '100%'
                }}
              >
                <CheckCircle 
                  sx={{ 
                    color: 'primary.main', 
                    mr: 2,
                    fontSize: 28
                  }} 
                />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {benefit}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '1px solid rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2, color: 'primary.main' }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      sx={{ fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: 'auto', justifyContent: 'center', pb: 3 }}>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 8,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: 'white', fontWeight: 700 }}
          >
            Ready to Transform Your ID Card System?
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}
            paragraph
          >
            Join educational institutions worldwide that trust KEWI for their identification needs
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap'
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{ 
                py: 1.5, 
                px: 4, 
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                },
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                borderRadius: 2
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/verify')}
              sx={{ 
                py: 1.5, 
                px: 4, 
                fontSize: '1rem',
                fontWeight: 600,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                },
                borderRadius: 2
              }}
            >
              Verify ID Card
            </Button>
          </Box>
        </Container>
      </Box>
    </main>
  )
}
