import { create } from "zustand";
import { persist } from 'zustand/middleware';

//authStore.js handles the login state globally, so we can use authStore to check whether a user is logged in or not and show things accordingly
//can import authStore anywhere to read or update the auth state

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      // Register User
      register: async (data) => {
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          if (!response.ok) {
            throw new Error('Registration failed');
          }
          
          const result = await response.json();
          set({ 
            user: result.user, 
            token: result.token,
            isAuthenticated: true 
          });
          return result;
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      },

      // Login User
      login: async (data) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          if (!response.ok) {
            throw new Error('Invalid credentials');
          }
          
          const result = await response.json();
          set({ 
            user: result.user, 
            token: result.token,
            isAuthenticated: true 
          });
          return result;
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      // Social Login
      loginWithGoogle: () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
      },

      loginWithLinkedIn: () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/linkedin`;
      },

      // Logout
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);