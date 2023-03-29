import Link from "next/link";
import { useRouter } from "next/router";
import { scrollTrigger } from "utils/scrollTrigger";
import styles from "./BlogsNav.module.css";

function BlogsNav() {
  const router = useRouter();

  let triggered = false;
  if (router.pathname === "/blogs") {
    [triggered] = scrollTrigger();
  }
  return (
    <>
      <nav
        className={styles.nav}
        style={{
          position: triggered ? "fixed" : "unset",
          animationName: triggered ? styles.navSlide : "unset",
        }}
      >
        <Link href="/blogs" className={styles.logo}>
          Reh-a
        </Link>

        <div className={styles.container}>
          <ul className={styles.navMenu}>
            <li>Solutions</li>
            <li>Products</li>
            <li>Resources</li>
            <li>Pricings</li>
          </ul>
          <div className={styles.navBtns}>
            <Link href="/app" className={styles.bookBtn}>
              Book Slot
            </Link>
            <Link href="/signin" className={styles.signinBtn}>
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default BlogsNav;
