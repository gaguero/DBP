import { env } from "@/lib/env";

export function ChatwootScript() {
  if (!env.CHATWOOT_BASE_URL || !env.CHATWOOT_TOKEN) {
    return null;
  }

  const snippet = `window.chatwootSettings={hideMessageBubble:false,position:"right"};(function(){var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="${env.CHATWOOT_BASE_URL}/packs/js/sdk.js";s.onload=function(){window.chatwootSDK.run({websiteToken:"${env.CHATWOOT_TOKEN}",baseUrl:"${env.CHATWOOT_BASE_URL}"});};(document.head||document.body).appendChild(s);})();`;

  return <script id="chatwoot-script" dangerouslySetInnerHTML={{ __html: snippet }} />;
}
