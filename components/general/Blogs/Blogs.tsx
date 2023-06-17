import RecentBlogs from "./RecentBlogs";
import AllBlogs from "./AllBlogs";
import BlogsPageHeader from "./BlogsPageHeader";
import { MetaBlog } from "types/blogs";

const Blogs = ({ metaBlogs }: { metaBlogs: MetaBlog[] }) => {
  const firstThreeMetaBlogs = metaBlogs.slice(0, 3);

  return (
    <div className="w-full mx-auto text-[#1d2b36]">
      <BlogsPageHeader />

      <div className="px-5 md:px-24">
        <RecentBlogs firstThreeMetaBlogs={firstThreeMetaBlogs} />
        <AllBlogs metaBlogs={metaBlogs} />
      </div>
    </div>
  );
};

export default Blogs;
