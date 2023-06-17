import React from "react";
import BlogCard from "./BlogsCard/BlogsCard";
import { MetaBlog } from "types/blogs";

const AllBlogs = ({ metaBlogs }: { metaBlogs: MetaBlog[] }) => {
  return (
    <div>
      <h3 className="text-[32px] font-bold mb-5">All Posts</h3>
      <div className="h-[1px] bg-[#ccc] w-full mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-center sm:justify-start">
        {metaBlogs.map((metaBlog: MetaBlog) => {
          return (
            <BlogCard
              key={metaBlog.id}
              imgUrl={metaBlog.heroImageSrc}
              mainTitle="Customer Service"
              title={metaBlog.headTitle}
              blogId={metaBlog.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllBlogs;
