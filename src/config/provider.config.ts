"use client";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import { useEffect } from "react";

const RouterInterceptor = () => {
  const router = useRouter();

  useEffect(() => {
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = ((...args) => {
      nProgress.start();
      return originalPush(...args);
    }) as typeof router.push;

    router.replace = ((...args) => {
      nProgress.start();
      return originalReplace(...args);
    }) as typeof router.replace;

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router]);

  return null;
};

export default RouterInterceptor;
