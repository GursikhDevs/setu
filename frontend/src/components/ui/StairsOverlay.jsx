import React, { forwardRef } from "react";

const StairsOverlay = forwardRef((_, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-9999 pointer-events-none hidden"
    >
      <div className="h-full w-full flex">
        <div className="stair h-full w-1/5 bg-black" />
        <div className="stair h-full w-1/5 bg-black" />
        <div className="stair h-full w-1/5 bg-black" />
        <div className="stair h-full w-1/5 bg-black" />
        <div className="stair h-full w-1/5 bg-black" />
      </div>
    </div>
  );
});

export default StairsOverlay;
