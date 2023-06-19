import {
  AnalyticsOutlined,
  Book,
  BookOutlined,
  CalendarMonth,
  GroupsOutlined,
  ImportContacts,
  PermIdentity,
  Schedule,
  AccountBalanceWalletOutlined,
} from "@mui/icons-material";
import React from "react";
import { AppDrawerList, AppNavList } from "types/app";

export const userNavList: AppNavList[] = [
  {
    id: 0,
    name: "My appoinments",
    icon: CalendarMonth ,
    link: "/app",
  },
  {
    id: 1,
    name: "Blogs",
    icon: BookOutlined,
    link: "/app/blogs",
  },
  {
    id: 2,
    name: "Profile",
    icon: PermIdentity ,
    link: "/app/profile",
  },
];

export const adminNavList: AppNavList[] = [
  ...userNavList,
  {
    id: 3,
    name: "My Blogs",
    icon: ImportContacts ,
    link: "/app/myBlogs",
  },
  {
    id: 4,
    name: "Payment History",
    icon: AccountBalanceWalletOutlined ,
    link: "/app/paymentHistory",
  },
  {
    id: 5,
    name: "Create Slots",
    icon: Schedule ,
    link: "/app/createSlots",
  },
  {
    id: 6,
    name: "Meeting Data",
    icon: GroupsOutlined ,
    link: "/app/meetingData",
  },
  {
    id: 7,
    name: "Analytics",
    icon: AnalyticsOutlined ,
    link: "/app/analytics",
  },
];

export const userDrawerList: AppDrawerList[] = []

export const adminDrawerList: AppDrawerList[] = [
  ...userDrawerList,
  {
    name: "My Blogs",
    icon: Book ,
    link: "/app/myBlogs",
  },
  {
    name: "Analytics",
    icon: AnalyticsOutlined ,
    link: "/app/analytics",
  },
  {
    name: "Create Slots",
    icon: Schedule ,
    link: "/app/createSlots",
  },
  {
    name: "Meetings Data",
    icon: GroupsOutlined ,
    link: "/app/meetingData",
  },
];