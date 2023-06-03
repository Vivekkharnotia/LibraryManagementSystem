import { FC } from "react";

interface BlogCardProps {
  imgUrl: string;
  mainTitle: string;
  title: string;
}

const BlogCard: FC<BlogCardProps> = ({ imgUrl, mainTitle, title }) => {
  console.log(imgUrl, mainTitle, title)

  return (
    <div className={`w-full overflow-hidden hover:cursor-pointer`}>
      <div className="rounded-[4px] overflow-hidden mb-4 border-2 border-black">
        <img
          src={imgUrl}
          className="w-full h-full max-h-[210px] object-cover hover:scale-[1.015] transition-all duration-300"
        />
      </div>
      <h2 className="my-3 text-xs">{mainTitle}</h2>
      <h4 className="text-[21px] leading-6 font-semibold pr-4">{title}</h4>
    </div>
  );
};

export default BlogCard
