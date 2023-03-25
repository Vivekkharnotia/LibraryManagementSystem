import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppStructure from "../../components/general/AppStructure/AppStructure";
import { useUser } from "components/UserContext";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Layout(props: any) {

  const { user } = useUser();

  return (
    <>
    {
      !user ? (
        <div>Not logged in</div>
      ) : (
        <>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
    
            <AppStructure />
    
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
    
              {props.children}
            </Box>
          </Box>
        </>
      )
    }
    </>
  );
}
