import "@/styles/globals.css";
import "@/styles/Main.css";
import BlogsLayout from "components/general/Blogs/BlogsLayout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "./Layout";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  if (router.pathname.startsWith('/app')) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }

  else if(router.pathname.startsWith('/blogs')) {
    return (
      <BlogsLayout>
        <Component {...pageProps} />
      </BlogsLayout>
    )
  }

  return (
    <Component {...pageProps} />
  )
  
}
