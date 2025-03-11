'use client'

import React, { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  InputAdornment,
  Divider,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Tabs,
  Tab
} from '@mui/material'
import { QrCodeScanner, Check, Clear, Search, Badge, CropFree, Smartphone } from '@mui/icons-material'
import { QRCodeSVG } from 'qrcode.react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`verification-tabpanel-${index}`}
      aria-labelledby={`verification-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

export default function VerifyPage() {
  const [tabValue, setTabValue] = useState(0)
  const [cardNumber, setCardNumber] = useState('')
  const [studentId, setStudentId] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [verificationResult, setVerificationResult] = useState<null | {
    valid: boolean;
    student?: {
      name: string;
      id: string;
      program: string;
    };
    card?: {
      cardNumber: string;
      issueDate: string;
      expiryDate: string;
    };
    message: string;
  }>(null)
  const [loading, setLoading] = useState(false)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    // Reset verification result when switching tabs
    setVerificationResult(null)
  }

  const handleManualVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    performVerification(cardNumber, studentId)
  }

  const handleQrScan = () => {
    // In a real application, this would use the device camera and QR scanner
    // For demo purposes, we'll simulate scanning with predefined data
    setQrValue('ID:STU-12345,CARD:KEWI-12345')
    setTimeout(() => {
      const parts = qrValue.split(',')
      let id = ''
      let card = ''
      
      parts.forEach(part => {
        if (part.startsWith('ID:')) {
          id = part.replace('ID:', '')
        } else if (part.startsWith('CARD:')) {
          card = part.replace('CARD:', '')
        }
      })
      
      if (id && card) {
        performVerification(card, id)
      }
    }, 2000) // Simulate scanning delay
  }

  const performVerification = (cardNum: string, studentIdentifier: string) => {
    setLoading(true)

    // Simulate verification - replace with actual API call later
    setTimeout(() => {
      // Mock verification result
      if (cardNum === 'KEWI-12345' && studentIdentifier === 'STU-12345') {
        setVerificationResult({
          valid: true,
          student: {
            name: 'John Doe',
            id: studentIdentifier,
            program: 'Computer Science'
          },
          card: {
            cardNumber: cardNum,
            issueDate: '2023-01-01',
            expiryDate: '2027-01-01'
          },
          message: 'ID card is valid'
        })
      } else {
        setVerificationResult({
          valid: false,
          message: 'Invalid card number or student ID'
        })
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 5 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 5, color: 'primary.main' }}
        >
          Verify Student ID Card
        </Typography>

        <Card 
          elevation={0} 
          sx={{ 
            mb: 4,
            borderRadius: 3, 
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.04)'
          }}
        >
          <Box
            sx={{
              p: 3,
              background: 'linear-gradient(90deg, #f1f8fe 0%, #e7f3fc 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Badge color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                ID Card Verification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Verify the authenticity of a KEWI student ID card
              </Typography>
            </Box>
          </Box>
          
          <Box>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              centered
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                }
              }}
            >
              <Tab 
                icon={<Search sx={{ fontSize: 18 }} />} 
                iconPosition="start" 
                label="Manual Entry" 
              />
              <Tab 
                icon={<Smartphone sx={{ fontSize: 18 }} />} 
                iconPosition="start" 
                label="QR Scanner" 
              />
            </Tabs>
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            <TabPanel value={tabValue} index={0}>
              <Box component="form" onSubmit={handleManualVerify}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      placeholder="KEWI-12345"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <QrCodeScanner color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                      placeholder="STU-12345"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={loading}
                      sx={{
                        mt: 1,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 500,
                        borderRadius: 8,
                        textTransform: 'none',
                        boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)'
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Verify ID Card'
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ textAlign: 'center' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    maxWidth: 320,
                    mx: 'auto',
                    mb: 3,
                    border: '2px dashed rgba(0,0,0,0.1)',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  {!qrValue ? (
                    <CropFree sx={{ fontSize: 100, color: 'grey.300', mb: 2 }} />
                  ) : (
                    <Box sx={{ position: 'relative' }}>
                      <QRCodeSVG 
                        value="ID:STU-12345,CARD:KEWI-12345"
                        size={160}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin={false}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'rgba(255,255,255,0.7)'
                        }}
                      >
                        <CircularProgress size={40} />
                      </Box>
                    </Box>
                  )}
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
                    {qrValue ? 'Scanning QR code...' : 'Position the QR code in front of your camera'}
                  </Typography>
                </Paper>
                
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<QrCodeScanner />}
                  onClick={handleQrScan}
                  disabled={loading || !!qrValue}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1rem',
                    fontWeight: 500,
                    borderRadius: 8,
                    textTransform: 'none',
                    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)'
                  }}
                >
                  {qrValue ? 'Scanning...' : 'Start Scanning'}
                </Button>
                
                <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 2 }}>
                  For demo purposes, this will simulate scanning a QR code
                </Typography>
              </Box>
            </TabPanel>
          </CardContent>
        </Card>

        {verificationResult && (
          <Box sx={{ mt: 4 }}>
            <Alert
              severity={verificationResult.valid ? 'success' : 'error'}
              icon={verificationResult.valid ? <Check /> : <Clear />}
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                py: 1.5,
                fontSize: '1rem'
              }}
            >
              {verificationResult.message}
            </Alert>

            {verificationResult.valid && verificationResult.student && verificationResult.card && (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.04)'
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      Student Information
                    </Typography>
                    <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)', p: 3, borderRadius: 2 }}>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Name:</strong> {verificationResult.student.name}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>ID:</strong> {verificationResult.student.id}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Program:</strong> {verificationResult.student.program}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      Card Information
                    </Typography>
                    <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)', p: 3, borderRadius: 2 }}>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Card Number:</strong> {verificationResult.card.cardNumber}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Issue Date:</strong> {verificationResult.card.issueDate}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Expiry Date:</strong> {verificationResult.card.expiryDate}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Box>
        )}
      </Box>
    </Container>
  )
} 