import Script from "next/script";
import content from "./zip-home-content.html?raw";

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Script src="/js/site.js?v=20261108-mobile-hero-scroll" strategy="afterInteractive" />
      <Script src="/js/dia-noite.js" strategy="afterInteractive" />
    </>
  );
}
