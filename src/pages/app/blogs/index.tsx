import BlogsGrid from "components/general/App/BlogsGrid/BlogsGrid";
import { db } from "components/general/firebase-config";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

const app = ({metaBlogsDataString}: {metaBlogsDataString: string}) => {

  const data = JSON.parse(metaBlogsDataString);

  return (
    <>
      <BlogsGrid data={data} />
    </>
  );
};

export default app;


export const getServerSideProps = async ({req, res}: {req: NextApiRequest, res: NextApiResponse}) => {
  // get the latest 10 blogs from firestore
  const q = query(collection(db, "metaBlogs"), orderBy("date", "desc") ,limit(7));
  const metaBlogs = await getDocs(q);
  const metaBlogsData = metaBlogs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const metaBlogsDataString = JSON.stringify(metaBlogsData);

  return {
    props: {
      metaBlogsDataString
    },
  };
}