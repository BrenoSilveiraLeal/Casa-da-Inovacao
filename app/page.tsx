import Script from "next/script";
import content from "./zip-home-content.html?raw";

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <Script src="/js/site.js?v=20261102-text-map-v2" strategy="afterInteractive" />
    </>
  );
}
