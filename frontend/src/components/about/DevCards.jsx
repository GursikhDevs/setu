import devCardsData from "../../data/devCardsData";
import { LuBadgeHelp } from "react-icons/lu";

const DevCards = () => {
  return (
    <div className="flex gap-10">
      {devCardsData.map((pair, index) => (
        <div key={index} className="flex gap-5">
          
          {/* LEFT PERSON */}
          <div className="flex flex-col items-center justify-center text-md">
            <h5 className="flex gap-1 items-center justify-center py-2">{pair.left.name} – {pair.left.role}</h5>
            <div className="dev-clip1 w-70 mb-2 relative">
              <img
                className="object-cover w-full z-9"
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
          <div className="flex flex-col items-center justify-center text-md">
            <div className="dev-clip2 w-70 -mt-2 relative">
              <img
                className="object-cover w-full"
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
