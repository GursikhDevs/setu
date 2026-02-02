import gsap from 'gsap';

//animation for infinite scrolling marquee
export const marqueeAnimation = (element, {duration=30, ease="linear", clone=true, direction="left"} = {})=>{
    if(!element || !element.parentElement) return null;

    const x = direction == "left" ? "-100%" : "100%";

    //clone once only
    if(clone && !element.dataset.cloned){
        const cloneNode = element.cloneNode(true);
        
        if(direction === "left"){
            element.parentElement.appendChild(cloneNode);
        }
        else{
            element.parentElement.insertBefore(cloneNode, element);
        }

        element.dataset.cloned = 'true';
    }

    const tween = gsap.to(element,{
        x,
        duration,
        repeat: -1,
        ease,
    })

    return tween;
}

//! Have to work on marquee right movement