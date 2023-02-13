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
import ListItem from "@mui/material/ListItem";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PermIdentityIcon from "@mui/icons-material/PermIdentity"; //profile
import ImportContactsIcon from "@mui/icons-material/ImportContacts"; //blog
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; //appoinment
import PhoneIcon from "@mui/icons-material/Phone"; //call
import MenuIcon from "@mui/icons-material/Menu"; // menu
import sidebar from "./Sidebar.module.css";
import { Button, Typography } from "@mui/material";

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
  const [current2, setCurrent2] = useState(2);

  const handleDrawerOpen = () => {
    let drawerBtn = document.getElementById('drawerBtn');
    drawerBtn.style.rotate = '180deg';
    console.log('open');
    drawerBtn.style.transition = '0.5s ease';
    setOpen(true);
  };

  const handleDrawerClose = () => {
    let drawerBtn = document.getElementById('drawerBtn');
    drawerBtn.style.rotate = '0deg';
    console.log('close');
    drawerBtn.style.transition = '0.5s ease';
    setOpen(false);
  };

  const activeElement = (ind) => {
    let bar = document.getElementById("bar");
    let tp = 0;
    if (ind == 0) tp = 100;
    else if (ind == 1) tp = 181;
    else if (ind == 2) tp = 261;
    else if (ind == 3) tp = 344;
    else tp = 425;
    document.getElementById(`item${current}`).style.color = "black";
    document.getElementById(`icon${current}`).style.color = "black";
    setCurrent(ind);
    bar.style.top = `${tp}px`;
    document.getElementById(`item${ind}`).style.color = "white";
    document.getElementById(`icon${ind}`).style.color = "white";
  };

  const view2activeElement = (ind) => {
    let view2Bar = document.getElementById('view2Bar');
    view2Bar.style.left = `${ind*20}vw`;
    document.getElementById(`view2Item${current2}`).style.color = 'black';
    setCurrent2(ind);
    document.getElementById(`view2Item${ind}`).style.color = 'white';
  }

  return (
    <>
    <Box sx={{ display: "flex" }} className={sidebar.view1}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }} elevation={1}>
        <Toolbar>
          
          <Typography sx={{ color: "black" }}>Navbar content</Typography>
          {/*--------------------------------------Navbar content -------------------------------------  */}
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton> */}
          <Typography className={sidebar.drawerHead} variant="h5">Reh-A</Typography>
        </DrawerHeader>
        <Divider />

        <List>
          {/* <div className={sidebar.sidebarBtn}> */}
          <ListItemButton
            sx={{
              height: "auto",
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              paddingX: "20px",
              paddingY: "25px",
            }}
            className = {sidebar.sidebarBtn}
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
              className = {sidebar.sidebarIcn}
              id='drawerBtn'
            >
              <ArrowForwardOutlinedIcon fontSize="medium" color="action"/>
            </ListItemIcon>
            </ListItemButton>

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

    {/* media query 768px (tablet view)  */}
    <div className={sidebar.view2}>

      {/* ---------------------------------------------- Content of the bage ----------------------- */}

      <div className={sidebar.bottomNav}>
          <div className={sidebar.view2Bar} id = 'view2Bar'></div>
          <Button className={sidebar.view2Item} onClick = {() => view2activeElement(0)}>
            <ImportContactsIcon id = {`view2Item${0}`} className={sidebar.view2Icn}/>
          </Button>
          <Button className={sidebar.view2Item} onClick = {() => view2activeElement(1)}>
            <PhoneIcon id = {`view2Item${1}`} className={sidebar.view2Icn}/>
          </Button>
          <Button className={sidebar.view2Item} onClick = {() => view2activeElement(2)}>
            <CalendarMonthIcon id = {`view2Item${2}`} sx={{color : 'white'}} className={sidebar.view2Icn}/>
          </Button>
          <Button className={sidebar.view2Item} onClick = {() => view2activeElement(3)}>
            <PermIdentityIcon id = {`view2Item${3}`} className={sidebar.view2Icn}/>
          </Button>
          <Button className={sidebar.view2Item} onClick = {() => view2activeElement(4)}>
            <MenuIcon id = {`view2Item${4}`} className={sidebar.view2Icn}/>
          </Button>
      </div>
      
    </div>
    </>
  );
}

{/* <IconButton
            id = 'drawerBtn'
            color="inherit"
            aria-label="open drawer"
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open),
            }}
          >
            <ArrowRightAltIcon fontSize="large" sx={{ color: "black" }} />
          </IconButton> */}