export interface DrawerItem {
  label: string;
  iconKey: string;
  href: string;
}

export const memberDrawerItems: DrawerItem[] = [
  {
    label: "Dashboard",
    iconKey: "view-dashboard",
    href: "/member",
  },
  {
    label: "Booking",
    iconKey: "calendar-plus",
    href: "/member/booking",
  },
  {
    label: "Detail",
    iconKey: "information",
    href: "/member/detail",
  },
  {
    label: "History",
    iconKey: "history",
    href: "/member/history",
  },
  {
    label: "Payment",
    iconKey: "credit-card",
    href: "/member/payment",
  },
];
