import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const Fc = () => {
  const [index, setIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef(null);
  
  // Responsive card width based on screen size
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 480) return 160;   // mobile small
      if (window.innerWidth < 640) return 180;   // mobile
      if (window.innerWidth < 768) return 200;   // tablet
      if (window.innerWidth < 1024) return 220;  // desktop small
      return 240;  // large desktop
    }
    return 218;
  };
  
  const [CARD_WIDTH, setCardWidth] = useState(218);
  const GAP = window.innerWidth < 640 ? 12 : 16;
  const STEP = CARD_WIDTH + GAP;

  const songs = [
    { id: 1, title: "Top Songs Global", artist: "Your weekly update of the most played...", img: "https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_global_default.jpg" },
    { id: 2, title: "Top Songs Pakistan", artist: "Your weekly update of the most played...", img: "https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_pk_default.jpg" },
    { id: 3, title: "Top 50 Global", artist: "Your daily update of the most played...", img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg" },
    { id: 4, title: "Top 50 Pakistan", artist: "Your daily update of the most played...", img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_pk_default.jpg" },
    { id: 5, title: "Viral 50 Global", artist: "Your daily update of the most viral tracks...", img: "https://charts-images.scdn.co/assets/locale_en/viral/daily/region_global_default.jpg" },
    { id: 6, title: "Viral 50 Pakistan", artist: "Your daily update of the most viral tracks...", img: "https://charts-images.scdn.co/assets/locale_en/viral/daily/region_pk_default.jpg" },
  ];

  // Container width se visible cards calculate karo — responsive
  useEffect(() => {
    const updateVisible = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const currentCardWidth = getCardWidth();
        const currentGap = window.innerWidth < 640 ? 12 : 16;
        const currentStep = currentCardWidth + currentGap;
        
        // Calculate how many FULL cards can fit
        let count = Math.floor((containerWidth + currentGap) / currentStep);
        count = Math.max(1, Math.min(count, songs.length));
        
        setVisibleCount(count);
        setCardWidth(currentCardWidth);
        
        // Reset index if current index is out of bounds
        const newMaxIndex = Math.max(0, songs.length - count);
        if (index > newMaxIndex) {
          setIndex(newMaxIndex);
        }
      }
    };
    
    updateVisible();
    
    // Debounce resize event for better performance
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateVisible, 150);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [index]);

  const maxIndex = Math.max(0, songs.length - visibleCount);

  const next = () => {
    if (index < maxIndex) setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    if (index > 0) setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-8 sm:mt-12 md:mt-15 px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6 px-1">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold hover:underline cursor-pointer transition-all">
          Featured Charts
        </h2>
        <button className="text-[11px] sm:text-[12px] md:text-[14px] text-gray-400 font-bold hover:underline hover:text-white transition-colors">
          Show all
        </button>
      </div>

      {/* Slider Area */}
      <div
        ref={containerRef}
        className="overflow-hidden relative"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${index * STEP}px)`,
            gap: `${GAP}px`
          }}
        >
          {songs.map((song) => (
            <div
              key={song.id}
              style={{ minWidth: `${CARD_WIDTH}px`, width: `${CARD_WIDTH}px` }}
              className="flex-shrink-0 hover:bg-[#242424] p-3 sm:p-3.5 md:p-4 rounded-lg flex flex-col gap-2 sm:gap-3 cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Chart Cover */}
              <div className="relative">
                <img
                  src={song.img}
                  className="w-full aspect-square object-cover rounded-md shadow-lg"
                  alt={song.title}
                  loading="lazy"
                />
                {/* Play Button - Responsive size */}
                <button
                  className="absolute bottom-2 right-2 bg-[#1ed760] text-black rounded-full shadow-xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 z-10"
                  style={{ 
                    padding: window.innerWidth < 640 ? '6px' : window.innerWidth < 768 ? '8px' : '12px'
                  }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Play ${song.title}`}
                >
                  <FiPlay 
                    size={window.innerWidth < 640 ? 14 : window.innerWidth < 768 ? 16 : 20} 
                    fill="black" 
                  />
                </button>
              </div>

              {/* Text Information */}
              <div className="flex flex-col px-0.5 sm:px-1">
                <span className="text-white font-bold truncate text-sm sm:text-base md:text-lg hover:underline">
                  {song.title}
                </span>
                <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm line-clamp-2 leading-4 sm:leading-5 mt-0.5 sm:mt-1">
                  {song.artist}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Responsive positioning and sizing */}
        {showArrows && (
          <>
            {index > 0 && (
              <button
                onClick={prev}
                className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-2 z-10 bg-black/70 backdrop-blur-sm hover:bg-black/90 rounded-full text-white shadow-2xl hover:scale-110 transition-all duration-200"
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
            {index < maxIndex && (
              <button
                onClick={next}
                className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-2 z-10 bg-black/70 backdrop-blur-sm hover:bg-black/90 rounded-full text-white shadow-2xl hover:scale-110 transition-all duration-200"
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

export default Fc;