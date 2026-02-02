import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//reusable heading animation
export const headingAnimation = (text, containerRef) =>{
    return gsap.from(text,{
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "ease.out",
            stagger: 0.5,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "top 40% ",
                scrub: 2,
                // markers: true,
            }
        });
}