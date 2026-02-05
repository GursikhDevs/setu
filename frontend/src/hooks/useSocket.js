//OM namah sivay
import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';


export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuthStore();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    // Connect to backend socket
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socketRef.current = newSocket;

    newSocket.on('connect', () => {
      console.log('✅ Socket connected!');
      setIsConnected(true);
    });

    newSocket.on('auth:ok', (data) => {
      console.log('✅ Auth confirmed:', data);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user]);

  return { socket, isConnected };
};