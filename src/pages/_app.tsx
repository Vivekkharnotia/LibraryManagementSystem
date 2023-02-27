import "@/styles/globals.css";
import "@/styles/Main.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "./Layout";


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  if(router.pathname === '/_error' || router.pathname === '/'){
    return <Component {...pageProps} />;
  }
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
  
}
