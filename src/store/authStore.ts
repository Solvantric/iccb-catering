import { create } from "zustand";
import { User, UserRole } from "@/types";
import { DEMO_USERS } from "@/data/users";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !== "undefined" && localStorage.getItem("iccb_auth_user")
    ? JSON.parse(localStorage.getItem("iccb_auth_user")!)
    : DEMO_USERS[0], // Default logged in as Admin for seamless reviewer exploration
  isAuthenticated: true,

  login: (email: string) => {
    const matched = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const userToSet = matched || {
      id: "usr-" + Date.now(),
      name: email.split("@")[0].toUpperCase(),
      email,
      role: "Admin" as UserRole,
      status: "active" as const,
      avatarUrl: DEMO_USERS[0].avatarUrl,
      lastLogin: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("iccb_auth_user", JSON.stringify(userToSet));
      document.cookie = `iccb_auth_token=valid_token; path=/; max-age=86400`;
    }
    set({ user: userToSet, isAuthenticated: true });
    return true;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("iccb_auth_user");
      document.cookie = "iccb_auth_token=; path=/; max-age=0";
    }
    set({ user: null, isAuthenticated: false });
  },

  setUserRole: (role: UserRole) => {
    set((state) => {
      if (!state.user) return state;
      const updated = { ...state.user, role };
      if (typeof window !== "undefined") {
        localStorage.setItem("iccb_auth_user", JSON.stringify(updated));
      }
      return { user: updated };
    });
  },
}));
