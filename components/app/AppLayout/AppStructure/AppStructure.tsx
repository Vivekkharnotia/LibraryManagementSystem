import SideDrawer from "components/general/SideDrawer/SideDrawer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppBottomNav from "../AppBottomNav/AppBottomNav";
import AppDrawer from "../AppDrawer/AppDrawer";
import AppNavBar from "../AppNavBar/AppNavBar";
import {
  adminDrawerList,
  adminNavList,
  userDrawerList,
  userNavList,
} from "./constants";

export default function MiniDrawer({ isAdmin }: { isAdmin: boolean | null }) {
  const [open, setOpen] = useState(true);
  const [current, setCurrent] = useState(0);
  const [uid, setUid] = useState("hello");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navList = isAdmin ? adminNavList : userNavList;
  const drawerList = isAdmin ? adminDrawerList : userDrawerList;

  useEffect(() => {
    setUid(localStorage.getItem("uid")!);

    const activeMenu = navList.find((item) => item.link === router.pathname);
    if (activeMenu) {
      activeElement(activeMenu.id);
    }
  }, [router.pathname]);

  const handleDrawerOpen = () => {
    let drawerBtn = document.getElementById("drawerBtn");
    let navLogo = document.getElementById("NavLogo");
    let navItem = document.getElementById("NavTitle");

    if (navLogo) {
      navLogo.style.opacity = "0";
      navLogo.style.left = "-10px";
    }

    if (navItem) {
      navItem.style.marginLeft = "0px";
    }

    if (drawerBtn) {
      drawerBtn.style.transform = "rotate(0deg)";
      drawerBtn.style.transition = "0.5s ease";
    }

    setOpen(true);
  };

  const handleDrawerClose = () => {
    let drawerBtn = document.getElementById("drawerBtn");
    let navItem = document.getElementById("NavTitle");
    let navLogo = document.getElementById("NavLogo");

    if (navLogo) {
      navLogo.style.opacity = "1";
      navLogo.style.left = "0px";
    }

    if (navItem) {
      navItem.style.marginLeft = "70px";
    }

    if (drawerBtn) {
      drawerBtn.style.transform = "rotate(180deg)";
      drawerBtn.style.transition = "0.5s ease";
    }
    setOpen(false);
  };

  const activeElement = (ind: number) => {
    let bar = document.getElementById("bar");
    let tp = 0;
    if (ind == 0) tp = 100;
    else if (ind == 1) tp = 181;
    else if (ind == 2) tp = 264;
    else if (ind == 3) tp = 346;
    else if (ind == 4) tp = 426;
    else if (ind == 5) tp = 508;
    else if (ind == 6) tp = 590;
    else tp = 672;

    const currentElement = document.getElementById(`item${current}`);
    const currentIcon = document.getElementById(`icon${current}`)
      ?.children[0] as HTMLElement;

    if (currentElement) {
      currentElement.style.color = "black";
    }

    if (currentIcon) {
      currentIcon.style.color = "black";
    }

    setCurrent(ind);

    if (bar) {
      bar.style.top = `${tp}px`;
    }

    const selectedElement = document.getElementById(`item${ind}`);
    const selectedIcon = document.getElementById(`icon${ind}`)
      ?.children[0] as HTMLElement;

    if (selectedElement) {
      selectedElement.style.color = "white";
    }

    if (selectedIcon) {
      selectedIcon.style.color = "white";
    }
  };

  return (
    <>
      <AppNavBar open={open} />

      {/* desktop drawer for app navigation */}
      <AppDrawer
        open={open}
        navList={navList}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      {/* navigation bar for mobile view */}
      <AppBottomNav handleDrawerToggle={handleDrawerToggle} current={current} />

      {/* rectractable drawer from hamburger */}
      <SideDrawer
        drawerList={drawerList}
        handleDrawerToggle={handleDrawerToggle}
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
      />
    </>
  );
}
