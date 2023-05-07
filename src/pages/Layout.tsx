import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppStructure from "../../components/general/AppStructure/AppStructure";
import { useUser } from "components/UserContext";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Layout(props: LayoutProps ) {
  const { userLoading } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (window) {
      if (window.localStorage.getItem("loggedIn") === "false") {
        router.push("/");
      }
    }
  }, []);

  return (
    <>
      {userLoading === 'loading' ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
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
