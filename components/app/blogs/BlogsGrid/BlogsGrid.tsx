import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { MetaBlog } from "types/blogs";
import styles from "./BlogsGrid.module.css";

function BlogsGrid({ data }: { data: MetaBlog[] }) {
  const router = useRouter();
  const handleReadMore = () => {
    router.push("/blogs");
  };


  return data.length === 0 ? (
    <Typography
      variant="h4"
      style={{ height: "75vh", display: "grid", placeItems: "center" }}
    >
      {" "}
      No Blogs Yet{" "}
    </Typography>
  ) : (
    <>
      <div className={styles.container}>
        <div className={styles.grid_container}>
          {data.map((blog, index) => {
            return (
              <Link
                href={`/blogs/read/${blog.id}`}
                passHref
                key={blog.id}
                className={index === 0 ? styles.hero : styles.normal}
              >
                <img src={blog.heroImageSrc} alt="" className="w-full" />
                <div className={styles.hero_text}>
                  <h1>{blog.headTitle}</h1>
                  <p>- {blog.displayName}</p>
                </div>
              </Link>
            );
          })}

          <div className={styles.more} onClick={handleReadMore}>
            <u> read more... </u>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogsGrid;
