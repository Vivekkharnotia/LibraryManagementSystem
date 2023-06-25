import { withAdmin } from "ProtectedRoutes/AdminRoute";
import BlogCreator from "components/blogs/BlogCreator/BlogCreator";
import { db } from "components/general/firebase-config";
import { getCookie } from "cookies-next";
import { collection, doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

function index({ dataString }: { dataString: string }) {
  return <BlogCreator dataString={dataString} />;
}

export default withAdmin(index);



export const getStaticProps = async ({
    req,
    res,
  }: {
    req: NextApiRequest;
    res: NextApiResponse;
  }) => {

    const uid = getCookie("uid", { req, res }) as string;
    if (!uid)
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };

  const userSnap = await getDoc(doc(collection(db, "Userdata"), uid));
  const data = {
    uid: userSnap.id,
    ...userSnap.data(),
  };
  const dataString = JSON.stringify(data);
  
  return {
    props: {
      dataString,
    },
  };
};
