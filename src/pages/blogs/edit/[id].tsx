import { withAdmin } from "ProtectedRoutes/AdminRoute";
import BlogEditor from "components/general/BlogEditor/BlogEditor";
import { BlogData } from "components/general/VisitBlog/BlogInterface/Blog.interface";
import { db } from "components/general/firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";
import { MetaBlog } from "types/blogs";

function index({
  metaBlogDataString,
  blogDataString,
  blogID,
}: {
  metaBlogDataString: string;
  blogDataString: string;
  blogID: string;
}) {
  const metaBlogData: MetaBlog = JSON.parse(metaBlogDataString);
  const blogData: { published: boolean; uid: string; blogData: BlogData[] } =
    JSON.parse(blogDataString);

  return (
    <BlogEditor
      metaBlogData={metaBlogData}
      blogData={blogData.blogData}
      blogID={blogID}
    />
  );
}

export async function getServerSideProps({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const blogID = params.id;

  const metaBlogSnap = await getDoc(doc(collection(db, "metaBlogs"), blogID));
  const metaBlogData = metaBlogSnap.data();
  const metaBlogDataString = JSON.stringify(metaBlogData);

  const blogSnap = await getDoc(doc(collection(db, "blogs"), blogID));
  const blogData = blogSnap.data();
  const blogDataString = JSON.stringify(blogData);

  return {
    props: {
      metaBlogDataString,
      blogDataString,
      blogID,
    }, // will be passed to the page component as props
  };
}

export default withAdmin(index);
