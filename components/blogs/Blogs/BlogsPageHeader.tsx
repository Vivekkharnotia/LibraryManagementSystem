import React from "react";

const BlogsPageHeader = () => {
  return (
    <div className="bg-gradient-to-b from-[#dee7ff99] p-5 md:p-24 md:pt-16">
      <div className="w-full lg:w-[85%] mb-8">
        <h2 className="font-bold mb-5 navTrigger text-[calc(30px+(18)*((100vw-430px)/(770)))]">
          The R-A Blog
        </h2>
        <p className="text-[24px] font-extralight">
          Get tips and advice on delivering exceptional customer service,
          engaging and delighting your customers, and building a
          customer-centric company.
        </p>
      </div>
    </div>
  );
};

export default BlogsPageHeader;
