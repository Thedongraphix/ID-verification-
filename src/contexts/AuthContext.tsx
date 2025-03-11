'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type UserType = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  program?: string
} | null

type CardInfoType = {
  status: string
  cardNumber: string
  issueDate: string
  expiryDate: string
} | null

type AuthContextType = {
  user: UserType
  cardInfo: CardInfoType
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>(null)
  const [cardInfo, setCardInfo] = useState<CardInfoType>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already logged in (from local storage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedCardInfo = localStorage.getItem('cardInfo')
    
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    
    if (storedCardInfo) {
      setCardInfo(JSON.parse(storedCardInfo))
    }
  }, [])

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll accept any login
      
      // Create mock user data
      const mockUser = {
        id: 'STU-12345',
        firstName: 'John',
        lastName: 'Doe',
        email: email,
        role: 'student',
        program: 'Computer Science'
      }
      
      const mockCardInfo = {
        status: 'Active',
        cardNumber: 'KEWI-12345',
        issueDate: '2023-01-01',
        expiryDate: '2027-01-01'
      }
      
      // Store in local storage
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('cardInfo', JSON.stringify(mockCardInfo))
      
      // Update state
      setUser(mockUser)
      setCardInfo(mockCardInfo)
      setIsAuthenticated(true)
      
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  // Mock register function
  const register = async (userData: any): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll accept any registration
      
      // Create user with provided data
      const newUser = {
        id: `STU-${Math.floor(10000 + Math.random() * 90000)}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role || 'student',
        program: 'Computer Science' // Default program
      }
      
      const newCardInfo = {
        status: 'Active',
        cardNumber: `KEWI-${Math.floor(10000 + Math.random() * 90000)}`,
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toISOString().split('T')[0]
      }
      
      // Store in local storage
      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('cardInfo', JSON.stringify(newCardInfo))
      
      // Update state
      setUser(newUser)
      setCardInfo(newCardInfo)
      setIsAuthenticated(true)
      
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('cardInfo')
    setUser(null)
    setCardInfo(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, cardInfo, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 