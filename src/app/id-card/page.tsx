'use client'

import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material'
import { 
  ArrowBack,
  QrCode2,
  School,
  Person,
  Badge,
  Download
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { QRCodeSVG } from 'qrcode.react'

export default function DigitalIDCardPage() {
  const router = useRouter()
  const { user, cardInfo, isAuthenticated } = useAuth()
  
  // Generate QR code value - this would typically be encrypted data in a real app
  const qrCodeValue = user ? `ID:${user.id},CARD:${cardInfo?.cardNumber}` : ''

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
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/dashboard')}
          sx={{ mb: 4 }}
        >
          Back to Dashboard
        </Button>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Watermark */}
          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              transform: 'rotate(-45deg)',
              opacity: 0.03,
              fontSize: '15rem',
              top: '50%',
              left: '50%',
              marginTop: '-8rem',
              marginLeft: '-25rem',
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          >
            KEWI ID
          </Typography>
          
          <Grid container spacing={4}>
            {/* Card Header */}
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Badge sx={{ fontSize: 32, color: 'primary.main' }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    KEWI STUDENT ID CARD
                  </Typography>
                </Box>
                <Chip 
                  label={cardInfo.status} 
                  color={cardInfo.status === 'Active' ? 'success' : 'error'} 
                  size="small"
                  sx={{ borderRadius: 2 }}
                />
              </Box>
              <Divider />
            </Grid>
            
            {/* Student Details */}
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar 
                    sx={{ 
                      width: 100, 
                      height: 100,
                      bgcolor: 'primary.main',
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {user.firstName.charAt(0)}
                  </Avatar>
                  
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person fontSize="small" color="primary" />
                        {user.id}
                      </Typography>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <School fontSize="small" color="primary" />
                        {user.program}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: 'rgba(0,0,0,0.02)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: 2
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      CARD DETAILS
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          CARD NUMBER
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {cardInfo.cardNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          ISSUE DATE
                        </Typography>
                        <Typography variant="body2">
                          {cardInfo.issueDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          EXPIRY DATE
                        </Typography>
                        <Typography variant="body2">
                          {cardInfo.expiryDate}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            
            {/* QR Code */}
            <Grid item xs={12} md={5}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'center'
                }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                    mb: 2,
                    width: '100%',
                    maxWidth: 240,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    SCAN TO VERIFY
                  </Typography>
                  
                  <Box 
                    sx={{
                      my: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%'
                    }}
                  >
                    <QRCodeSVG 
                      value={qrCodeValue}
                      size={200}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                      includeMargin={false}
                    />
                  </Box>
                  
                  <Typography 
                    variant="caption" 
                    align="center" 
                    color="text.secondary"
                  >
                    Scan this QR code to verify this ID card&apos;s authenticity
                  </Typography>
                </Paper>
                
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  fullWidth
                  sx={{
                    mt: 2,
                    borderRadius: 8,
                    py: 1.5
                  }}
                >
                  Download ID Card
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
} 