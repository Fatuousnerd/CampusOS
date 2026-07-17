import { ErrorState, LoadingState } from "@/config/Types";
import { create } from "zustand";

export const useLoading = create<LoadingState>((set) => ({
  loading: {},
  setLoading: (key, value) =>
    set((state) => ({ loading: { ...state.loading, [key]: value } })),
}));

export const useErrors = create<ErrorState>((set) => ({
  err: {},
  setErr: (key, value) =>
    set((state) => ({ err: { ...state.err, [key]: value } })),
}));
