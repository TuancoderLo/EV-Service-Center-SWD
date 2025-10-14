export interface DrawerItem {
  label: string;
  iconKey: string;
  href: string;
}

export const technicianDrawerItems: DrawerItem[] = [
  {
    label: "Dashboard",
    iconKey: "view-dashboard",
    href: "/technician",
  },
  {
    label: "Degree",
    iconKey: "certificate",
    href: "/technician/degree",
  },
  {
    label: "Schedule",
    iconKey: "calendar",
    href: "/technician/schedule",
  },
];
