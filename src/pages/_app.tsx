import "@/styles/globals.css";
import "@/styles/Main.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "./Layout";
import { UserProvider } from "components/UserContext";
import { Suspense } from "react";

const Loading = () => <div className="bg-[#000]">Loading...</div>;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname.startsWith("/app")) {
    return (
      <Suspense fallback={<Loading />}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Suspense>
  );
}
