interface MobileNavbarMenuItem {
  title: string;
  link: string;
  scroll: boolean;
  variant: MenuItemVariant;
}

type MenuItemVariant = "main" | "normal";

export const mobileNavbarMenuItems: MobileNavbarMenuItem[] = [
  {
    title: "Book your Slot",
    link: "/app",
    scroll: true,
    variant: "main",
  },
  {
    title: "About",
    link: "#about",
    scroll: false,
    variant: "normal",
  },
  {
    title: "Services",
    link: "#services",
    scroll: false,
    variant: "normal",
  },
  {
    title: "Blogs",
    link: "/blogs",
    scroll: true,
    variant: "normal",
  },
  {
    title: "Sign in",
    link: "/signin",
    scroll: true,
    variant: "normal",
  },
];