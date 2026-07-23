import { useEffect } from 'react';

export interface DocumentMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  /** JSON-LD structured data object for this page. */
  jsonLd?: Record<string, unknown>;
}

function setMeta(selector: string, attr: 'content', value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute(attr, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps document <title>, meta description, canonical, Open Graph tags and a
 * per-page JSON-LD block in sync with the active route — the SPA equivalent of
 * the per-page <head> the original static pages shipped.
 */
export function useDocumentMeta(meta: DocumentMeta): void {
  useEffect(() => {
    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.ogTitle ?? meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.ogDescription ?? meta.description);
    setMeta('meta[property="og:url"]', 'content', meta.ogUrl ?? meta.canonical);
    setMeta('meta[name="twitter:title"]', 'content', meta.ogTitle ?? meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.ogDescription ?? meta.description);
    setLink('canonical', meta.canonical);

    let script: HTMLScriptElement | null = null;
    if (meta.jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.route = 'true';
      script.textContent = JSON.stringify(meta.jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      if (script) document.head.removeChild(script);
    };
  }, [meta]);
}
