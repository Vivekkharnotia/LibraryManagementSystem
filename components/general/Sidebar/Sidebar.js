import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PermIdentityIcon from "@mui/icons-material/PermIdentity"; //profile
import ImportContactsIcon from "@mui/icons-material/ImportContacts"; //blog
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; //appoinment
import PhoneIcon from "@mui/icons-material/Phone"; //call
import MenuIcon from "@mui/icons-material/Menu"; // menu

import sidebar from "./Sidebar.module.css";
import { Typography } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = useState(0);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeElement = (ind) => {
    let bar = document.getElementById("bar");
    let tp = 0;
    if (ind == 0) tp = 26;
    else if (ind == 1) tp = 110;
    else if (ind == 2) tp = 190;
    else if (ind == 3) tp = 270;
    else tp = 350;
    document.getElementById(`item${current}`).style.color = "black";
    document.getElementById(`icon${current}`).style.color = "black";
    setCurrent(ind);
    bar.style.top = `${tp}px`;
    document.getElementById(`item${ind}`).style.color = "white";
    document.getElementById(`icon${ind}`).style.color = "white";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <ChevronRightIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography sx={{ color: "black" }}>Navbar content</Typography>
          {/*--------------------------------------Navbar content -------------------------------------  */}
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <div className={sidebar.bar} id="bar"></div>
          {["Blogs", "My appoinments", "Talk with us", "Profile", "More"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block", color: index == 0 ? "white" : "black" }}
                id={`item${index}`}
                className={sidebar.elements}
              >
                <ListItemButton
                  sx={{
                    height: "auto",
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    paddingX: "20px",
                    paddingY: "25px",
                  }}
                  onClick={() => activeElement(index)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index == 0 ? (
                      <ImportContactsIcon
                        id={`icon${index}`}
                        sx={{ color: "white" }}
                      />
                    ) : null}
                    {index == 1 ? (
                      <CalendarMonthIcon
                        id={`icon${index}`}
                        sx={{ color: "black" }}
                      />
                    ) : null}
                    {index == 2 ? (
                      <PhoneIcon id={`icon${index}`} sx={{ color: "black" }} />
                    ) : null}
                    {index == 3 ? (
                      <PermIdentityIcon
                        id={`icon${index}`}
                        sx={{ color: "black" }}
                      />
                    ) : null}
                    {index == 4 ? (
                      <MenuIcon id={`icon${index}`} sx={{ color: "black" }} />
                    ) : null}
                  </ListItemIcon>

                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {/* --------------------------------- Elements outside the sidebar and navbar-------------------------- */}
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, error
          unde recusandae quia voluptate maxime consectetur? Tenetur fugit
          cumque nesciunt!
        </Typography>
        
      </Box>
    </Box>
  );
}
