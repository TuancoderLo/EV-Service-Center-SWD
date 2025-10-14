export interface DrawerItem {
  label: string;
  iconKey: string;
  href: string;
}

export const staffDrawerItems: DrawerItem[] = [
  {
    label: "Dashboard",
    iconKey: "view-dashboard",
    href: "/staff",
  },
  {
    label: "Manager Inventory",
    iconKey: "package-variant",
    href: "/staff/manager-inventory",
  },
  {
    label: "Manager Schedule",
    iconKey: "calendar",
    href: "/staff/manager-schedule",
  },
];
