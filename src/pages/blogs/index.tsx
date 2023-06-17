import Blogs from "components/general/Blogs/Blogs";
import { db } from "components/general/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { MetaBlog } from "types/blogs";

const index = ({ metaBlogsString }: { metaBlogsString: string }) => {
  const metaBlogs: MetaBlog[] = JSON.parse(metaBlogsString);

  return <Blogs metaBlogs={metaBlogs} />;
};

export default index;

export const getServerSideProps = async () => {
  const metaBlogsCollectionRef = collection(db, "metaBlogs");
  const metaBlogsQuery = query(
    metaBlogsCollectionRef,
    where("published", "==", true)
  );

  const metaBlogsQuerySnapshot = await getDocs(metaBlogsQuery);

  const metaBlogs = metaBlogsQuerySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const metaBlogsString = JSON.stringify(metaBlogs);

  return {
    props: {
      metaBlogsString: metaBlogsString ?? null,
    },
  };
};
