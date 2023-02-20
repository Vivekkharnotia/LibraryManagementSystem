import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import sidebar from "./AppNavBar.module.css";
import { Typography } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import Avatar from "../Avatar/Avatar";

const drawerWidth = 270;


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



export default function AppNavbar({ open }) {
  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "white", borderBottom: "1px solid #0000001f" }}
        elevation={0}
        className={sidebar.testBar}
      >
        <Toolbar>
          <div className={sidebar.allNavContent}>
            <Typography
              variant="h6"
              id="NavLogo"
              className={sidebar.navLogo}
              sx={{ color: "black", position: "relative" }}
            >
              R
            </Typography>
            <div
              sx={{ color: "black" }}
              id="NavTitle"
              className={sidebar.navBarContent}
            >
              <SearchBar />
              <Avatar />
            </div>
          </div>
          {/*--------------------------------------Navbar content -------------------------------------  */}
        </Toolbar>
      </AppBar>
    </>
  );
}
