"use client";

import { useEffect } from "react";

export type IntentEvent =
  | "shop_now_click" | "ar_tryon_click" | "scheme_detail_view"
  | "offer_card_click" | "click_to_call" | "whatsapp_click" | "instagram_click";

function emitIntent(name: string, content?: string) {
  window.dispatchEvent(new CustomEvent("vp:intent", { detail: { name, content } }));
}

export function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLElement>("[data-intent]");
      if (link?.dataset.intent) emitIntent(link.dataset.intent, link.dataset.content);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

export function SchemeDetailView({ ids }: { ids: string[] }) {
  useEffect(() => {
    const headingIds = new Map<Element, string>();
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        emitIntent("scheme_detail_view", headingIds.get(target));
        observer.unobserve(target);
      }
    }, { threshold: 0.5, rootMargin: "-80px 0px -10% 0px" });

    for (const id of ids) {
      const heading = document.getElementById(`${id}-title`);
      if (!heading) continue;
      headingIds.set(heading, id);
      observer.observe(heading);
    }

    return () => observer.disconnect();
  }, [ids]);

  return null;
}
