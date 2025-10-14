import { env } from "@/lib/env";

export function GtmScript() {
  if (!env.GTM_ID) {
    return null;
  }

  const snippet = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?("&l="+l):"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","${env.GTM_ID}");`;
  return <script id="gtm-script" dangerouslySetInnerHTML={{ __html: snippet }} />;
}

export function GtmNoScript() {
  if (!env.GTM_ID) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${env.GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
