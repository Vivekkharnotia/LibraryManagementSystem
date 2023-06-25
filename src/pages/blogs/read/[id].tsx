import VisitBlog from "components/blogs/VisitBlog/VisitBlog";
import { db } from "components/general/firebase-config";
import { doc, getDoc } from "firebase/firestore";

function index({ blogDataString }: { blogDataString: string }) {
  const data = JSON.parse(blogDataString);

  return <VisitBlog data={data} />;
}

export default index;

export const getStaticProps = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const blogId = params.id;
  const blogMetaRef = doc(db, "metaBlogs", blogId);
  const blogMetaSnap = await getDoc(blogMetaRef);
  const blogMetaData = blogMetaSnap.data();

  if (blogMetaData && blogMetaData.published === false) {
    return {
      redirect: {
        destination: "/error404",
        permanent: false,
      },
    };
  }

  const blogRef = doc(db, "blogs", blogId);
  const blogSnap = await getDoc(blogRef);
  const blogData = blogSnap.data();

  const data = { ...blogData, ...blogMetaData, id: blogId };
  const blogDataString = JSON.stringify(data);

  return {
    props: {
      blogDataString,
    },
  };
};
