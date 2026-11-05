import { User } from "@/types";
import { IMAGES } from "./images";

export const DEMO_USERS: User[] = [
  {
    id: "usr-admin",
    name: "Tariqul Alam",
    email: "admin@iccb.demo",
    role: "Admin",
    status: "active",
    avatarUrl: IMAGES.avatar3,
    lastLogin: "2026-11-05T09:12:00Z",
    phone: "+8801991197719",
  },
  {
    id: "usr-sales",
    name: "Zubair Hossain",
    email: "sales@iccb.demo",
    role: "Sales",
    status: "active",
    avatarUrl: IMAGES.avatar2,
    lastLogin: "2026-11-05T08:30:00Z",
    phone: "+8801991197718",
  },
  {
    id: "usr-editor",
    name: "Nusrat Jahan",
    email: "editor@iccb.demo",
    role: "Content Editor",
    status: "active",
    avatarUrl: IMAGES.avatar4,
    lastLogin: "2026-11-04T17:45:00Z",
    phone: "+8801704160389",
  },
  {
    id: "usr-viewer",
    name: "Audit Officer",
    email: "viewer@iccb.demo",
    role: "Viewer",
    status: "active",
    avatarUrl: IMAGES.avatar1,
    lastLogin: "2026-11-03T11:20:00Z",
    phone: "+8801938878790",
  },
];

