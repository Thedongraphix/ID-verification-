'use client'

import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Person,
  QrCode2,
  ExitToApp,
  Login,
  PersonAdd
} from '@mui/icons-material'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { isSignedIn, user } = useUser()
  
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  
  const navigateTo = (path: string) => {
    router.push(path)
    setMobileOpen(false)
    handleCloseMenu()
  }

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
          KEWI ID
        </Typography>
      </Box>
      <List>
        <ListItemButton
          onClick={() => navigateTo('/')} 
          selected={pathname === '/'}
          sx={{ 
            mx: 1, 
            borderRadius: 2,
            mb: 0.5,
            '&.Mui-selected': {
              bgcolor: 'primary.light',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white'
              }
            }
          }}
        >
          <ListItemIcon>
            <QrCode2 />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        
        <ListItemButton
          onClick={() => navigateTo('/verify')} 
          selected={pathname === '/verify'}
          sx={{ 
            mx: 1, 
            borderRadius: 2,
            mb: 0.5,
            '&.Mui-selected': {
              bgcolor: 'primary.light',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white'
              }
            }
          }}
        >
          <ListItemIcon>
            <QrCode2 />
          </ListItemIcon>
          <ListItemText primary="Verify ID" />
        </ListItemButton>
        
        {isSignedIn ? (
          <>
            <ListItemButton
              onClick={() => navigateTo('/dashboard')} 
              selected={pathname === '/dashboard'}
              sx={{ 
                mx: 1, 
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                }
              }}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton
              onClick={() => navigateTo('/sign-in')} 
              selected={pathname === '/sign-in'}
              sx={{ 
                mx: 1, 
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                }
              }}
            >
              <ListItemIcon>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigateTo('/sign-up')} 
              selected={pathname === '/sign-up'}
              sx={{ 
                mx: 1, 
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white'
                  }
                }
              }}
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  )

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ height: 70, px: { xs: 1, sm: 2 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h5"
            component="div"
            onClick={() => router.push('/')}
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              cursor: 'pointer',
              flexGrow: 1
            }}
          >
            KEWI ID
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                color="inherit"
                onClick={() => navigateTo('/')}
                sx={{ 
                  color: pathname === '/' ? 'primary.main' : 'text.primary',
                  fontWeight: pathname === '/' ? 600 : 400
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => navigateTo('/verify')}
                sx={{ 
                  color: pathname === '/verify' ? 'primary.main' : 'text.primary',
                  fontWeight: pathname === '/verify' ? 600 : 400
                }}
              >
                Verify ID
              </Button>
              {isSignedIn ? (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigateTo('/dashboard')}
                    sx={{ 
                      color: pathname === '/dashboard' ? 'primary.main' : 'text.primary',
                      fontWeight: pathname === '/dashboard' ? 600 : 400
                    }}
                  >
                    Dashboard
                  </Button>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button
                      color="inherit"
                      sx={{ 
                        color: pathname === '/sign-in' ? 'primary.main' : 'text.primary',
                        fontWeight: pathname === '/sign-in' ? 600 : 400
                      }}
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <Button
                    variant="contained"
                    onClick={() => navigateTo('/sign-up')}
                    sx={{ 
                      fontWeight: 600,
                      textTransform: 'none'
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            borderRight: 'none',
            boxShadow: '0 0 20px rgba(0,0,0,0.05)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
} 