"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollAnimationObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SCROLL_ANIMATION_TRIGGER_CLASSNAME = "scroll-trigger";
    const SCROLL_ANIMATION_OFFSCREEN_CLASSNAME = "scroll-trigger--offscreen";

    function onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          if (el.classList.contains(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME)) {
            el.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
            if (el.hasAttribute("data-cascade") && !el.style.getPropertyValue("--animation-order")) {
              el.style.setProperty("--animation-order", String(index + 1));
            }
          }
          observer.unobserve(el);
        }
      });
    }

    const observer = new IntersectionObserver(onIntersection, {
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.05,
    });

    function scanAndObserve() {
      const elements = Array.from(
        document.getElementsByClassName(SCROLL_ANIMATION_TRIGGER_CLASSNAME)
      ) as HTMLElement[];

      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
          // Immediately animate elements in initial viewport with stagger
          if (!el.style.getPropertyValue("--animation-order")) {
            el.style.setProperty("--animation-order", String((index % 12) + 1));
          }
          el.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
        } else {
          el.classList.add(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
          observer.observe(el);
        }
      });
    }

    // Run on mount and after short tick for rendering
    const timer = setTimeout(scanAndObserve, 50);

    // MutationObserver to watch for dynamic DOM updates (e.g. filter changes)
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
