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
  CardActions
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { 
  School,
  Security,
  Speed,
  QrCode
} from '@mui/icons-material'

export default function Home() {
  const router = useRouter()

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

  return (
    <main>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                KEWI Smart ID Card System
              </Typography>
              <Typography variant="h5" paragraph>
                Streamline your student identification process with our modern and efficient system
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => router.push('/login')}
                  sx={{ mr: 2 }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => router.push('/register')}
                >
                  Register
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 1,
                    p: 4,
                    bgcolor: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px dashed rgba(0,0,0,0.1)',
                  }}
                >
                  <Box
                    component="img"
                    src="/globe.svg"
                    alt="KEWI ID Card"
                    sx={{
                      width: '60%',
                      height: 'auto',
                      mb: 4
                    }}
                  />
                  <Typography 
                    variant="h6" 
                    color="primary.main" 
                    sx={{ fontWeight: 600, textAlign: 'center' }}
                  >
                    Modern Student ID Card
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ textAlign: 'center', mt: 1 }}
                  >
                    Secure • Digital • Easy to verify
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center'
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
                <CardActions sx={{ mt: 'auto', justifyContent: 'center' }}>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: 'grey.100',
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            paragraph
          >
            Join our modern ID card management system and streamline your student identification process
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 4
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push('/register')}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => router.push('/verify')}
            >
              Verify ID Card
            </Button>
          </Box>
        </Container>
      </Box>
    </main>
  )
}
