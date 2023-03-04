import Blogs from "components/general/Blogs/Blogs";
import BlogsNav from "components/general/Blogs/BlogsNav/BlogsNav";
import Footer from "components/general/Footer/Footer";
import React from "react";


const index = () => {
  return (
    <>
      <BlogsNav />
      <Blogs />
      <Footer />
    </>
  );
};

export default index;
