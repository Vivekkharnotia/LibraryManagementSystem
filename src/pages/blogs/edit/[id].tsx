import { withAdmin } from "ProtectedRoutes/AdminRoute";
import BlogEditor from "components/blogs/BlogEditor/BlogEditor";
import { db } from "components/general/firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";
import { BlogData, MetaBlog } from "types/blogs";

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
  try {
    const metaBlogSnap = await getDoc(doc(collection(db, "metaBlogs"), blogID));
    const metaBlogData = metaBlogSnap.data();
    const metaBlogDataString = JSON.stringify(metaBlogData);

    if (!metaBlogData) {
      return {
        redirect: {
          destination: "/error404",
          permanent: false,
        },
      };
    }

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
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/error404",
        permanent: false,
      },
    };
  }
}

export default withAdmin(index);
