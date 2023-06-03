import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import BookIcon from '@mui/icons-material/Book';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; //appoinment
import ImportContactsIcon from "@mui/icons-material/ImportContacts"; //blog
import MenuIcon from "@mui/icons-material/Menu"; // menu
import PermIdentityIcon from "@mui/icons-material/PermIdentity"; //profile
import PhoneIcon from "@mui/icons-material/Phone"; //call
import { Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppNavBar from "../AppNavBar/AppNavBar";
import SideDrawer from "../SideDrawer/SideDrawer";
import sidebar from "./Sidebar.module.css";

const drawerWidth = 270;

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
  const [open, setOpen] = useState(true);
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const [uid, setUid] = useState("hello");
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const navList = [
    {
      id: 0,
      name: "My appoinments",
      icon: <CalendarMonthIcon />,
      link: "/app",
    },
    {
      id: 1,
      name: "Blogs",
      icon: <BookIcon />,
      link: "/app/blogs",
    },
    {
      id: 2,
      name: "My Blogs",
      icon: <ImportContactsIcon />,
      link: "/app/myBlogs",
    },
    {
      id: 3,
      name: "Talk with us",
      icon: <PhoneIcon />,
      link: "/app/talk",
    },
    {
      id: 4,
      name: "Profile",
      icon: <PermIdentityIcon />,
      link: "/app/profile",
    },
    {
      id: 5,
      name: "More",
      icon: <MenuIcon />,
      link: "/app/more",
    },
  ]

  useEffect(() => {
    setUid(localStorage.getItem("uid"));

    const activeMenu = navList.find((item) => item.link === router.pathname);
    activeElement(activeMenu.id);
  }, [router.pathname]);

  const handleDrawerOpen = () => {
    let drawerBtn = document.getElementById("drawerBtn");
    let navLogo = document.getElementById("NavLogo");
    let navItm = document.getElementById("NavTitle");

    navLogo.style = "opacity: 0; left: -10px";
    navItm.style = "margin-left: 0px";
    drawerBtn.style.rotate = "0deg";
    drawerBtn.style.transition = "0.5s ease";
    setOpen(true);
  };

  const handleDrawerClose = () => {
    let drawerBtn = document.getElementById("drawerBtn");
    let navItm = document.getElementById("NavTitle");
    let navLogo = document.getElementById("NavLogo");

    navLogo.style = "opacity: 1; left: 0px";
    navItm.style = "margin-left: 70px";
    drawerBtn.style.rotate = "180deg";
    drawerBtn.style.transition = "0.5s ease";
    setOpen(false);
  };

  const activeElement = (ind) => {
    console.log(ind)
    let bar = document.getElementById("bar");
    let tp = 0;
    if (ind == 0) tp = 100;
    else if (ind == 1) tp = 181;
    else if (ind == 2) tp = 261;
    else if (ind == 3) tp = 344;
    else if (ind == 4) tp = 425;
    else tp = 506;

    let view2Bar = document.getElementById("view2Bar");

    if (ind == 0) view2Bar.style.left = `40vw`;
    else if (ind == 1) view2Bar.style.left = `0vw`;
    else if (ind == 2) view2Bar.style.left = `20vw`;
    else if (ind == 3) view2Bar.style.left = `60vw`;
    else view2Bar.style.left = `80vw`;

    console.log("current: ", current);
    document.getElementById(`item${current}`).style.color = "black";
    document.getElementById(`icon${current}`).children[0].style.color = "black";
    
    setCurrent(4);
    if(ind <= 4){
      document.getElementById(`view2Item${current}`).style.color = "black";
      document.getElementById(`view2Item${ind}`).style.color = "white";
      setCurrent(ind);
    }
    

    bar.style.top = `${tp}px`;
    document.getElementById(`item${ind}`).style.color = "white";
    document.getElementById(`icon${ind}`).children[0].style.color = "white";
  };

  const drawerList = [
    {
      name: "my blogs",
      icon: <BookIcon />,
      link: "/app/myBlogs",
    }
  ];


  

  return (
    <>
      <AppNavBar open={open} />

      <Drawer variant="permanent" open={open} className={sidebar.view1}>
        <DrawerHeader>
          <Typography className={sidebar.drawerHead} variant="h5">
            R-A
          </Typography>
        </DrawerHeader>
        <Divider />

        <List>
          <ListItemButton
            sx={{
              height: "auto",
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              paddingX: "20px",
              paddingY: "25px",
            }}
            className={sidebar.sidebarBtn}
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
              className={sidebar.sidebarIcn}
              id="drawerBtn"
            >
              <ArrowForwardOutlinedIcon
                sx={{ transform: "rotate(180deg)" }}
                fontSize="medium"
                color="action"
              />
            </ListItemIcon>
          </ListItemButton>

          <div className={sidebar.bar} id="bar"></div>

          {navList.map(
            (item, index) => (
              <Link key={index} href={item.link }   >
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                    color: index == 0 ? "white" : "black",
                  }}
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
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: index == 0 ? "white" : "black",
                      }}
                      id={`icon${index}`}
                    >
                      {item.icon}
                      
                    </ListItemIcon>

                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          )}
        </List>
        <Divider />
      </Drawer>

      <div className={sidebar.view2}>
        {/* ---------------------------------------------- Content of the bage ----------------------- */}

        <div className={sidebar.bottomNav}>
          <div className={sidebar.view2Bar} id="view2Bar"></div>
          <Link href="/app/blogs">
            <Button
              className={sidebar.view2Item}
              onClick={() => activeElement(1)}
            >
              <ImportContactsIcon
                id={`view2Item${1}`}
                className={sidebar.view2Icn}
              />
            </Button>
          </Link>

          <Link href="/app/talk">
          <Button
            className={sidebar.view2Item}
            onClick={() => activeElement(2)}
          >
            <PhoneIcon id={`view2Item${2}`} className={sidebar.view2Icn} />
          </Button>--
          </Link>


          <Link href="/app">
            <Button
              className={sidebar.view2Item}
              onClick={() => activeElement(0)}
            >
              <CalendarMonthIcon
                id={`view2Item${0}`}
                sx={{ color: "white" }}
                className={sidebar.view2Icn}
              />
            </Button>
          </Link>

          <Link href="/app/profile">
            <Button
              className={sidebar.view2Item}
              onClick={() => activeElement(3)}
            >
              <PermIdentityIcon
                id={`view2Item${3}`}
                className={sidebar.view2Icn}
              />
            </Button>
          </Link>

            <span>
            <Button
              className={sidebar.view2Item}
              onClick={() => {activeElement(4), handleDrawerToggle()}}
            >
              <MenuIcon id={`view2Item${4}`} className={sidebar.view2Icn} />
            </Button>
            </span>
        
        </div>
      </div>

      <SideDrawer sx={{display: { "@media (min-width:768px)": "none" }}} drawerList={drawerList} handleDrawerToggle={handleDrawerToggle} setMobileOpen={setMobileOpen} mobileOpen={mobileOpen}/>
    </>
  );
}
