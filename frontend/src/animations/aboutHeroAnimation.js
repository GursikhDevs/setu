import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const aboutHeroAnimations = ({
            aboutRef, 
            splitText2Ref, 
            splitText1Ref, 
            totalWidth, 
            isLargeDisplay
            }) => {

        const split1 = new SplitText(splitText1Ref.current, {
            type: "lines"
        });
        const split2 = new SplitText(splitText2Ref.current, {
            type: "chars"
        });

        gsap.from(split1.lines, {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: aboutRef.current,
                start: "top 60%",
                end: "top 0%",
                scrub: 2,
                // markers: true
            }
        });
        gsap.from(split2.chars, {
            y: 40,
            opacity: 0,
            stagger: 0.05,
            ease: "bounce.out",
            scrollTrigger: {
                trigger: aboutRef.current,
                start: "top -30%",
                end: () => "+=" + (totalWidth * 0.42),
                scrub: 2,
                // markers: true
            }
        });
        gsap.to(".flower",{
            left: "100%",
            ease: "linear",
            rotate: (360 * 2),
            stagger: 0.01,
            scrollTrigger: {
                trigger: aboutRef.current,
                start: "top -30%",
                end: () => "+=" + (totalWidth * 0.42),
                scrub: 2,
                // markers: true
            }
        })
        gsap.to(".filler",{
            width: "100%",
            ease: "linear",
            scrollTrigger: {
                trigger: aboutRef.current,
                start: "top 0",
                end: () => "+=" + (totalWidth * 0.42),
                scrub: 2,
                // markers: true
            }
        })

        gsap.to('.panel', {
            xPercent: `${isLargeDisplay ? -285 : -300} * ${totalWidth}`,
            ease: "none",
            scrollTrigger: {
                trigger: aboutRef.current,
                pin: true,
                scrub: true,
                start: "top top",
                end: () => "+=" + (totalWidth * 0.5),
                // snap: 1 / (sections.length - 1)
            }
        });

        return () => {
            split1.revert();
            split2.revert();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
};
