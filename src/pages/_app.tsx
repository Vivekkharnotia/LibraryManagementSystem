import "@/styles/Main.css";
import "@/styles/globals.css";
import { GPCProvider } from "Providers/GPC_Provider";
import { MeetingProvider } from "components/MeetingContext";
import { UserProvider } from "components/UserContext";
import AppLayout from "components/app/AppLayout/AppLayout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Suspense } from "react";

const Loading = () => <div className="bg-[#000]">Loading...</div>;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname.startsWith("/app")) {
    return (
      <Suspense fallback={<Loading />}>
        <UserProvider>
          <MeetingProvider>
            <GPCProvider>
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
            </GPCProvider>
          </MeetingProvider>
        </UserProvider>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <UserProvider>
        <MeetingProvider>
          <Component {...pageProps} />
        </MeetingProvider>
      </UserProvider>
    </Suspense>
  );
}
