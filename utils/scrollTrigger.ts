import { useState, useEffect } from "react";

export function useScrollTrigger(): boolean {
  const [triggered, setTriggered] = useState(false);

  const onScroll = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
      setTriggered(true);
    } else {
      setTriggered(false);
    }

  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll, true);

    return () => document.removeEventListener("scroll", onScroll, true);
  }, []);

  return triggered
}
