import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useScrollTrigger(): boolean {
  const [triggered, setTriggered] = useState(false);
  const router = useRouter();

  const onScroll = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
      setTriggered(true);
    } else {
      setTriggered(false);
    }

  };

  useEffect(() => {
    if(router.pathname !== "/blogs") {
      setTriggered(false);
      return;
    }else{
      document.addEventListener("scroll", onScroll, true);
      return () => document.removeEventListener("scroll", onScroll, true);
    }

  }, [router.pathname]);


  return triggered
}
