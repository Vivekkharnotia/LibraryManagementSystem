import React from "react";
import blogpart from "./BlogPartition.module.css";
import sanitize from "sanitize-html";
import Image from "next/image";

interface BlogPartitionProps {
  text: string
  title: string
  index: number
  imageUrl?: string
}

export default function BlogPartition({ text, title, index, imageUrl }: BlogPartitionProps) {
  const sanitized = sanitize(text);

  return (
    <>
      <div className={blogpart.block}>
        {title === "Image" ? (
          <div className="relative flex w-full rounded-[10px] overflow-hidden h-[210px] md:h-[280px] lg:h-[350px]">
            <Image
              // imageUrl will exist as it contains an image
              src={imageUrl!}
              fill={true}
              alt=""
              className="object-cover rounded-[10px]"
            />
          </div>
        ) : (
          <>
            <div className={blogpart.title} id={`anchor${index}`}>
              {title}
            </div>
            <div className={blogpart.text}>
              <p
                contentEditable="false"
                dangerouslySetInnerHTML={{ __html: sanitized }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
