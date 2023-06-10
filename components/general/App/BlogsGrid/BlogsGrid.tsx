import { Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./BlogsGrid.module.css";

interface metaBlogsData {
  date: Date;
  displayName: string;
  headTitle: string;
  heroImageSrc: string;
  id: string;
  uid: string;
}



function BlogsGrid({data}: {data: metaBlogsData[]}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleReadMore = () => {
    router.push("/blogs");
  };


  return (
    data.length === 0 ? <Typography variant="h4"  style={{height: "75vh", display: "grid", placeItems: "center"}}> No Blogs Yet </Typography> :

    <>
      <div className={styles.container}>
        <div className={styles.grid_container}>


          <Link href={`/blogs/read/${data[0].id}`} passHref className={styles.hero}>
              <img src={data[0].heroImageSrc} alt="" />

              <div className={styles.hero_text}>
                <h1>{data[0].headTitle}</h1>
                <p>
                  - {data[0].displayName}
                </p>
              </div>
          </Link>


          {
            data.map((blog, index) => {
              if(index === 0) return;
              return (
                <Link href={`/blogs/read/${blog.id}`} passHref key={blog.id} className={styles.normal}>
                    <img src={blog.heroImageSrc} alt="" />
                    <div className={styles.hero_text}>
                      <h1>{blog.headTitle}</h1>
                      <p> 
                        - {blog.displayName}
                      </p>
                    </div>
                </Link>
            )})
          }
        

          <div className={styles.more} onClick={handleReadMore}>
            <u> read more... </u>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default BlogsGrid;
