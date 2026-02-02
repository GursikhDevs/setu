import axios from "axios";
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
     // Register User (SIGNUP)
register: async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/signup",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // backend only returns message
    return response.data;

  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
},


      // Login User
      login: async (data) => {
        try {
          // const response = await fetch('http://localhost:3000/auth/login', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(data),
          //   credentials: 'include',
          // });
          const response = await axios.post(
  "http://localhost:3000/auth/login",
  data,
  {
    withCredentials: true, // ✅ THIS is credentials: 'include'
    headers: {
      "Content-Type": "application/json",
    },
  }
);
          console.log(response.data.jwt.token);
          
          
        
          
          // const result = await response.json();
          set({ 
            user: response.data.user, 
            token: response.data.jwt.token,
            isAuthenticated: true 
          });
          return response.data;
          console.log(response.data);
          
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