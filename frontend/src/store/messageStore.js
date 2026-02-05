//OM namah sivay
import { create } from 'zustand';

export const useMessageStore = create((set, get) => ({
  // State
  users: [],
  selectedUser: null,
  currentRoom: null,
  messages: [],
  loading: false,

  // Set users list
  setUsers: (users) => set({ users }),

  // Select user to chat with
  selectUser: (user) => set({ selectedUser: user }),

  // Start chat and load messages
  startChat: async (targetUserId) => {
    set({ loading: true });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/message/start/${targetUserId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (!res.ok) throw new Error('Failed to start chat');

      const data = await res.json();
      set({
        currentRoom: data.roomId,
        messages: data.messages || [],
        loading: false,
      });

      return data.roomId;
    } catch (error) {
      console.error('Start chat error:', error);
      set({ loading: false });
      throw error;
    }
  },

  // Add new message
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  // Clear chat
  clearChat: () => {
    set({
      selectedUser: null,
      currentRoom: null,
      messages: [],
    });
  },
}));