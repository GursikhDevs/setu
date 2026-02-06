import devCardsData from "../../data/devCardsData";
import { LuBadgeHelp } from "react-icons/lu";
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { useRef } from "react";
import { marqueeAnimation } from "../../animations/marqueeAnimation";


const DevCards = () => {

  const devCardRef = useRef(null); 
  const animationRef = useRef([]);
 
   useGSAP(() => {

    animationRef.current.forEach(anim => anim.kill());
    animationRef.current = [];

    gsap.utils.toArray('.ticker').forEach((elem) => {
      const animation = marqueeAnimation(elem, {duration:30, clone:true, direction:"left"});
      if(animation) animationRef.current.push(animation)
    })
  });

  const handleMouseEnter = ()=>{
    animationRef.current.forEach(anim => anim.timeScale(0.2));
  }
  const handleMouseLeave = ()=>{
    animationRef.current.forEach(anim => anim.timeScale(1));
  }

  return (
    <div ref={devCardRef} className="ticker flex gap-10 ">
      {devCardsData.map((pair, index) => (
        <div key={index} className="dev-card flex gap-5">
          
          {/* LEFT PERSON */}
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="flex flex-col items-center justify-center text-md">
            <h5 className="flex gap-1 items-center justify-center py-2">{pair.left.name} – {pair.left.role}</h5>
            <div className="dev-clip1 w-70 h-65 mb-2 relative flex justify-center align-center">
              <img
                className="object-cover w-full h-auto z-9"
                src={pair.left.image}
                alt={pair.left.name}
              />
              <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center text-xl cursor-pointer bg-[rgba(0,0,0,0.29)] z-10 opacity-0 hover:opacity-100 transition-all duration-300">
                <a className="dev-gif flex flex-col items-center justify-center text-center) " href={pair.left.link} target="_blank" rel="noopener noreferrer">
                  <LuBadgeHelp className="text-5xl text-[rgb(202,167,38)]" />
                  <span>View Portpholio</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT PERSON */}
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="flex flex-col items-center justify-center text-md">
            <div className="dev-clip2 w-70 h-65 -mt-2 relative flex justify-center align-center">
              <img
                className="object-cover h-auto w-full"
                src={pair.right.image}
                alt={pair.right.name}
              />
              <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center text-xl cursor-pointer bg-[rgba(0,0,0,0.29)] z-10 opacity-0 hover:opacity-100 transition-all duration-300">
                <a className="dev-gif flex flex-col items-center justify-center text-center) " href={pair.right.link} target="_blank" rel="noopener noreferrer">
                  <LuBadgeHelp className="text-5xl text-[rgb(202,167,38)]" />
                  <span>View Portpholio</span>
                </a>
              </div>
              
            </div>
            <h5 className="flex gap-1 items-center justify-center py-2">{pair.right.name} – {pair.right.role}</h5>
          </div>

        </div>
      ))}
    </div>
  );
};

export default DevCards;







// import devCardsData from "../../data/devCardsData";
// import { LuBadgeHelp } from "react-icons/lu";
// import gsap from 'gsap'
// import {useGSAP} from '@gsap/react'
// import { useRef } from "react";


// const DevCards = () => {

//   const devCardRef = useRef(null);

//   return (
//     <div ref={devCardRef} className="flex gap-10">
//       {devCardsData.map((pair, index) => (
//         <div key={index} className="dev-card flex gap-5">
          
//           {/* LEFT PERSON */}
//           <div className="flex flex-col items-center justify-center text-md">
//             <h5 className="flex gap-1 items-center justify-center py-2">{pair.left.name} – {pair.left.role}</h5>
//             <div className="dev-clip1 w-70 mb-2 relative">
//               <img
//                 className="object-cover w-full z-9"
//                 src={pair.left.image}
//                 alt={pair.left.name}
//               />
//               <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center text-xl cursor-pointer bg-[rgba(0,0,0,0.29)] z-10 opacity-0 hover:opacity-100 transition-all duration-300">
//                 <a className="dev-gif flex flex-col items-center justify-center text-center) " href={pair.left.link} target="_blank" rel="noopener noreferrer">
//                   <LuBadgeHelp className="text-5xl text-[rgb(202,167,38)]" />
//                   <span>View Portpholio</span>
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT PERSON */}
//           <div className="flex flex-col items-center justify-center text-md">
//             <div className="dev-clip2 w-70 -mt-2 relative">
//               <img
//                 className="object-cover w-full"
//                 src={pair.right.image}
//                 alt={pair.right.name}
//               />
//               <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center text-xl cursor-pointer bg-[rgba(0,0,0,0.29)] z-10 opacity-0 hover:opacity-100 transition-all duration-300">
//                 <a className="dev-gif flex flex-col items-center justify-center text-center) " href={pair.right.link} target="_blank" rel="noopener noreferrer">
//                   <LuBadgeHelp className="text-5xl text-[rgb(202,167,38)]" />
//                   <span>View Portpholio</span>
//                 </a>
//               </div>
              
//             </div>
//             <h5 className="flex gap-1 items-center justify-center py-2">{pair.right.name} – {pair.right.role}</h5>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// };

// export default DevCards;
