import React, { FC } from "react";
import Footer from "../Footer/Footer";
import BlogCard from "./BlogsCard/BlogsCard";



const Blogs = () => {
  return (
    <div className="w-full mx-auto text-[#1d2b36]">
      <div className="bg-gradient-to-b from-[#dee7ff99] p-5 md:p-24 md:pt-16">
        <div className="w-full lg:w-[85%] mb-8">
          <h2 className="font-bold mb-5 navTrigger text-[calc(30px+(18)*((100vw-430px)/(770)))]">The R-A Blog</h2>
          <p className="text-[24px] font-extralight">
            Get tips and advice on delivering exceptional customer service,
            engaging and delighting your customers, and building a
            customer-centric company.
          </p>
        </div>
      </div>

      <div className="px-5 md:px-24">
        <div className="mb-8">
          <h3 className="text-[32px] font-bold mb-5">Most Recent Posts</h3>
          <div className="h-[1px] bg-[#ccc] w-full mb-10" />
          <div className="grid grid-rows-3 sm:grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 ">
            <div className="sm:row-span-2 sm:col-span-2">
              <div className={`w-full overflow-hidden`}>
                <div className="rounded-[4px] overflow-hidden mb-4 border-2 border-black">
                  <img
                    src="/example2.png"
                    className="w-full object-cover hover:scale-[1.015] transition-all duration-300"
                  />
                </div>
                <h4 className="text-[20px] font-semibold">
                  Want to Reduce Support Volume? Follow These 5 Steps
                </h4>
              </div>
            </div>
            <div>
              <BlogCard
                imgUrl="/example.png"
                mainTitle="Customer Service"
                title="Artificial Integrity: Trust, AI, and Customer Service"
              />
            </div>
            <div>
              <BlogCard
                imgUrl="/example3.png"
                mainTitle="Customer Service"
                title="Want to Reduce Support Volume? Follow These 5 Steps"
              />
            </div>
          </div>
        </div>
        <h3 className="text-[32px] font-bold mb-5">All Posts</h3>
        <div className="h-[1px] bg-[#ccc] w-full mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-center sm:justify-start">
          <BlogCard
            imgUrl="/example2.png"
            mainTitle="Customer Service"
            title="Want to Reduce Support Volume? Follow These 5 Steps"
          />
          <BlogCard
            imgUrl="/example2.png"
            mainTitle="Customer Service"
            title="Want to Reduce Support Volume? Follow These 5 Steps"
          />
          <BlogCard
            imgUrl="/example2.png"
            mainTitle="Customer Service"
            title="Want to Reduce Support Volume? Follow These 5 Steps"
          />
          <BlogCard
            imgUrl="/example2.png"
            mainTitle="Customer Service"
            title="Want to Reduce Support Volume? Follow These 5 Steps"
          />
        </div>
      </div>

    </div>
  );
};

export default Blogs;
