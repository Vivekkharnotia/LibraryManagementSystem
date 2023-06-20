import { ImportContacts, AccountBalanceWalletOutlined, CalendarMonth, PermIdentity } from "@mui/icons-material"
import { AppNavList } from "types/app";

export const bottomNavList: AppNavList[] = [
  {
    id: 0,
    name: "Blogs",
    icon: ImportContacts ,
    link: "/app/blogs",
  },
  {
    id: 1,
    name: "Payments",
    icon: AccountBalanceWalletOutlined ,
    link: "/app/paymentHistory",
  },
  {
    id: 2,
    name: "Appoinments",
    icon: CalendarMonth ,
    link: "/app",
  },
  {
    id: 3,
    name: "Profile",
    icon: PermIdentity ,
    link: "/app/profile",
  },
];