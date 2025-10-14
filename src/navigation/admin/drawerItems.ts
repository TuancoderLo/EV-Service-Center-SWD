export interface DrawerItem {
  label: string;
  iconKey: string;
  href: string;
}

export const adminDrawerItems: DrawerItem[] = [
  {
    label: "Dashboard",
    iconKey: "view-dashboard",
    href: "/admin",
  },
  {
    label: "Manager Center",
    iconKey: "office-building",
    href: "/admin/manager-center",
  },
  {
    label: "Manager Users",
    iconKey: "account-group",
    href: "/admin/manager-users",
  },
  {
    label: "Manager Inventory",
    iconKey: "package-variant",
    href: "/admin/manager-inventory",
  },
  {
    label: "Manager Schedule",
    iconKey: "calendar",
    href: "/admin/manager-schedule",
  },
  {
    label: "Manager History",
    iconKey: "history",
    href: "/admin/manager-history",
  },
];
