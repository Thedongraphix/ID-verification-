'use client'

import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Drawer,
  useMediaQuery,
  useTheme
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  QrCode2,
  Login,
  PersonAdd
} from '@mui/icons-material'
import { useRouter, usePathname } from 'next/navigation'
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { isSignedIn } = useUser()
  
  const [mobileOpen, setMobileOpen] = useState(false)
  
  // Fix Clerk modal positioning when it's rendered
  useEffect(() => {
    const fixClerkModal = () => {
      // Find all Clerk popover cards and set their position
      const clerkPopovers = document.querySelectorAll('.cl-userButtonPopoverCard');
      clerkPopovers.forEach(popover => {
        if (popover instanceof HTMLElement) {
          popover.style.position = 'absolute';
          popover.style.top = '100%';
          popover.style.right = '0';
          popover.style.transform = 'translateY(8px)';
          popover.style.zIndex = '9999';
          
          // For mobile devices
          if (window.innerWidth < 600) {
            popover.style.position = 'fixed';
            popover.style.bottom = '20px';
            popover.style.left = '20px';
            popover.style.width = 'calc(100% - 40px)';
            popover.style.maxWidth = '400px';
            popover.style.top = 'auto';
          }
        }
      });
    };

    // Run initially and set an observer for dynamic changes
    fixClerkModal();
    
    // Create MutationObserver to watch for Clerk modal being added to DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const addedNodes = Array.from(mutation.addedNodes);
          for (const node of addedNodes) {
            if (node instanceof HTMLElement && 
                (node.classList.contains('cl-userButtonPopoverCard') || 
                 node.querySelector('.cl-userButtonPopoverCard'))) {
              fixClerkModal();
            }
          }
        }
      });
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Clean up the observer when component unmounts
    return () => observer.disconnect();
  }, []);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  
  const navigateTo = (path: string) => {
    router.push(path)
    setMobileOpen(false)
  }

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/', icon: <QrCode2 /> },
    { name: 'Verify ID', path: '/verify', icon: <QrCode2 /> },
    ...(isSignedIn ? [{ name: 'Dashboard', path: '/dashboard', icon: <Dashboard /> }] : [])
  ]

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250, pt: 3, px: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', textAlign: 'center', mb: 3 }}>
        KEWI ID
      </Typography>

      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.name}
            onClick={() => navigateTo(item.path)}
            selected={pathname === item.path}
            sx={{ 
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                color: 'white',
                '& .MuiListItemIcon-root': { color: 'white' }
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
        
        {isSignedIn ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 3
          }}>
            <Box className="clerk-user-wrapper" sx={{ position: 'relative',  }}>
              <UserButton 
              
                afterSignOutUrl="/" 
                appearance={{
                  elements: {
                    userButtonAvatarBox: { 
                      width: '40px', 
                      height: '40px',
                      margin: 0,
                    }
                  }
                }}
              />
            </Box>
          </Box>
        ) : (
          <>
            <SignInButton mode="modal">
              <ListItemButton
                sx={{ 
                  borderRadius: 2,
                  mb: 1
                }}
              >
                <ListItemIcon><Login /></ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </SignInButton>
            <SignUpButton mode="modal">
              <ListItemButton
                sx={{ 
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                  '& .MuiListItemIcon-root': { color: 'white' }
                }}
              >
                <ListItemIcon><PersonAdd /></ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </SignUpButton>
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

          {/* Desktop navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  color="inherit"
                  onClick={() => navigateTo(item.path)}
                  sx={{ 
                    color: pathname === item.path ? 'primary.main' : 'text.primary',
                    fontWeight: pathname === item.path ? 600 : 400
                  }}
                >
                  {item.name}
                </Button>
              ))}
              
              {isSignedIn ? (
                <Box className="clerk-user-wrapper" sx={{ position: 'relative', ml: 2 }}>
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: { 
                          width: '40px', 
                          height: '40px' 
                        }
                      }
                    }}
                  />
                </Box>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button
                      color="inherit"
                      sx={{ fontWeight: 500 }}
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      variant="contained"
                      sx={{ fontWeight: 600, textTransform: 'none' }}
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
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
        ModalProps={{ keepMounted: true }}
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