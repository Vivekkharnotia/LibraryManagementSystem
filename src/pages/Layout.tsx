import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppStructure from "../../components/general/AppStructure/AppStructure";
import { useUser } from "components/UserContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Layout(props: any) {
  const { user, loading, loggedIn } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   if(!loggedIn) router.push("/");
  //   console.log(loggedIn)
  // }, [loggedIn]);

  return (
    <>
      {loading ? (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem'  }}>
            Loading
            <CircularProgress />
        </Box>
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
      )}
    </>
  );
}
