import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function initDistortion(pageWrap: HTMLElement, letters: NodeListOf<HTMLElement>) {
  const titleEl = pageWrap.querySelector<HTMLElement>(".banner__title");
  if (!titleEl) return;
  titleEl.addEventListener("mousemove", (e: MouseEvent) => {
    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const force = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 180);
      gsap.to(letter, {
        skewX: dx * force * 0.08,
        skewY: dy * force * 0.03,
        x: dx * force * 0.18,
        y: dy * force * 0.12,
        scale: 1 + force * 0.12,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });
  titleEl.addEventListener("mouseleave", () => {
    letters.forEach((l) =>
      gsap.to(l, {
        skewX: 0,
        skewY: 0,
        x: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      }),
    );
  });
}

const FOOTER_ANIM_MS = 0.72;
const FOOTER_EASE = "power2.inOut";

function setFooterAnimPageLock(locked: boolean) {
  const e = document.documentElement;
  const b = document.body;
  if (locked) {
    e.style.setProperty("scroll-behavior", "auto", "important");
    b.style.setProperty("scroll-behavior", "auto", "important");
    /* Kraj strane se širi: browser ponekad „koriguje“ skrol = poskok. */
    e.style.setProperty("overflow-anchor", "none", "important");
  } else {
    e.style.removeProperty("scroll-behavior");
    b.style.removeProperty("scroll-behavior");
    e.style.removeProperty("overflow-anchor");
  }
}

function initFooterToggle(footer: HTMLElement, trigger: HTMLElement) {
  const items = footer.querySelectorAll<HTMLElement>(".footer-anim");
  gsap.set(items, { opacity: 0, y: 32 });
  let isOpen = false;
  let busy = false;
  const D = FOOTER_ANIM_MS;
  const ease = FOOTER_EASE;

  let scrollRaf: number | null = null;
  function cancelFooterScrollRaf() {
    if (scrollRaf == null) return;
    cancelAnimationFrame(scrollRaf);
    scrollRaf = null;
  }

  function applyScrollToDocumentBottom() {
    const se = document.documentElement;
    se.scrollTop = Math.round(Math.max(0, se.scrollHeight - window.innerHeight));
  }

  /** Dno footera u vidno polje; nakon toga ponekad ispravi 1px max-scroll. */
  function scrollOpenFooterToBottomBatched() {
    if (scrollRaf != null) return;
    scrollRaf = requestAnimationFrame(() => {
      scrollRaf = null;
      try {
        footer.scrollIntoView({ block: "end", inline: "nearest", behavior: "auto" });
      } catch {
        /* Safari stariji */
        applyScrollToDocumentBottom();
        return;
      }
      const se = document.documentElement;
      const t = Math.round(Math.max(0, se.scrollHeight - window.innerHeight));
      if (Math.abs((window.pageYOffset || 0) - t) > 1) se.scrollTop = t;
    });
  }

  function resetFooterToCollapsed() {
    gsap.set(footer, { height: 0, clearProps: "minHeight" });
    footer.style.removeProperty("visibility");
    footer.style.overflow = "hidden";
  }

  trigger.addEventListener("click", () => {
    if (busy) return;
    busy = true;
    setFooterAnimPageLock(true);
    gsap.killTweensOf([footer, window, ...items]);

    if (!isOpen) {
      isOpen = true;
      trigger.textContent = "✕ zatvori";

      const h = Math.max(footer.scrollHeight, 1);

      const tl = gsap.timeline({
        onComplete: () => {
          cancelFooterScrollRaf();
          /* Klasa is-footer-open + clearProps: nema sukoba sa body.homepage #site-footer { height:0 } */
          requestAnimationFrame(() => {
            footer.classList.add("is-footer-open");
            gsap.set(footer, { clearProps: "height" });
            try {
              footer.scrollIntoView({ block: "end", inline: "nearest", behavior: "auto" });
            } catch {
              applyScrollToDocumentBottom();
            }
            requestAnimationFrame(() => {
              applyScrollToDocumentBottom();
              setFooterAnimPageLock(false);
              busy = false;
            });
          });
        },
      });
      const t0 = 0;
      resetFooterToCollapsed();
      gsap.set(footer, { overflow: "hidden" });
      /* Jedan rAF: manje borbu sa layoutom; `scroll-behavior: smooth` na html onemogućen u toku anim. */
      tl.to(
        footer,
        {
          height: h,
          duration: D,
          ease,
          onUpdate: scrollOpenFooterToBottomBatched,
        },
        t0,
      );
      tl.to(
        items,
        { opacity: 1, y: 0, duration: D * 0.72, stagger: 0.04, ease: "power2.out" },
        t0,
      );
    } else {
      isOpen = false;
      trigger.textContent = "© 2026 Kinoqi";

      /* Fiks u px, pa uklanjanje is-footer-open — u suprotnom kratko vati height:0 iz CSS */
      const hPx = Math.max(footer.offsetHeight, footer.scrollHeight, 1);
      gsap.set(footer, { height: hPx, overflow: "hidden" });
      footer.classList.remove("is-footer-open");

      const tl = gsap.timeline({ onComplete: () => { busy = false; setFooterAnimPageLock(false); } });
      const t0 = 0;
      /* Isti takt: scroll, kolaps, fade sadržaja (bez celog scrolla pa tek onda ostatka). */
      tl.to(window, { scrollTo: { y: 0, autoKill: true }, duration: D, ease }, t0);
      tl.to(footer, { height: 0, duration: D, ease, onComplete: () => { footer.style.overflow = "hidden"; } }, t0);
      tl.to(items, { opacity: 0, y: 20, duration: D * 0.55, ease: "power1.in" }, t0);
    }
  });
}

function initFloatLoop(letters: NodeListOf<HTMLElement>, delay = 0) {
  letters.forEach((el, i) => {
    gsap.to(el, {
      y: gsap.utils.random(-8, 8),
      duration: gsap.utils.random(2.5, 4),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: delay + i * 0.12,
    });
  });
}

function initPage() {
  const introEl = document.getElementById("intro");
  if (!introEl) return;
  /* Sprečava duplo vezivanje (npr. queueMicrotask + astro:page-load) */
  if (introEl.dataset.introInit === "1") return;

  const enterBtn = introEl.querySelector<HTMLButtonElement>("#intro-enter");
  const pageWrap = document.getElementById("page-wrap");
  const footer = document.getElementById("site-footer");
  const footerTrigger = document.getElementById("footer-trigger");
  if (!enterBtn || !pageWrap || !footer || !footerTrigger) return;

  const bannerLetters = pageWrap.querySelectorAll<HTMLElement>(".banner__letter");
  const scrollHint = pageWrap.querySelector<HTMLElement>(".banner__scroll-hint");
  const introVideoWrap = introEl.querySelector<HTMLElement>(".intro__video-wrap");
  if (!scrollHint || !introVideoWrap) return;

  introEl.dataset.introInit = "1";

  document.body.classList.add("homepage");
  /* Samo visina: footer ostaje neproziran (var(--color-dark)) da se ne vidi #f9fafb ispod. */
  gsap.set(footer, { height: 0, overflow: "hidden" });

  document.body.classList.add("intro-active");
  gsap.fromTo(introVideoWrap, { scale: 1.08 }, { scale: 1, duration: 2.4, ease: "power2.out" });
  gsap.set(pageWrap, { visibility: "visible", opacity: 0 });

  enterBtn.addEventListener("click", () => {
    const introLottie = introEl.querySelector<HTMLElement>(".intro__lottie");
    if (!introLottie) return;

    enterBtn.disabled = true;
    const bannerVideo = pageWrap.querySelector<HTMLVideoElement>(".banner__video");
    const deferredSrc = bannerVideo?.dataset.src;
    if (bannerVideo && deferredSrc && !bannerVideo.dataset.hydrated) {
      bannerVideo.dataset.hydrated = "true";
      bannerVideo.src = deferredSrc;
      bannerVideo.preload = "auto";
      bannerVideo.load();
    }

    const tl = gsap.timeline({ defaults: { ease: "sine.inOut" } });

    gsap.set(enterBtn, { opacity: 0 });
    tl.to(introLottie, { y: -160, opacity: 0, filter: "blur(14px)", duration: 1.4, ease: "power2.inOut" });
    tl.to(introVideoWrap, { scale: 1.06, filter: "blur(8px)", duration: 1.0, ease: "power1.inOut" }, "<");
    tl.to(introEl, { opacity: 0, duration: 1.1, ease: "power1.inOut" }, "-=0.6");
    tl.to(pageWrap, { opacity: 1, duration: 1.1, ease: "power1.inOut" }, "<");
    tl.call(() => {
      introEl.remove();
      document.body.classList.remove("intro-active");
    });
    tl.to(
      bannerLetters,
      { opacity: 1, y: 0, skewY: 0, filter: "blur(0px)", duration: 1.3, stagger: { each: 0.1, ease: "power2.inOut" }, ease: "expo.out" },
      "-=0.5",
    );
    tl.to(
      bannerLetters,
      {
        x: () => gsap.utils.random(-6, 6),
        filter: () => `blur(0px) hue-rotate(${gsap.utils.random(-40, 40)}deg)`,
        duration: 0.07,
        stagger: { each: 0.04, from: "random" },
        yoyo: true,
        repeat: 3,
        ease: "none",
      },
      "+=0.1",
    );
    tl.to(bannerLetters, { x: 0, filter: "blur(0px) hue-rotate(0deg)", duration: 0.4, stagger: 0.03, ease: "power2.out" });
    tl.to(scrollHint, { opacity: 1, duration: 1.0, ease: "power1.out" }, "-=0.5");
    tl.to(footerTrigger, { opacity: 1, duration: 0.8, ease: "power1.out" }, "-=0.3");
    tl.call(() => {
      initFloatLoop(bannerLetters, 0);
      initDistortion(pageWrap, bannerLetters);
      initFooterToggle(footer, footerTrigger);
    });
  });
}

document.addEventListener("astro:page-load", initPage);
/*
 * Skripta u <body> može da se izvrši posle prvog astro:page-load (View Transitions),
 * pa listener propusti inicijalno učitavanje — jednom odmah zakažemo init.
 */
queueMicrotask(() => initPage());
