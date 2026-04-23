/**
 * View Transitions mijenjaju DOM bez reloada; GSAP ScrollTrigger ostaje vezan za stari DOM.
 * Brišemo sve instance pri zamjeni dokumenta; komponente se ponovo registruju na astro:page-load.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("astro:before-swap", () => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
});
