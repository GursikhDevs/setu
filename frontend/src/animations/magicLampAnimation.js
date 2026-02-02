import gsap from "gsap";

/**
 * Triggers magic lamp smoke animation
 * @param {HTMLElement[]} smokeElements
 * @param {Function} onComplete
 */

export const playMagicLampAnimation = (smokeElements, onComplete) => {
  gsap.killTweensOf(smokeElements);

  gsap.fromTo(
    smokeElements,
    {
      opacity: 0,
      y: 10,
      scale: 0.4,
    },
    {
      opacity: 1,
      y: -100,
      x: 500,
      scale: 5,
      duration: 1.6,
      stagger: 0.12,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(smokeElements, {
            scale: 0,
            opacity: 0,
            duration: 0.1,
            onComplete,
        });
        gsap.to(smokeElements, {
            y: 0,
            x: 0,
            onComplete,
        });
      },
    }
  );
};
