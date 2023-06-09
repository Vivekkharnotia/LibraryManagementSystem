import { Box, Grid } from "@mui/material";
import BlogsCard from "components/general/Blogs/BlogsCard/BlogsCard";
import { db } from "components/general/firebase-config";
import { getCookie } from "cookies-next";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { withAdmin } from 'ProtectedRoutes/AdminRoute';

const app = (props : any) => {
  const metaBlogsData = JSON.parse(props.metaBlogsDataString);

  return (
    <>
      <Box sx={{ textAlign: "center", marginTop: "2rem", '@media (max-width:768px)': { paddingInline : "2rem"} }}>
        <Grid container spacing={5}>
          {metaBlogsData.map((blog: any) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={blog.id}>
              <Link href={`/blogs/read/${blog.id}`} passHref>
                <BlogsCard imgUrl={blog.heroImageSrc} title={blog.headTitle} mainTitle="published" />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

    </>
  );
};

export default withAdmin(app);


export const getServerSideProps = async ({req, res}: {req: NextApiRequest, res: NextApiResponse}) => {
  
  const uid =  getCookie("uid", {req, res});

  const userSnap = await getDoc(doc(collection(db, "Userdata"), `${uid}`));
  const user = userSnap.data();
  const userBlogs = user?.blogs;

  let metaBlogsDataString = null;
  if(userBlogs && userBlogs.length > 0){
    const q = query(collection(db, "metaBlogs"), where("__name__", "in", userBlogs));
    const metaBlogs = await getDocs(q);
    const metaBlogsData = metaBlogs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    metaBlogsDataString = JSON.stringify(metaBlogsData);
  }


  return {
    props: {
      metaBlogsDataString
    },
  };
}
