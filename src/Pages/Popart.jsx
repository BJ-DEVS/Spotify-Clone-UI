import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const Popart = () => {
  const [index, setIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  
  // Responsive card width and gap according to screen size
  const getResponsiveConfig = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 480) return { cardWidth: 160, gap: 12, visible: 2 };      // mobile small
      if (width < 640) return { cardWidth: 180, gap: 12, visible: 2 };      // mobile
      if (width < 768) return { cardWidth: 200, gap: 14, visible: 2 };      // tablet small
      if (width < 1024) return { cardWidth: 220, gap: 16, visible: 3 };     // tablet
      if (width < 1280) return { cardWidth: 240, gap: 16, visible: 4 };     // desktop
      return { cardWidth: 260, gap: 20, visible: 4 };                        // large desktop
    }
    return { cardWidth: 245, gap: 16, visible: 3 };
  };
  
  const [config, setConfig] = useState(getResponsiveConfig());
  const { cardWidth, gap, visible: visibleCountFromConfig } = config;
  const STEP = cardWidth + gap;
  
  // Use visibleCount from config instead of hardcoded
  const visible = visibleCountFromConfig;

  // Artist Data
  const artists = [
    { id: 1, name: "Pritam", role: "Artist", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkrJl5k1OR0aJk3VJkSj0UaJHoGK7l-fepVA&s" },
    { id: 2, name: "Atif Aslam", role: "Artist", img: "https://i.scdn.co/image/ab6761610000e5ebc40600e02356cc86f0debe84" },
    { id: 3, name: "Arijit Singh", role: "Artist", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXBB8TkpkGCX0QkShCvHL7RpZ1L7XGwFpR1A&s" },
    { id: 4, name: "Shubh", role: "Artist", img: "https://i.scdn.co/image/ab676161000051749dfbd284ba8a7d4876a181e3" },
    { id: 5, name: "Anuv Jain", role: "Artist", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcEaRBYGrgB414o5zyYy4bmNEum-MBpDKpCg&s" },
    { id: 6, name: "Diljit Dosanjh", role: "Artist", img: "https://i.pinimg.com/1200x/52/c5/07/52c5076de1120ea7c376defc271ce1a9.jpg" },
    { id: 7, name: "Nusrat Fateh Ali Khan", role: "Artist", img: "https://i.pinimg.com/736x/18/95/cb/1895cbe934f5dd6b5c1b281b0a6db8aa.jpg" },
    { id: 8, name: "Vishal Mishra", role: "Artist", img: "https://i.pinimg.com/736x/26/0e/8e/260e8ee53c7849ee6babaf5c5609cb0f.jpg" },
  ];

  // Update config on resize
  useEffect(() => {
    const updateConfig = () => {
      const newConfig = getResponsiveConfig();
      setConfig(newConfig);
      
      // Reset index if current index is out of bounds with new visible count
      const maxIndex = Math.max(0, artists.length - newConfig.visible);
      if (index > maxIndex) {
        setIndex(maxIndex);
      }
    };
    
    // Debounce resize event for better performance
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateConfig, 150);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [index]);

  // Calculate max index based on current visible count
  const maxIndex = Math.max(0, artists.length - visible);

  const next = () => {
    if (index < maxIndex) {
      setIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-8 sm:mt-12 md:mt-16 px-3 sm:px-4 md:px-6 lg:px-8">
      
      {/* Header - Responsive */}
      <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6 px-1">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold hover:underline cursor-pointer transition-all">
          Popular artists
        </h2>
        <button className="text-[11px] sm:text-[12px] md:text-[14px] text-gray-400 font-medium hover:underline hover:text-white transition-colors">
          Show all
        </button>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        className="overflow-hidden relative"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        {/* Cards Row */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * STEP}px)`,
            gap: `${gap}px`
          }}
        >
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="relative flex-shrink-0 rounded-lg flex flex-col gap-2 sm:gap-3 cursor-pointer group transition-all duration-300 hover:bg-[#242424] hover:scale-[1.02] md:hover:scale-[1.03]"
              style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px` }}
            >
              {/* Image Container */}
              <div className="relative">
                <img
                  src={artist.img}
                  alt={artist.name}
                  className="w-full aspect-square object-cover rounded-full shadow-md"
                  loading="lazy"
                />

                {/* Play Button - Responsive size */}
                <button
                  className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-[#1ed760] text-black rounded-full shadow-xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 z-10"
                  style={{ 
                    padding: window.innerWidth < 640 ? '6px' : '10px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Playing ${artist.name}`);
                  }}
                  aria-label={`Play ${artist.name}`}
                >
                  <FiPlay 
                    size={window.innerWidth < 640 ? 14 : window.innerWidth < 768 ? 16 : 20} 
                    fill="black" 
                  />
                </button>
              </div>

              {/* Text - Responsive typography */}
              <div className="px-1 sm:px-2 pb-2">
                <p className="text-white font-bold truncate text-sm sm:text-base md:text-lg hover:underline">
                  {artist.name}
                </p>
                <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm mt-0.5 sm:mt-1">
                  {artist.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows - Responsive positioning and sizing */}
        {showArrows && (
          <>
            {/* Left Arrow */}
            {index > 0 && (
              <button
                onClick={prev}
                className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-1 md:left-2 z-10 bg-black/70 backdrop-blur-sm hover:bg-black/90 rounded-full text-white hover:scale-110 transition-all duration-200 shadow-lg"
                style={{ 
                  padding: window.innerWidth < 640 ? '6px' : window.innerWidth < 768 ? '8px' : '12px'
                }}
                aria-label="Previous"
              >
                <FiChevronLeft 
                  size={window.innerWidth < 640 ? 16 : window.innerWidth < 768 ? 20 : 24} 
                />
              </button>
            )}

            {/* Right Arrow */}
            {index + visible < artists.length && (
              <button
                onClick={next}
                className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-1 md:right-2 z-10 bg-black/70 backdrop-blur-sm hover:bg-black/90 rounded-full text-white hover:scale-110 transition-all duration-200 shadow-lg"
                style={{ 
                  padding: window.innerWidth < 640 ? '6px' : window.innerWidth < 768 ? '8px' : '12px'
                }}
                aria-label="Next"
              >
                <FiChevronRight 
                  size={window.innerWidth < 640 ? 16 : window.innerWidth < 768 ? 20 : 24} 
                />
              </button>
            )}
          </>
        )}
        
        {/* Mobile swipe hint */}
        <div className="sm:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-[10px] opacity-60 whitespace-nowrap">
          ← swipe to see more →
        </div>
      </div>
    </div>
  );
};

export default Popart;