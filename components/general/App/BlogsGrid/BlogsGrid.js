import styles from "./BlogsGrid.module.css";
import blog_hero from "../../../../public/blog_hero.webp";
import blogs_1 from "../../../../public/blogs_1.jpg";
import Image from "next/image";

function BlogsGrid() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.grid_container}>
          <div className={styles.hero}>
            <Image src={blog_hero} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={blogs_1} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={blogs_1} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={blogs_1} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={blogs_1} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={blogs_1} alt="" />
          </div>
          <div className={styles.normal}>
            <Image src={blogs_1} alt="" />
          </div>

          <div className={styles.more}>
             <u> read more... </u>
          </div>
        </div>
      </div>
    </>
  );
}


export default BlogsGrid;
