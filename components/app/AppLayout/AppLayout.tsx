import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUser } from "components/UserContext";
import Loading from "components/general/Loading/Loading";
import { auth } from "components/general/firebase-config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppStructure from "components/app/AppStructure/AppStructure";

interface AppLayoutProps {
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

export default function AppLayout(props: AppLayoutProps) {
  const { userLoading } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const user = auth.currentUser;
  user?.getIdTokenResult().then((idTokenResult) => {
    setIsAdmin(idTokenResult.claims.admin);
    setLoading(false);
  });

  useEffect(() => {
    if (window) {
      if (window.localStorage.getItem("loggedIn") === "false") {
        router.push("/signin");
      }
    }
  }, []);

  return (
    <>
      {userLoading !== "loaded" || loading ? (
        <Loading message="Loading..." />
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <AppStructure isAdmin={isAdmin} />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              paddingBottom: "3rem",
            }}
          >
            <DrawerHeader />

            {props.children}
          </Box>
        </Box>
      )}
    </>
  );
}
