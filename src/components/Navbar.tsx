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
import { useAuth } from '@/contexts/AuthContext'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { user, isAuthenticated, logout } = useAuth()
  
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
  
  const handleLogout = () => {
    logout()
    router.push('/')
    handleCloseMenu()
    setMobileOpen(false)
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
        <ListItem 
          button 
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
        </ListItem>
        
        <ListItem 
          button 
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
        </ListItem>
        
        {isAuthenticated ? (
          <>
            <ListItem 
              button 
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
            </ListItem>
            <ListItem 
              button 
              onClick={handleLogout} 
              sx={{ 
                mx: 1, 
                borderRadius: 2,
                color: 'error.main',
                '& .MuiListItemIcon-root': {
                  color: 'error.main'
                }
              }}
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem 
              button 
              onClick={() => navigateTo('/login')} 
              selected={pathname === '/login'}
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
            </ListItem>
            <ListItem 
              button 
              onClick={() => navigateTo('/register')} 
              selected={pathname === '/register'}
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
            </ListItem>
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
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 4 }
            }}
          >
            KEWI ID
          </Typography>
          
          {!isMobile && (
            <>
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Link href="/verify" style={{ textDecoration: 'none' }}>
                  <Button
                    color="inherit"
                    sx={{ 
                      mx: 1,
                      fontWeight: pathname === '/verify' ? 600 : 400,
                      color: pathname === '/verify' ? 'primary.main' : 'inherit'
                    }}
                  >
                    Verify ID
                  </Button>
                </Link>
                
                {isAuthenticated && (
                  <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button
                      color="inherit"
                      sx={{ 
                        mx: 1,
                        fontWeight: pathname === '/dashboard' ? 600 : 400,
                        color: pathname === '/dashboard' ? 'primary.main' : 'inherit'
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}
              </Box>
              
              <Box>
                {isAuthenticated ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleLogout}
                      startIcon={<ExitToApp />}
                      sx={{ 
                        ml: 2,
                        borderRadius: 8,
                        fontWeight: 500
                      }}
                    >
                      Sign Out
                    </Button>
                    
                    <Tooltip title="Account">
                      <IconButton 
                        onClick={handleMenu} 
                        sx={{ ml: 2 }}
                      >
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40,
                            bgcolor: 'primary.main',
                            fontWeight: 'bold'
                          }}
                        >
                          {user?.firstName?.charAt(0) || 'U'}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      PaperProps={{
                        elevation: 2,
                        sx: { 
                          mt: 1.5, 
                          borderRadius: 2,
                          minWidth: 180
                        }
                      }}
                    >
                      <MenuItem onClick={() => navigateTo('/id-card')}>
                        <ListItemIcon>
                          <QrCode2 fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>View ID Card</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => navigateTo('/profile')}>
                        <ListItemIcon>
                          <Person fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <ExitToApp fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'error.main' }}>Sign Out</ListItemText>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      color="inherit"
                      onClick={() => router.push('/login')}
                      sx={{ fontWeight: 500 }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => router.push('/register')}
                      sx={{ 
                        borderRadius: 8,
                        px: 3
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
} 