import { Box, CircularProgress } from "@mui/material";
import { useUser } from "components/UserContext";
import BlogsNav from "components/general/Blogs/BlogsNav/BlogsNav";
import Footer from "components/general/Footer/Footer";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function BlogsLayout(props: any) {
  const { user, userLoading } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) router.push("/");
  // }, [user]);

  return (
    <>
      {userLoading !== "loaded" ? (
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
          <BlogsNav />
          {props.children}
          <Footer />
        </>
      )}
    </>
  );
}

export default BlogsLayout;
