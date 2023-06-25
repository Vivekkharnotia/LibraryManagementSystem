import BlogsGrid from "components/app/blogs/BlogsGrid/BlogsGrid";
import { db } from "components/general/firebase-config";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MetaBlog } from "types/blogs";

const app = () => {

  const [data, setData] = useState<MetaBlog[]>([]);

  const getMetaBlogs = async () => {
    const q = query(
      collection(db, "metaBlogs"),
      orderBy("date", "desc"),
      where("published", "==", true),
      limit(7)
    );

    const metaBlogs = await getDocs(q);
    const metaBlogsData = metaBlogs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as MetaBlog[];
    return metaBlogsData;
  };``

  useEffect(() => {
    getMetaBlogs().then((data) => {
      setData(data);
    });
  }, []);



  return <BlogsGrid data={data} />;
};

export default app;

// export const getServerSideProps = async () => {
//   // get the latest 10 blogs from firestore
//   try{
//     console.log("fetching data")
//     const q = query(
//       collection(db, "metaBlogs"),
//       orderBy("date", "desc"),
//       where("published", "==", true),
//       limit(7)
//     );

//     const metaBlogs = await getDocs(q);
//     const metaBlogsData = metaBlogs.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//     }));
//     const metaBlogsDataString = JSON.stringify(metaBlogsData);
//     console.log(metaBlogsData);

//     return {
//       props: {
//         metaBlogsDataString,
//       },
//     };
//   }catch(e){
//     console.log("error: ", e);
//     return {
//       props: {
//         metaBlogsDataString: "[]",
//       },
//     };
//   }

// };
