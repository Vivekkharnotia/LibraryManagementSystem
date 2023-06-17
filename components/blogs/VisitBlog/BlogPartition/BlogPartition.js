import React from "react";
import blogpart from "./BlogPartition.module.css";
import sanitize from "sanitize-html";

export default function BlogPartition({ text, title, index, imageUrl }) {
  const sanitized = sanitize(text);

  return (
    <>
      <div className={blogpart.block}>
        {title === "Image" ? (
          <div className="relative flex w-full rounded-[10px] overflow-hidden max-h-[210px] md:max-h-[280px] lg:max-h-[350px]">
            <img
              src={imageUrl}
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
                contentEditable="true"
                dangerouslySetInnerHTML={{ __html: sanitized }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
