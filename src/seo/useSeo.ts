import { useEffect } from "react";
import seo from "./routes.json";

type Meta = { title: string; description: string; indexable?: boolean };

function setMeta(selector: string, attr: string, key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

/** Keeps <head> in sync on client-side navigation. The build writes the same values into each route's static HTML. */
export function useSeo(path: string | null) {
  useEffect(() => {
    const meta: Meta | undefined = path ? (seo.routes as Record<string, Meta>)[path] : undefined;
    const data = meta ?? { ...seo.notFound, indexable: false };
    const url = path ? seo.siteUrl + path : null;

    document.title = data.title;
    setMeta('meta[name="description"]', "name", "description", data.description);
    setMeta('meta[property="og:title"]', "property", "og:title", data.title);
    setMeta('meta[property="og:description"]', "property", "og:description", data.description);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", data.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", data.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (url && data.indexable !== false) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    } else canonical?.remove();
    if (url) setMeta('meta[property="og:url"]', "property", "og:url", url);

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (data.indexable === false) {
      setMeta('meta[name="robots"]', "name", "robots", "noindex");
    } else robots?.remove();
  }, [path]);
}
