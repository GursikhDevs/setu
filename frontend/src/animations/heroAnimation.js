import gsap from 'gsap';
import {ScrambleTextPlugin} from 'gsap/ScrambleTextPlugin'
import {SplitText} from 'gsap/SplitText'

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

export const heroAnimation = (textRefs) =>{

    const splits = Object.values(textRefs.current).map(
        (el) =>
          new SplitText(el, {
            type: "chars, words",
          })
      );

      const [weSplit, studentSplit, withSplit, alumniSplit] = splits;

      const tl = gsap.timeline();

      tl.from(weSplit.chars, {
        y: 40,
        opacity: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(withSplit.chars, {
            y: -60,
            opacity: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: "bounce.out",
        })
        .from(
          studentSplit.chars,
          {
            y: () => "random(-50, 60)",
            x: () => "random(-70, 50)",
            opacity: 0,
            stagger: 0.03,
            duration: 0.7,
            ease: "power3.out",
          },
          "<-=0.4"
        )
        .from(
          alumniSplit.chars,
          {
            y: () => "random(-40, 70)",
            x: () => "random(-80, 20)",
            opacity: 0,
            stagger: 0.03,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          textRefs.current.deco1,
          {
            y: () => "random(-50, -80)",
            scale: 0.8,
            opacity: 0,
            duration: 0.7,
            ease: "bounce.out",
          },
          "<"
        )
        .from(
          textRefs.current.deco2,
          {
            y: () => "random(50, 80)",
            scale: 0.8,
            opacity: 0,
            duration: 0.7,
            ease: "bounce.out",
          },
          "<"
        )
        .from(
          textRefs.current.deco3,
          {
            scale: 0.5,
            display: "none",
            y: -20,
            alpha: 10,
            duration: .5,
            ease: "ease.out",
          },
          "<+0.1"
        )
        .from(
          textRefs.current.deco4,
          {
            width: 0,
            rotation: -360,
            opacity: 0,
            duration: 0.7,
            ease: "ease.out",
          },
          "<"
        )
        .from(
          textRefs.current.infinity,
          {
            rotation: -360,
            opacity: 0,
            duration: 0.7,
            ease: "ease.out",
          },
          "<"
        )
        .from(
          textRefs.current.line,
          {
            x: -50,
            opacity: 0,
            duration: 0.7,
            ease: "ease.out",
          },
          "<"
        )
        .from(
          ".tag-text",{
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          },
          "<"
        )
        .from(
          textRefs.current.infinity,
          {
            rotateY: 180,
            duration: 2,
            ease: "ease.out",
            repeat: -1,
            yoyo: true,
          }
        )
        .from(
          textRefs.current.deco4,
          {
            rotateZ: 360,
            delay: ()=> 2 * Math.random(1, 5),
            duration: 5,
            ease: "ease.out",
            repeat: -1,
            
          },"<"
        )
        .from(
          studentSplit.chars[Math.floor(Math.random(1, 5)*studentSplit.chars.length)],
          {
            rotateX: 360,
            delay: 1,
            duration: 4,
            ease: "bounce.out",
            repeat: -1,
            yoyo: true,
          },
          "<"
        )

      return () => splits.forEach((s) => s.revert());
    
}