import Link from "next/link";
import React from "react";
import BlogCard from "./BlogsCard/BlogsCard";
import { MetaBlog } from "types/blogs";

const RecentBlogs = ({
  firstThreeMetaBlogs,
}: {
  firstThreeMetaBlogs: MetaBlog[];
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-[32px] font-bold mb-5">Most Recent Posts</h3>
      <div className="h-[1px] bg-[#ccc] w-full mb-10" />
      <div className="grid grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 ">
        <div
          className={`sm:row-span-2 ${
            firstThreeMetaBlogs[1] ? "sm:col-span-2" : "sm:col-span-3"
          }`}
        >
          <Link href={`/blogs/read/${firstThreeMetaBlogs[0].id}`}>
            <div className={`w-full h-full overflow-hidden`}>
              <div className="rounded-[4px] overflow-hidden mb-4 border-2 border-black h-[210px] sm:min-h-[400px] sm:h-[80%]">
                <img
                  src={firstThreeMetaBlogs[0].heroImageSrc}
                  className="w-full h-full object-cover hover:scale-[1.015] transition-all duration-300"
                />
              </div>
              <h4 className="text-[20px] font-semibold">
                {firstThreeMetaBlogs[0].headTitle}
              </h4>
            </div>
          </Link>
        </div>
        {firstThreeMetaBlogs[1] && firstThreeMetaBlogs[2] ? (
          <>
            <BlogCard
              imgUrl={firstThreeMetaBlogs[1].heroImageSrc}
              mainTitle="Customer Service"
              title={firstThreeMetaBlogs[1].headTitle}
              blogId={firstThreeMetaBlogs[1].id}
            />
            <BlogCard
              imgUrl={firstThreeMetaBlogs[2].heroImageSrc}
              mainTitle="Customer Service"
              title={firstThreeMetaBlogs[2].headTitle}
              blogId={firstThreeMetaBlogs[2].id}
            />
          </>
        ) : (
          firstThreeMetaBlogs[1] && (
            <BlogCard
              imgUrl={firstThreeMetaBlogs[1].heroImageSrc}
              mainTitle="Customer Service"
              title={firstThreeMetaBlogs[1].headTitle}
              blogId={firstThreeMetaBlogs[1].id}
            />
          )
        )}
      </div>
    </div>
  );
};

export default RecentBlogs;
