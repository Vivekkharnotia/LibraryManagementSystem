import { ReactNode, useEffect, useState } from "react";
import Footer from "../../home/Footer/Footer";
import { auth } from "../../general/firebase-config";
import BlogsNav from "./BlogsNav/BlogsNav";

interface BlogsLayoutProps {
  children: ReactNode
}

function BlogsLayout({ children }: BlogsLayoutProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const getIsAdmin = () => {
    try {
      const user = auth.currentUser;
      user?.getIdTokenResult().then((idTokenResult) => {
        setIsAdmin(idTokenResult.claims.admin);
      });
      setIsLoggedIn(user ? true : false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIsAdmin();
  }, []);

  return (
    <>
      <BlogsNav isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
      {children}
      <Footer />
    </>
  );
}

export default BlogsLayout;
