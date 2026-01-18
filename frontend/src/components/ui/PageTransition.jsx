import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import StairsOverlay from "./StairsOverlay";

const PageTransition = ({ children }) => {
  const overlayRef = useRef(null);
  const pageRef = useRef(null);
  const location = useLocation();

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const stairs = overlay.querySelectorAll(".stair");

       gsap.set(pageRef.current, {
            autoAlpha: 0,
            pointerEvents: "none",
        });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      });

      tl.set(overlay, { display: "block" })
        .from(stairs, {
            height: "0%",
            stagger: -0.05,
        })
        .to(stairs, {
            y: "100%",
            stagger: -0.05,
        })
        .to(
          pageRef.current,
          {
            autoAlpha: 1,
            duration: 0.6,
            ease: "power3.out",
            pointerEvents: "auto",
          },
          "-=0.2"
        )
        .set(overlay, { display: "none" })
        .set(stairs, { y: "0%", height: "100%" });
    },
    {
      dependencies: [location.pathname],
      revertOnUpdate: false,
    }
  );
  

  return (
    <>
      <StairsOverlay ref={overlayRef} />

      {/* Route content ONLY */}
      <div ref={pageRef}>
        {children}
      </div>
    </>
  );
};

export default PageTransition;
