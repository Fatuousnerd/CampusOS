import { create } from "zustand";

export interface ServiceOrder {
  id: string;
  serviceName: string;
  price: number;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  category: string;
  createdAt: string;
  details: string;
  progress: number; // 0 to 100
}

interface ProfileState {
  name: string;
  major: string;
  classYear: string;
  studentId: string;
  balance: number;
  avatar: string;
  rsvps: number[]; // Event IDs
  activeOrders: ServiceOrder[];
  topUp: (amount: number) => void;
  deduct: (amount: number) => boolean;
  addRSVP: (eventId: number) => void;
  removeRSVP: (eventId: number) => void;
  addOrder: (order: Omit<ServiceOrder, "id" | "status" | "createdAt" | "progress">) => void;
  updateOrderStatus: (orderId: string, status: ServiceOrder["status"], progress: number) => void;
}

export const useProfile = create<ProfileState>((set) => ({
  name: "Alex Mercer",
  major: "Computer Science & AI",
  classYear: "Class of 2027",
  studentId: "CS-2023-8941",
  balance: 1250,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  rsvps: [],
  activeOrders: [
    {
      id: "ord-1",
      serviceName: "Dorm Laundry (Wash & Dry)",
      price: 250,
      status: "In Progress",
      category: "laundry",
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      details: "5kg Mixed Clothes, Lavender Scent",
      progress: 60
    }
  ],
  topUp: (amount) => set((state) => ({ balance: state.balance + amount })),
  deduct: (amount) => {
    let success = false;
    set((state) => {
      if (state.balance >= amount) {
        success = true;
        return { balance: state.balance - amount };
      }
      return {};
    });
    return success;
  },
  addRSVP: (eventId) => set((state) => ({
    rsvps: state.rsvps.includes(eventId) ? state.rsvps : [...state.rsvps, eventId]
  })),
  removeRSVP: (eventId) => set((state) => ({
    rsvps: state.rsvps.filter((id) => id !== eventId)
  })),
  addOrder: (order) => set((state) => {
    const newOrder: ServiceOrder = {
      ...order,
      id: `ord-${Math.random().toString(36).substr(2, 9)}`,
      status: "Pending",
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      progress: 10
    };
    return {
      activeOrders: [newOrder, ...state.activeOrders]
    };
  }),
  updateOrderStatus: (orderId, status, progress) => set((state) => ({
    activeOrders: state.activeOrders.map((o) =>
      o.id === orderId ? { ...o, status, progress } : o
    )
  }))
}));
