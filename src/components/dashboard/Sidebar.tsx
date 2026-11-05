"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { DASHBOARD_NAV } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Mail,
  Send,
  Utensils,
  PackageCheck,
  ConciergeBell,
  Layout,
  Megaphone,
  Image as ImageIcon,
  FolderArchive,
  BookOpen,
  Newspaper,
  MessageSquareQuote,
  HelpCircle,
  Award,
  Search,
  FormInput,
  MailCheck,
  BarChart3,
  UserCheck,
  Shield,
  Clock,
  Bell,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4 shrink-0" />,
  Users: <Users className="w-4 h-4 shrink-0" />,
  FileText: <FileText className="w-4 h-4 shrink-0" />,
  Calendar: <Calendar className="w-4 h-4 shrink-0" />,
  Mail: <Mail className="w-4 h-4 shrink-0" />,
  Send: <Send className="w-4 h-4 shrink-0" />,
  Utensils: <Utensils className="w-4 h-4 shrink-0" />,
  PackageCheck: <PackageCheck className="w-4 h-4 shrink-0" />,
  ConciergeBell: <ConciergeBell className="w-4 h-4 shrink-0" />,
  Layout: <Layout className="w-4 h-4 shrink-0" />,
  Megaphone: <Megaphone className="w-4 h-4 shrink-0" />,
  Image: <ImageIcon className="w-4 h-4 shrink-0" />,
  FolderArchive: <FolderArchive className="w-4 h-4 shrink-0" />,
  BookOpen: <BookOpen className="w-4 h-4 shrink-0" />,
  Newspaper: <Newspaper className="w-4 h-4 shrink-0" />,
  MessageSquareQuote: <MessageSquareQuote className="w-4 h-4 shrink-0" />,
  HelpCircle: <HelpCircle className="w-4 h-4 shrink-0" />,
  Award: <Award className="w-4 h-4 shrink-0" />,
  Search: <Search className="w-4 h-4 shrink-0" />,
  FormInput: <FormInput className="w-4 h-4 shrink-0" />,
  MailCheck: <MailCheck className="w-4 h-4 shrink-0" />,
  BarChart3: <BarChart3 className="w-4 h-4 shrink-0" />,
  UserCheck: <UserCheck className="w-4 h-4 shrink-0" />,
  Shield: <Shield className="w-4 h-4 shrink-0" />,
  Clock: <Clock className="w-4 h-4 shrink-0" />,
  Bell: <Bell className="w-4 h-4 shrink-0" />,
  Settings: <Settings className="w-4 h-4 shrink-0" />,
  User: <User className="w-4 h-4 shrink-0" />,
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-ink-950 text-white flex flex-col border-r border-ink-800 transition-all duration-300 z-30 select-none",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-ink-800 shrink-0">
        {!collapsed ? (
          <Logo light />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center font-display font-black text-lg mx-auto">
            IC
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-ink-400 hover:text-white p-1.5 rounded-lg hover:bg-ink-900 transition-colors hidden lg:block"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {DASHBOARD_NAV.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all group",
                isActive
                  ? "bg-brand-500 text-white shadow-floating font-bold"
                  : "text-ink-300 hover:text-white hover:bg-ink-900",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              {iconMap[item.icon] || <LayoutDashboard className="w-4 h-4 shrink-0" />}
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-ink-800 shrink-0 space-y-2">
        {/* Link back to public site */}
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-ink-300 hover:text-white hover:bg-ink-900 transition-colors",
            collapsed && "justify-center px-2"
          )}
          title="View Public Site"
        >
          <ExternalLink className="w-4 h-4 shrink-0 text-brand-400" />
          {!collapsed && <span className="font-semibold text-[11px] uppercase tracking-wider">Public Site</span>}
        </Link>

        {/* User Card */}
        <div
          className={cn(
            "p-2.5 rounded-xl bg-ink-900/80 border border-ink-800 flex items-center justify-between",
            collapsed && "flex-col gap-2 p-2"
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-display font-bold text-xs shrink-0">
              {user?.name?.charAt(0) || "A"}
            </div>
            {!collapsed && (
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-white truncate">{user?.name || "Admin"}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-brand-400 font-semibold">{user?.role || "Admin"}</span>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="text-ink-400 hover:text-brand-400 p-1.5 rounded-lg hover:bg-ink-800 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

