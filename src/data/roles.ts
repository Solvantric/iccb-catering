import { RolePermission } from "@/types";

export const ROLE_PERMISSIONS: RolePermission[] = [
  {
    id: "role-admin",
    name: "Admin",
    description: "Full administrative access to manage all CRM, catering menus, settings, users, and audit logs.",
    permissions: [
      "leads.create", "leads.read", "leads.update", "leads.delete",
      "quotations.create", "quotations.read", "quotations.update", "quotations.delete",
      "bookings.create", "bookings.read", "bookings.update", "bookings.delete",
      "menu.create", "menu.read", "menu.update", "menu.delete",
      "packages.manage", "services.manage", "pages.manage", "blog.manage",
      "gallery.manage", "users.manage", "roles.manage", "settings.manage", "audit.view"
    ],
  },
  {
    id: "role-sales",
    name: "Sales",
    description: "Manage client leads, build and issue quotations, track food tastings, and convert bookings.",
    permissions: [
      "leads.create", "leads.read", "leads.update",
      "quotations.create", "quotations.read", "quotations.update",
      "bookings.create", "bookings.read",
      "menu.read", "packages.read", "services.read"
    ],
  },
  {
    id: "role-editor",
    name: "Content Editor",
    description: "Create and update menu dishes, blog articles, photo galleries, FAQs, and announcement banners.",
    permissions: [
      "menu.create", "menu.read", "menu.update",
      "packages.manage", "services.manage", "blog.manage", "gallery.manage",
      "pages.manage", "faqs.manage"
    ],
  },
  {
    id: "role-viewer",
    name: "Viewer",
    description: "Read-only access across the dashboard for auditing, compliance, and viewing event metrics.",
    permissions: [
      "leads.read", "quotations.read", "bookings.read", "menu.read", "analytics.read"
    ],
  },
];

