const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group flex items-center justify-center">
      {children}

      {/* Tooltip */}
      <div
        className="
          absolute left-10 top-1/2 -translate-y-1/2
          whitespace-nowrap rounded-md bg-theme-white pl-6 pr-2 py-2
          text-xs text-main-color opacity-0
          group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
          tooltip-clip-path
          text-right
          z-100
          shadow-md 
        "
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
