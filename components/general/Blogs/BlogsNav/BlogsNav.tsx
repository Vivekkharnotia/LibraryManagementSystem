import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { scrollTrigger } from "utils/scrollTrigger";
import styles from "./BlogsNav.module.css";
import SideDrawer from "./SideDrawer";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function BlogsNav(props: Props) {
  const router = useRouter();

  let triggered = false;
  if (router.pathname === "/blogs") {
    [triggered] = scrollTrigger();
  }

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <nav
        className={styles.nav}
        style={{
          position: triggered ? "fixed" : "unset",
          animationName: triggered ? styles.navSlide : "unset",
        }}
      >
        <Link href="/blogs" className={styles.logo}>
          R-A
        </Link>

        <div className={styles.btnContainer}>
          <div className={styles.navBtns}>
            <Link href="/app" className={styles.bookBtn}>
              Book Slot
            </Link>
            <Link href="/signin" className={styles.signinBtn}>
              Sign In
            </Link>
          </div>

          <div className={styles.hamburger}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </nav>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <SideDrawer handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Box>
    </>
  );
}